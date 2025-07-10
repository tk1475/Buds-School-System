export interface SchoolDocument {
  id: string;
  content: string;
  category: string;
  tags: string[];
  metadata?: Record<string, any>;
}

export const schoolKnowledgeBase: SchoolDocument[] = [
  // Admission Process
  {
    id: 'admission-process-1',
    content: 'The admission process at Buds School consists of 4 main steps: 1) Application Form completion, 2) Document Submission, 3) Assessment Test, and 4) Admission Decision. The entire process typically takes 7-10 working days.',
    category: 'admissions',
    tags: ['admission', 'process', 'steps', 'application'],
  },
  {
    id: 'admission-process-2',
    content: 'Step 1: Complete and submit the online application form with all required information including student details, parent information, and previous academic history.',
    category: 'admissions',
    tags: ['application', 'form', 'online', 'step 1'],
  },
  {
    id: 'admission-process-3',
    content: 'Step 2: Submit required documents including previous academic records, certificates, birth certificate, and parent identification documents.',
    category: 'admissions',
    tags: ['documents', 'submission', 'step 2', 'requirements'],
  },
  {
    id: 'admission-process-4',
    content: 'Step 3: Participate in our age-appropriate assessment test to determine academic level and placement in the appropriate grade.',
    category: 'admissions',
    tags: ['assessment', 'test', 'placement', 'step 3'],
  },
  {
    id: 'admission-process-5',
    content: 'Step 4: Receive admission decision within 7-10 working days of completing all previous steps.',
    category: 'admissions',
    tags: ['decision', 'timeline', 'step 4', 'admission result'],
  },

  // Fee Structure
  {
    id: 'fee-structure-1',
    content: 'For Grade Pre-Nursery to 6: Monthly fee is PKR 4,000, Admission fee is PKR 10,000, and Annual fee is PKR 5,000.',
    category: 'fees',
    tags: ['fees', 'grade pre-nursery', 'grade 6', 'monthly', 'admission', 'annual'],
  },
  {
    id: 'fee-structure-2',
    content: 'For Grade 6 to 10: Monthly fee is PKR 4,500, Admission fee is PKR 10,000, and Annual fee is PKR 10,000.',
    category: 'fees',
    tags: ['fees', 'grade 6', 'grade 10', 'monthly', 'admission', 'annual'],
  },
  {
    id: 'fee-payment-plans',
    content: 'Payment plans available: Monthly installments, Quarterly payments (5% discount), and Annual payment (10% discount).',
    category: 'fees',
    tags: ['payment', 'plans', 'installments', 'discount', 'quarterly', 'annual'],
  },
  {
    id: 'fee-includes',
    content: 'Fees include: Tuition and curriculum materials, Library and computer lab access, Sports and extracurricular activities.',
    category: 'fees',
    tags: ['fees', 'includes', 'tuition', 'library', 'sports', 'activities'],
  },

  // Required Documents
  {
    id: 'documents-1',
    content: 'Required documents for admission: Birth Certificate (Original + Photocopy), Previous School Leaving Certificate, Academic Transcripts from Previous School, Parent/Guardian CNIC (Photocopy), Student\'s Recent Photographs (4 passport size), Medical Certificate, and Character Certificate (if applicable).',
    category: 'documents',
    tags: ['documents', 'requirements', 'birth certificate', 'school certificate', 'transcripts', 'cnic', 'photographs', 'medical', 'character'],
  },

  // Important Dates
  {
    id: 'dates-1',
    content: 'Application opens on February 1, 2025 for the academic year 2025-26.',
    category: 'dates',
    tags: ['application', 'opens', 'february', '2025', 'academic year'],
  },
  {
    id: 'dates-2',
    content: 'Application deadline is March 31, 2025.',
    category: 'dates',
    tags: ['deadline', 'march', '2025', 'application'],
  },
  {
    id: 'dates-3',
    content: 'Academic year starts on April 15, 2025.',
    category: 'dates',
    tags: ['academic year', 'starts', 'april', '2025'],
  },

  // Contact Information
  {
    id: 'contact-1',
    content: 'You can schedule a campus visit by calling +92 (51) 123-4567 or WhatsApp us at +92 300 123-4567. Campus tours are available Monday to Friday, 9 AM to 3 PM.',
    category: 'contact',
    tags: ['campus visit', 'tour', 'phone', 'whatsapp', 'schedule'],
  },
  {
    id: 'contact-2',
    content: 'For specific inquiries, contact our admissions team directly at +92 (51) 123-4567 or visit our campus.',
    category: 'contact',
    tags: ['admissions team', 'phone', 'campus', 'inquiries'],
  },

  // General School Information
  {
    id: 'school-info-1',
    content: 'Buds School is accepting applications for the 2025-26 academic year. Early applications are encouraged as we have limited seats.',
    category: 'general',
    tags: ['academic year', 'applications', 'limited seats', 'early application'],
  },
  {
    id: 'school-info-2',
    content: 'Buds School provides quality education with a focus on academic excellence, character development, and holistic growth.',
    category: 'general',
    tags: ['quality education', 'academic excellence', 'character development', 'holistic growth'],
  },
  {
    id: 'school-info-3',
    content: 'Buds School is located at New AECHS Rd, Sector 2 Airport Employees CHS, Rawalpindi. The exact address is Airport Employees CHS, House No. 232/15, Rawalpindi, Pakistan.',
    category: 'location',
    tags: ['location', 'address', 'map', 'campus', 'where', 'school location', 'directions', 'find', 'place', 'site', 'locate', 'venue'],
  },

  // Assessment Information
  {
    id: 'assessment-1',
    content: 'The assessment test is age-appropriate and designed to determine the student\'s current academic level for proper grade placement.',
    category: 'assessment',
    tags: ['assessment', 'test', 'age-appropriate', 'academic level', 'placement'],
  },

  // Campus Information
  {
    id: 'campus-1',
    content: 'Our campus features modern facilities including well-equipped classrooms, computer labs, library, sports facilities, and dedicated spaces for extracurricular activities.',
    category: 'campus',
    tags: ['campus', 'facilities', 'classrooms', 'computer labs', 'library', 'sports'],
  },
];

