import { NextRequest, NextResponse } from 'next/server';
import { RAGService } from '../../../services/ragService';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Get RAG service instance
    const ragService = RAGService.getInstance();
    
    // Generate response using RAG
    const response = await ragService.generateResponse(message);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in chat API:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        answer: "I apologize, but I'm having trouble processing your request right now. Please try again or contact our admissions team directly at +92 (51) 123-4567.",
        sources: [],
        confidence: 0,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const ragService = RAGService.getInstance();
    const suggestedQuestions = ragService.getSuggestedQuestions();
    
    return NextResponse.json({ suggestedQuestions });
  } catch (error) {
    console.error('Error getting suggested questions:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        suggestedQuestions: [
          'What are the admission requirements?',
          'What is the fee structure?',
          'When is the next admission cycle?',
          'How do I apply online?',
        ]
      },
      { status: 500 }
    );
  }
} 