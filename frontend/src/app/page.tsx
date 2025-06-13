'use client'

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  ChevronRight,
  Play,
  CheckCircle,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const heroSlides = [
    {
      image: "/images/image1.jpg",
      title: "Welcome to Buds School",
      subtitle: "Where Young Minds Blossom Into Bright Futures",
      description: "Nurturing excellence through innovative education and holistic development since 1995."
    },
    {
      image: "/images/classroom.jpg", 
      title: "Modern Learning Environment",
      subtitle: "State-of-the-Art Facilities for 21st Century Education",
      description: "Experience learning in our technology-enhanced classrooms designed for interactive education."
    },
    {
      image: "/images/image3.jpg",
      title: "Excellence in Education",
      subtitle: "Empowering Students to Reach Their Full Potential",
      description: "Our comprehensive curriculum and dedicated faculty ensure every student succeeds."
    }
  ];

  const stats = [
    { icon: Users, value: "200+", label: "Students" },
    { icon: BookOpen, value: "Matriculation", label: "Up to Grade" },
    { icon: Award, value: "18+", label: "Years of Excellence" },
    { icon: GraduationCap, value: "95%", label: "Success Rate" }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Academic Excellence",
      description: "Comprehensive curriculum designed to challenge and inspire students at every level."
    },
    {
      icon: Users,
      title: "Expert Faculty",
      description: "Highly qualified teachers committed to nurturing each student's unique potential."
    },
    {
      icon: Award,
      title: "Holistic Development",
      description: "Focus on character building, leadership skills, and extracurricular activities."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-gray-200"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white max-w-5xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-3xl mb-8 font-light opacity-95">
                  {slide.subtitle}
                </p>
                <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                    Apply Now <ChevronRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsVideoPlaying(true)}
                    className="border-2 border-white/80 text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-full text-lg font-semibold transition-all backdrop-blur-sm hover:backdrop-blur-none flex items-center justify-center gap-3"
                  >
                    <Play className="w-5 h-5" /> Watch Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all">
                  <stat.icon className="w-9 h-9" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-3">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-800 mb-8 leading-tight">
                Shaping Tomorrow's Leaders Today
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                At Buds School, we believe every child has unlimited potential waiting to be discovered. 
                Our innovative approach to education combines academic rigor with character development, 
                preparing students not just for tests, but for life.
              </p>
              <div className="space-y-5">
                {[
                  "Personalized learning approach for every student",
                  "State-of-the-art facilities and technology integration",
                  "Strong emphasis on values and character building",
                  "Comprehensive extracurricular programs"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <CheckCircle className="w-7 h-7 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                Learn More About Us
              </button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-3xl p-2 shadow-2xl">
                <div 
                  className="w-full h-[500px] bg-gray-200 rounded-2xl bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/image11.jpg')" }}
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                <div className="text-3xl font-bold text-blue-600 mb-1">18+</div>
                <div className="text-gray-600 font-medium">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">
              Why Choose Buds School?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              We provide a nurturing environment where academic excellence meets character development, 
              preparing students for success in an ever-changing world.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-3 border border-gray-100">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-8">
                  <feature.icon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-5">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-5xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
            Ready to Join the Buds School Family?
          </h2>
          <p className="text-2xl text-blue-100 mb-14 leading-relaxed">
            Give your child the gift of exceptional education. Applications are now open for the new academic year.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-5 rounded-full text-xl font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
              Apply for Admission
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-10 py-5 rounded-full text-xl font-semibold transition-all backdrop-blur-sm">
              Schedule a Visit
            </button>
          </div>
        </div>
      </section>

      {/* Quick Contact Footer */}
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

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl max-w-4xl w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Buds School Virtual Tour</h3>
              <button 
                onClick={() => setIsVideoPlaying(false)}
                className="text-gray-500 hover:text-gray-700 text-3xl font-light"
              >
                ×
              </button>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-80 flex items-center justify-center rounded-xl">
              <div className="text-center">
                <Play className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                <p className="text-gray-600 text-lg">Virtual tour video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;