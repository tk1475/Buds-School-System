# RAG Chatbot Setup Guide

## Overview
This chatbot uses Retrieval-Augmented Generation (RAG) to provide accurate, school-specific information to users. It combines a knowledge base of school data with AI language models to generate helpful responses.

## Features
- **RAG-powered responses**: Uses school-specific knowledge base for accurate answers
- **Confidence scoring**: Shows how confident the AI is in its response
- **Source citations**: Displays which documents were used to generate responses
- **Fallback system**: Works even when OpenAI API is unavailable
- **Smart suggestions**: Provides relevant quick questions
- **Server-side processing**: Secure API-based approach

## Setup Instructions

### 1. OpenAI API Key
You need an OpenAI API key to use the full RAG functionality:

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Create a `.env.local` file in the `frontend` directory
4. Add your API key:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

### 2. Environment Variables
Create a `.env.local` file with the following variables:

```env
# Required (Server-side only - not exposed to client)
OPENAI_API_KEY=your_openai_api_key_here

# Optional
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_TEMPERATURE=0.7
```

**Important**: Use `OPENAI_API_KEY` (not `NEXT_PUBLIC_OPENAI_API_KEY`) for security. The API key is only used server-side.

### 3. Running the Application
```bash
cd frontend
npm run dev
```

## How It Works

### Architecture
- **Client**: React component handles UI and user interactions
- **API Route**: Server-side endpoint (`/api/chat`) processes RAG requests
- **RAG Service**: Handles document retrieval and response generation
- **Knowledge Base**: Contains school-specific information

### Knowledge Base
The chatbot uses a comprehensive knowledge base located in `src/data/schoolKnowledgeBase.ts` containing:
- Admission process information
- Fee structure details
- Required documents
- Important dates
- Contact information
- General school information

### RAG Process
1. **User Input**: User asks a question in the chatbot
2. **API Request**: Client sends question to `/api/chat` endpoint
3. **Retrieval**: Server searches the knowledge base for relevant documents
4. **Augmentation**: Retrieved documents are used as context for the AI model
5. **Generation**: AI generates a response based on the provided context
6. **Response**: Server returns answer with confidence score and sources

### Fallback System
If the OpenAI API is unavailable, the chatbot falls back to rule-based responses using keyword matching.

## API Endpoints

### POST /api/chat
Processes user messages and returns RAG-generated responses.

**Request:**
```json
{
  "message": "What are the admission requirements?"
}
```

**Response:**
```json
{
  "answer": "Based on our admission process...",
  "sources": [...],
  "confidence": 0.85
}
```

### GET /api/chat
Returns suggested questions for the chatbot.

**Response:**
```json
{
  "suggestedQuestions": [
    "What are the admission requirements?",
    "What is the fee structure?",
    ...
  ]
}
```

## Customization

### Adding New Knowledge
To add new information to the knowledge base, edit `src/data/schoolKnowledgeBase.ts`:

```typescript
{
  id: 'unique-id',
  content: 'Your information here',
  category: 'category-name',
  tags: ['relevant', 'tags'],
}
```

### Modifying the RAG Service
The RAG service is located in `src/services/ragService.ts`. You can:
- Change the language model
- Modify the prompt template
- Adjust confidence scoring
- Add new fallback responses

### Updating the Chatbot UI
The chatbot component is in `src/app/components/Chatbot.tsx`. You can:
- Change the styling
- Add new features
- Modify the quick questions
- Adjust the UI layout

### Modifying the API
The API route is in `src/app/api/chat/route.ts`. You can:
- Add authentication
- Implement rate limiting
- Add logging
- Modify error handling

## Troubleshooting

### API Key Issues
- Ensure your API key is correct
- Check that the environment variable is properly set
- Verify your OpenAI account has credits
- Make sure you're using `OPENAI_API_KEY` (not `NEXT_PUBLIC_OPENAI_API_KEY`)

### No Responses
- Check the browser console for errors
- Verify the knowledge base is properly loaded
- Ensure all dependencies are installed
- Check the server logs for API errors

### Poor Response Quality
- Review the knowledge base for accuracy
- Adjust the prompt template in the RAG service
- Consider adding more specific information to the knowledge base

### API Errors
- Check that the API route is accessible
- Verify the request format is correct
- Check server logs for detailed error messages

## Security Notes
- API key is only used server-side (not exposed to client)
- Use environment variables for sensitive information
- Consider rate limiting for production use
- Monitor API usage to control costs
- Validate all user inputs

## Performance Optimization
- Knowledge base is loaded server-side for security
- Responses are cached in the conversation history
- Fallback system ensures availability even without API access
- API requests are optimized for minimal latency

## Production Deployment
For production deployment:
1. Set up proper environment variables
2. Configure rate limiting
3. Add monitoring and logging
4. Set up error tracking
5. Consider using a CDN for static assets
6. Implement proper security headers 