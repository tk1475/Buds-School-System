'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  BookOpen,
  Calendar,
  FileText,
  Download,
  CheckCircle,
  Clock,
  DollarSign,
  MessageCircle,
} from 'lucide-react';
import Chatbot from '../components/Chatbot'; // Adjust the import path if necessary

const AdmissionsPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const admissionSteps = [
    {
      step: 1,
      title: 'Application Form',
      description: 'Complete and submit the online application form with all required information.',
      icon: FileText,
    },
    {
      step: 2,
      title: 'Document Submission',
      description: 'Submit required documents including previous academic records and certificates.',
      icon: FileText,
    },
    {
      step: 3,
      title: 'Assessment Test',
      description: 'Participate in our age-appropriate assessment to determine academic level.',
      icon: BookOpen,
    },

    {
      step: 4,
      title: 'Admission Decision',
      description: 'Receive admission decision within 7-10 working days of completing all steps.',
      icon: CheckCircle,
    },
  ];

  const feeStructure = [
    {
      grade: 'Grade Pre-Nursery - 6',
      monthlyFee: 'PKR 4,000',
      admissionFee: 'PKR 10,000',
      annualFee: 'PKR 5,000',
    },

    {
      grade: 'Grade 6 - 10',
      monthlyFee: 'PKR 4,500',
      admissionFee: 'PKR 10,000',
      annualFee: 'PKR 10,000',
    },
  ];

  const requirements = [
    'Birth Certificate (Original + Photocopy)',
    'Previous School Leaving Certificate',
    'Academic Transcripts from Previous School',
    'Parent/Guardian CNIC (Photocopy)',
    "Student's Recent Photographs (4 passport size)",
    'Medical Certificate',
    'Character Certificate (if applicable)',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Join the Buds School Family
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-10">
            Begin your child's educational journey with us. We're accepting applications for the 2025-26
            academic year.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
              Apply Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-full text-lg font-semibold transition-all backdrop-blur-sm">
              Download Prospectus
            </button>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Admission Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined admission process ensures a smooth experience for families joining our school
              community.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {admissionSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all mb-6 group">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold">{step.step}</span>
                  </div>
                  <step.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < admissionSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 transform -translate-y-1/2 left-full w-full h-0.5 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Fee Structure</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transparent and competitive fee structure designed to provide excellent value for quality
              education.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-8 py-6 text-left text-lg font-semibold">Grade Level</th>
                    <th className="px-8 py-6 text-left text-lg font-semibold">Monthly Fee</th>
                    <th className="px-8 py-6 text-left text-lg font-semibold">Admission Fee</th>
                    <th className="px-8 py-6 text-left text-lg font-semibold">Annual Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((fee, index) => (
                    <tr
                      key={index}
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                    >
                      <td className="px-8 py-6 font-semibold text-gray-800">{fee.grade}</td>
                      <td className="px-8 py-6 text-gray-700">{fee.monthlyFee}</td>
                      <td className="px-8 py-6 text-gray-700">{fee.admissionFee}</td>
                      <td className="px-8 py-6 text-gray-700">{fee.annualFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Additional Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Payment Plans Available:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Monthly installments</li>
                  <li>• Quarterly payments (5% discount)</li>
                  <li>• Annual payment (10% discount)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Fee Includes:</h4>
                <ul className="text-gray-600 space-y-1">
                  <li>• Tuition and curriculum materials</li>
                  <li>• Library and computer lab access</li>
                  <li>• Sports and extracurricular activities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Required Documents</h2>
              <p className="text-lg text-gray-600 mb-8">
                Please ensure you have all required documents ready before starting your application
                process.
              </p>
              <div className="space-y-4">
                {requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3">
                <Download className="w-5 h-5" />
                Download Checklist
              </button>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Important Dates</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Application Opens</div>
                    <div className="text-gray-600">February 1, 2025</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-8 h-8 text-orange-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Application Deadline</div>
                    <div className="text-gray-600">March 31, 2025</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <GraduationCap className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="font-semibold text-gray-800">Academic Year Starts</div>
                    <div className="text-gray-600">April 15, 2025</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Begin Your Application?</h2>
          <p className="text-xl text-blue-100 mb-10">
            Join hundreds of families who have chosen Buds School for their children's educational
            journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Application
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-4 rounded-full text-lg font-semibold transition-all backdrop-blur-sm flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-5 h-5" />
              Ask Questions
            </button>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onMinimizeToggle={() => setIsMinimized(!isMinimized)}
        isMinimized={isMinimized}
      />

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 z-40"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default AdmissionsPage;