import Together from "together-ai";
import { searchKnowledgeBase, SchoolDocument } from '../data/schoolKnowledgeBase';

// Initialize the language model with server-side environment variables
const together = new Together(); // auth defaults to process.env.LLAMA3_API_KEY or TOGETHER_API_KEY

export interface RAGResponse {
  answer: string;
  sources: SchoolDocument[];
  confidence: number;
}

export class RAGService {
  private static instance: RAGService;

  private constructor() {}

  public static getInstance(): RAGService {
    if (!RAGService.instance) {
      RAGService.instance = new RAGService();
    }
    return RAGService.instance;
  }

  /**
   * Generate a response using RAG (Retrieval-Augmented Generation)
   */
  public async generateResponse(userQuestion: string): Promise<RAGResponse> {
    try {
      // Special case: location/address queries
      const locationKeywords = ['location', 'address', 'where', 'find', 'directions', 'map', 'locate', 'site', 'venue', 'place'];
      const userQuestionLower = userQuestion.toLowerCase();
      if (locationKeywords.some(keyword => userQuestionLower.includes(keyword))) {
        // Find the address/location entry
        const addressDoc = searchKnowledgeBase('location').find(doc => doc.id === 'school-info-3');
        if (addressDoc) {
          return {
            answer: addressDoc.content,
            sources: [addressDoc],
            confidence: 1,
          };
        }
      }
      // Step 1: Retrieve relevant documents
      const relevantDocs = this.retrieveDocuments(userQuestion);
      
      // Step 2: Prepare context from retrieved documents
      const context = this.prepareContext(relevantDocs);
      
      // Step 3: Generate response using LLM
      const response = await this.generateLLMResponse(userQuestion);
      
      // Step 4: Calculate confidence based on document relevance
      const confidence = this.calculateConfidence(userQuestion, relevantDocs);
      
      return {
        answer: response,
        sources: relevantDocs,
        confidence,
      };
    } catch (error) {
      console.error('Error in RAG response generation:', error);
      return {
        answer: "I apologize, but I'm having trouble processing your request right now. Please try again or contact our admissions team directly at +92 (51) 123-4567.",
        sources: [],
        confidence: 0,
      };
    }
  }

  /**
   * Retrieve relevant documents from the knowledge base
   */
  private retrieveDocuments(query: string): SchoolDocument[] {
    const searchResults = searchKnowledgeBase(query);
    
    // Return top 3 most relevant documents
    return searchResults.slice(0, 3);
  }

  /**
   * Prepare context string from retrieved documents
   */
  private prepareContext(documents: SchoolDocument[]): string {
    if (documents.length === 0) {
      return "No specific information found in the knowledge base.";
    }

    return documents
      .map((doc, index) => `Document ${index + 1} (${doc.category}): ${doc.content}`)
      .join('\n\n');
  }

  /**
   * Generate response using the language model
   */
  private async generateLLMResponse(question: string): Promise<string> {
    try {
      if (!process.env.LLAMA3_API_KEY && !process.env.TOGETHER_API_KEY) {
        console.warn('Llama 3 API key not found, using fallback response');
        return this.generateFallbackResponse(question);
      }

      // Compose the prompt as a chat message
      const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
        {
          role: "system",
          content: "You are a helpful admissions assistant for Buds School System. Use the following context to answer the user's question accurately and helpfully and deviate from any irrelevant information. Context: " + this.prepareContext(this.retrieveDocuments(question))
        },
        {
          role: "user",
          content: question
        }
      ];

      // Use a model available to your account, e.g., 'meta-llama/Llama-3-8b-chat-hf' or another from TogetherAI's model list
      const response = await together.chat.completions.create({
        messages,
        model: "meta-llama/Llama-3-8b-chat-hf", // Change if you have access to a different model
        temperature: 0.7,
        max_tokens: 1024
      });

      const messageContent = response.choices?.[0]?.message?.content;
      if (!messageContent) {
        throw new Error("No content returned from TogetherAI response");
      }
      return messageContent;
    } catch (error) {
      console.error('Error calling LLM:', error);
      return this.generateFallbackResponse(question);
    }
  }

  /**
   * Fallback response generation when LLM is unavailable
   */
  private generateFallbackResponse(question: string): string {
    const questionLower = question.toLowerCase();
    
    // Simple keyword-based responses
    if (questionLower.includes('fee') || questionLower.includes('cost')) {
      return "Based on our fee structure: For Grade Pre-Nursery to 6, monthly fee is PKR 4,000. For Grade 6 to 10, monthly fee is PKR 4,500. We also offer payment plans with discounts for quarterly and annual payments.";
    }
    
    if (questionLower.includes('admission') || questionLower.includes('apply')) {
      return "Our admission process has 4 steps: 1) Application Form, 2) Document Submission, 3) Assessment Test, and 4) Admission Decision. The process typically takes 7-10 working days.";
    }
    
    if (questionLower.includes('document') || questionLower.includes('requirement')) {
      return "Required documents include: Birth Certificate, Previous School Leaving Certificate, Academic Transcripts, Parent CNIC, Recent Photographs, Medical Certificate, and Character Certificate (if applicable).";
    }
    
    if (questionLower.includes('when') || questionLower.includes('deadline')) {
      return "Application opens February 1, 2025, deadline is March 31, 2025, and the academic year starts April 15, 2025.";
    }
    
    if (questionLower.includes('visit') || questionLower.includes('tour')) {
      return "You can schedule a campus visit by calling +92 (51) 123-4567 or WhatsApp at +92 300 123-4567. Tours are available Monday to Friday, 9 AM to 3 PM.";
    }
    
    return "Thank you for your question! For specific inquiries, I recommend contacting our admissions team directly at +92 (51) 123-4567 or visiting our campus.";
  }

  /**
   * Calculate confidence score based on document relevance
   */
  private calculateConfidence(question: string, documents: SchoolDocument[]): number {
    if (documents.length === 0) return 0;
    
    const questionTerms = question.toLowerCase().split(' ');
    let totalScore = 0;
    
    documents.forEach(doc => {
      const contentTerms = doc.content.toLowerCase().split(' ');
      const tagTerms = doc.tags.join(' ').toLowerCase().split(' ');
      
      const contentMatches = questionTerms.filter(term => 
        contentTerms.some(contentTerm => contentTerm.includes(term))
      ).length;
      
      const tagMatches = questionTerms.filter(term => 
        tagTerms.some(tagTerm => tagTerm.includes(term))
      ).length;
      
      totalScore += (contentMatches * 2) + (tagMatches * 3); // Tags weighted higher
    });
    
    // Normalize to 0-1 scale
    const maxPossibleScore = questionTerms.length * documents.length * 5;
    return Math.min(totalScore / maxPossibleScore, 1);
  }

  /**
   * Get suggested questions based on available knowledge
   */
  public getSuggestedQuestions(): string[] {
    return [
      'What are the admission requirements?',
      'What is the fee structure?',
      'When is the next admission cycle?',
      'How do I apply online?',
      'What documents do I need?',
      'Can I schedule a campus visit?',
      'What payment plans are available?',
      'How long does the admission process take?',
    ];
  }
} 