// Search function for RAG implementation
export const searchKnowledgeBase = (query: string): SchoolDocument[] => {
  const searchTerms = query.toLowerCase().split(' ');

  // Special handling for location/address queries
  const locationKeywords = ['location', 'address', 'where', 'find', 'directions', 'map', 'locate', 'site', 'venue', 'place', 'campus', 'school location', 'directions', 'find', 'place', 'site', 'locate', 'venue'];
  const isLocationQuery = searchTerms.some(term => locationKeywords.includes(term));

  const results = schoolKnowledgeBase.filter(doc => {
    const contentMatch = searchTerms.some(term => 
      doc.content.toLowerCase().includes(term)
    );
    const tagMatch = searchTerms.some(term => 
      doc.tags.some(tag => tag.toLowerCase().includes(term))
    );
    const categoryMatch = searchTerms.some(term => 
      doc.category.toLowerCase().includes(term)
    );
    return contentMatch || tagMatch || categoryMatch;
  });

  // If it's a location query, boost the address/location entry to the top
  if (isLocationQuery) {
    const addressDocIndex = results.findIndex(doc => doc.id === 'school-info-3');
    if (addressDocIndex > -1) {
      const [addressDoc] = results.splice(addressDocIndex, 1);
      results.unshift(addressDoc);
    } else {
      // If not in results, check if it's in the KB and add it
      const addressDoc = schoolKnowledgeBase.find(doc => doc.id === 'school-info-3');
      if (addressDoc) {
        results.unshift(addressDoc);
      }
    }
  }

  return results.sort((a, b) => {
    // Simple relevance scoring - documents with more matching terms rank higher
    const aScore = searchTerms.filter(term => 
      a.content.toLowerCase().includes(term) || 
      a.tags.some((tag: string) => tag.toLowerCase().includes(term))
    ).length;
    const bScore = searchTerms.filter(term => 
      b.content.toLowerCase().includes(term) || 
      b.tags.some((tag: string) => tag.toLowerCase().includes(term))
    ).length;
    return bScore - aScore;
  });
}; 