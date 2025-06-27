import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { searchKnowledgeBase, SchoolDocument } from '../data/schoolKnowledgeBase';

// Initialize the language model with server-side environment variables
const llm = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo',
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY, // Server-side environment variable
});

// Create a prompt template for the RAG system
const ragPromptTemplate = PromptTemplate.fromTemplate(`
You are a helpful admissions assistant for Buds School. Use the following context to answer the user's question accurately and helpfully.

Context Information:
{context}

User Question: {question}

Instructions:
1. Answer based ONLY on the provided context information
2. If the context doesn't contain enough information to answer the question, say so and suggest contacting the school directly
3. Be friendly, professional, and helpful
4. Keep responses concise but informative
5. If asked about fees, provide specific amounts from the context
6. If asked about dates, provide exact dates from the context
7. If asked about documents, list all required documents from the context

Answer: `);

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
      const response = await this.generateLLMResponse(userQuestion, context);
      
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
  private async generateLLMResponse(question: string, context: string): Promise<string> {
    try {
      // Check if OpenAI API key is available
      if (!process.env.OPENAI_API_KEY) {
        console.warn('OpenAI API key not found, using fallback response');
        return this.generateFallbackResponse(question, context);
      }

      const formattedPrompt = await ragPromptTemplate.format({
        context,
        question,
      });

      const response = await llm.invoke(formattedPrompt);
      return response.content as string;
    } catch (error) {
      console.error('Error calling LLM:', error);
      
      // Fallback to rule-based response if LLM fails
      return this.generateFallbackResponse(question, context);
    }
  }

  /**
   * Fallback response generation when LLM is unavailable
   */
  private generateFallbackResponse(question: string, context: string): string {
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