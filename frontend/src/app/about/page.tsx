'use client'

import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  Heart,
  Target,
  Eye,
  ChevronRight,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Globe,
  Star,
  UserCheck,
  Building,
  Lightbulb,
  Trophy,
  Shield
} from 'lucide-react';

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const milestones = [
    {
      year: "2005",
      title: "Foundation",
      description: "Buds School was established with a vision to provide quality education in Rawalpindi"
    },
    {
      year: "2006",
      title: "Expansion",
      description: "Extended to secondary education and introduced modern teaching methodologies"
    },
    {
      year: "2008",
      title: "Technology Integration",
      description: "Became one of the first schools in the region to integrate digital learning"
    },
    {
      year: "2010",
      title: "Academic Excellence",
      description: "Achieved 100% pass rate in matriculation exams for three consecutive years"
    },
    {
      year: "2015",
      title: "Campus Modernization",
      description: "Major infrastructure upgrade with state-of-the-art facilities"
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description: "Successfully transitioned to hybrid learning model during global challenges"
    },
    {
      year: "2024",
      title: "Excellence Recognition",
      description: "Awarded 'Best Educational Institution' by Punjab Education Board"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We foster empathy and kindness in every interaction, creating a supportive community where every student feels valued and understood."
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "We strive for the highest standards in academics, character, and personal development, pushing our students to reach their full potential."
    },
    {
      icon: Shield,
      title: "Integrity",
      description: "We build character through honesty, respect, and ethical behavior, preparing students to be responsible citizens of tomorrow."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace creativity and forward-thinking approaches to education, preparing students for an ever-evolving world."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in the power of collaboration and mutual support, creating lasting bonds between students, families, and educators."
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "We prepare students to be global citizens with awareness of diverse cultures and perspectives in our interconnected world."
    }
  ];

  const faculty = [
    {
      name: "Mrs. Neelofer Nafees",
      position: "Principal",
      qualification: "Msc. in Chemistry",
      experience: "20+ years",
      image: "/images/faculty1.jpg"
    },
    {
      name: "Lt Col. Nafees Ahmed",
      position: "Director",
      qualification: "MS in Political Science",
      experience: "27+ years",
      image: "/images/faculty2.jpg"
    },
    {
      name: "Ms. Fatima Khan",
      position: "Head of Sciences",
      qualification: "M.Sc. in Physics",
      experience: "10+ years",
      image: "/images/faculty3.jpg"
    },
    {
      name: "Mr. Ahmad Raza",
      position: "Head of Languages",
      qualification: "M.A. in English Literature",
      experience: "8+ years",
      image: "/images/faculty4.jpg"
    }
  ];

  const facilities = [
    {
      icon: BookOpen,
      title: "Modern Library",
      description: "Over 5,000 books, digital resources, and quiet study spaces"
    },
    {
      icon: Building,
      title: "Science Laboratories",
      description: "Fully equipped Physics, Chemistry, and Biology labs"
    },
    {
      icon: Users,
      title: "Smart Classrooms",
      description: "Interactive whiteboards and multimedia learning tools"
    },
    {
      icon: Heart,
      title: "Sports Complex",
      description: "Basketball court, football field, and indoor games facility"
    },
    {
      icon: Target,
      title: "Computer Lab",
      description: "Latest computers with high-speed internet connectivity"
    },
    {
      icon: Star,
      title: "Auditorium",
      description: "300-seat auditorium for events and presentations"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-gray-200"
          style={{ backgroundImage: "url('/images/image3.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              About Buds School
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-95 leading-relaxed">
              Nurturing young minds for nearly three decades with excellence, innovation, and compassion
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Foundation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything we do is guided by our core mission, vision, and values that shape the educational experience at Buds School.
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              <div className="flex space-x-2">
                {[
                  { id: 'mission', label: 'Mission', icon: Target },
                  { id: 'vision', label: 'Vision', icon: Eye },
                  { id: 'values', label: 'Values', icon: Heart }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all ${
                      activeTab === tab.id 
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            {activeTab === 'mission' && (
              <div className="text-center">
                <Target className="w-16 h-16 text-blue-600 mx-auto mb-8" />
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h3>
                <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  To provide exceptional education that nurtures intellectual curiosity, develops critical thinking skills, 
                  and builds character in our students. We are committed to creating a supportive learning environment 
                  where every child can discover their unique talents and reach their full potential, preparing them to 
                  become responsible, compassionate, and successful global citizens.
                </p>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="text-center">
                <Eye className="w-16 h-16 text-blue-600 mx-auto mb-8" />
                <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h3>
                <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                  To be recognized as the leading educational institution in Pakistan, known for academic excellence, 
                  innovative teaching methods, and holistic student development. We envision a future where our graduates 
                  are confident leaders, creative problem-solvers, and ethical individuals who contribute positively to 
                  society and make a meaningful impact in their chosen fields.
                </p>
              </div>
            )}

            {activeTab === 'values' && (
              <div>
                <div className="text-center mb-12">
                  <Heart className="w-16 h-16 text-blue-600 mx-auto mb-8" />
                  <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Core Values</h3>
                  <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    These fundamental principles guide everything we do and shape the character of our school community.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {values.map((value, index) => (
                    <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all">
                      <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                      <h4 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nearly three decades of educational excellence, innovation, and continuous growth in serving our community.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 to-blue-400 rounded-full"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                  <div className={`bg-white p-8 rounded-2xl shadow-lg border border-gray-100 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{milestone.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Meet Our Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our dedicated team of experienced educators and administrators who are committed to your child's success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {faculty.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
                <div 
                  className="w-24 h-24 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl mx-auto mb-6 bg-cover bg-center"
                  style={{ backgroundImage: `url(${member.image})` }}
                ></div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.qualification}</p>
                  <p className="text-gray-500 text-sm">{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">World-Class Facilities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our state-of-the-art campus provides the perfect environment for learning, growth, and discovery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  <facility.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{facility.title}</h3>
                <p className="text-gray-600 leading-relaxed">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Experience the Buds School Difference
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Visit our campus and see firsthand why Buds School has been the choice of discerning families for nearly three decades.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
              Schedule a Campus Tour <ChevronRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-4 rounded-full text-lg font-semibold transition-all">
              Download Prospectus
            </button>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center gap-4 p-6 rounded-xl bg-gray-800 hover:bg-gray-750 transition-colors">
              <MapPin className="w-8 h-8 text-blue-400 flex-shrink-0" />
              <span className="text-lg">AECHS, Rawalpindi</span>
            </div>
            <div className="flex items-center justify-center gap-4 p-6 rounded-xl bg-gray-800 hover:bg-gray-750 transition-colors">
              <Phone className="w-8 h-8 text-blue-400 flex-shrink-0" />
              <span className="text-lg">+92 (51) 123-4567</span>
            </div>
            <div className="flex items-center justify-center gap-4 p-6 rounded-xl bg-gray-800 hover:bg-gray-750 transition-colors">
              <Mail className="w-8 h-8 text-blue-400 flex-shrink-0" />
              <span className="text-lg">info@budsschool.edu.pk</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;