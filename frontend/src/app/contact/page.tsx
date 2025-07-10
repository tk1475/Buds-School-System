'use client'

import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: "AECHS, Rawalpindi",
      subDetails: "Punjab, Pakistan",
      color: "blue"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+92 (51) 123-4567",
      subDetails: "Mon - Fri, 8:00 AM - 4:00 PM",
      color: "green"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "info@budsschool.edu.pk",
      subDetails: "We'll respond within 24 hours",
      color: "purple"
    }
  ];

  const departments = [
    {
      name: "Admissions Office",
      email: "admissions@budsschool.edu.pk",
      phone: "+92 (51) 123-4567",
      description: "New student enrollment and application inquiries"
    },
  ];

  const whatsappOptions = [
    {
      type: 'general',
      title: 'General Inquiry',
      description: 'Ask about our school, programs, or any general questions',
      message: 'Hello! I would like to know more about Buds School System.'
    },
    {
      type: 'admissions',
      title: 'Admissions',
      description: 'Inquire about enrollment, application process, and requirements',
      message: 'Hello! I am interested in admission to Buds School System. Could you please provide me with information about the enrollment process?'
    },
    
  ];

  const handleWhatsAppClick = (message: string) => {
    const phoneNumber = '923015046999'; // WhatsApp number (without + sign)
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
            We&apos;re here to answer your questions and help you discover how Buds School can nurture your child&apos;s potential.
          </p>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  method.color === 'blue' ? 'bg-gradient-to-br from-blue-100 to-blue-200' :
                  method.color === 'green' ? 'bg-gradient-to-br from-green-100 to-green-200' :
                  'bg-gradient-to-br from-purple-100 to-purple-200'
                }`}>
                  <method.icon className={`w-8 h-8 ${
                    method.color === 'blue' ? 'text-blue-600' :
                    method.color === 'green' ? 'text-green-600' :
                    'text-purple-600'
                  }`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{method.title}</h3>
                <p className="text-lg font-semibold text-gray-700 mb-2">{method.details}</p>
                <p className="text-gray-600">{method.subDetails}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* WhatsApp Contact Options */}
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Us on WhatsApp</h2>
              <p className="text-lg text-gray-600 mb-8">
                Choose your inquiry type below and start a conversation with us instantly on WhatsApp.
              </p>
              
              <div className="space-y-4">
                {whatsappOptions.map((option, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
                        <p className="text-gray-600 mb-4">{option.description}</p>
                      </div>
                      <button
                        onClick={() => handleWhatsAppClick(option.message)}
                        className="ml-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Chat Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Quick WhatsApp CTA */}
              <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Prefer to chat directly?</h3>
                    <p className="text-green-100">Send us a custom message on WhatsApp</p>
                  </div>
                  <button
                    onClick={() => handleWhatsAppClick('Hello! I have a question about Buds School.')}
                    className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3"
                  >
                    <MessageCircle className="w-6 h-6" />
                    Open WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Contact Information</h2>
              
              {/* Office Hours */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl mb-8 border border-blue-100">
                <div className="flex items-center gap-4 mb-6">
                  <Clock className="w-8 h-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-800">Office Hours</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Monday - Friday</span>
                    <span className="text-gray-900 font-semibold">8:00 AM - 4:00 PM</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">Saturday - Sunday</span>
                    <span className="text-red-600">Closed</span>
                  </div>
                </div>
              </div>

              {/* Department Contacts */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Department Contacts</h3>
                {departments.map((dept, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
                    <h4 className="text-xl font-bold text-gray-800 mb-3">{dept.name}</h4>
                    <p className="text-gray-600 mb-4">{dept.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <a href={`mailto:${dept.email}`} className="text-blue-600 hover:text-blue-700 font-medium">
                          {dept.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-green-600" />
                        <a href={`tel:${dept.phone}`} className="text-green-600 hover:text-green-700 font-medium">
                          {dept.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 p-6 rounded-xl mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-800">Emergency Contact</h3>
                </div>
                <p className="text-red-700 mb-3">For urgent matters outside office hours:</p>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-red-600" />
                  <a href="tel:+923001234567" className="text-red-700 font-semibold text-lg">
                    +92 (300) 123-4567
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Find Us</h2>
            <p className="text-xl text-gray-600">Located in the heart of AECHS, Rawalpindi</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 text-center">
            <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Buds School</h3>
            <p className="text-lg text-gray-700 mb-2">AECHS, Rawalpindi</p>
            <p className="text-lg text-gray-700 mb-6">Punjab, Pakistan</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
              Get Directions
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Visit Our Campus?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Schedule a personalized tour and see why Buds School is the perfect place for your child&apos;s education.
          </p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
            Schedule a Campus Tour
          </button>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;