'use client'

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  Star, 
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
    { icon: BookOpen, value: "Matriculation", label: "Uptil Grade" },
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent",
      image: "/images/image6.jpg",
      quote: "Buds School has transformed my daughter's learning experience. The teachers are exceptional and truly care about each student's success."
    },
    {
      name: "Michael Chen",
      role: "Alumni Parent",
      image: "/images/image10.jpg", 
      quote: "Both my children graduated from Buds School. The foundation they received here prepared them excellently for university and beyond."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="relative z-10 flex items-center justify-center h-full">
              <div className="text-center text-white max-w-4xl mx-auto px-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 font-light">
                  {slide.subtitle}
                </p>
                <p className="text-lg mb-12 max-w-2xl mx-auto opacity-90">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                    Apply Now! <ChevronRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsVideoPlaying(true)}
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" /> Watch Video
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Shaping Tomorrow's Leaders Today
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At Buds School, we believe every child has unlimited potential waiting to be discovered. 
                Our innovative approach to education combines academic rigor with character development, 
                preparing students not just for tests, but for life.
              </p>
              <div className="space-y-4">
                {[
                  "Personalized learning approach for every student",
                  "State-of-the-art facilities and technology integration",
                  "Strong emphasis on values and character building",
                  "Comprehensive extracurricular programs"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Learn More About Us
              </button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl p-1">
                <img 
                  src="/images/image11.jpg" 
                  alt="Students at Buds School" 
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-2xl font-bold text-blue-600">25+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Buds School?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a nurturing environment where academic excellence meets character development, 
              preparing students for success in an ever-changing world.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Parents Say About Us
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our community of satisfied parents and students
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Join the Buds School Family?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Give your child the gift of exceptional education. Applications are now open for the new academic year.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105">
              Apply for Admission
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-all">
              Schedule a Visit
            </button>
          </div>
        </div>
      </section>

      {/* Quick Contact Footer */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-6 h-6 text-blue-400" />
              <span>123 Education Street, Learning City</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="w-6 h-6 text-blue-400" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mail className="w-6 h-6 text-blue-400" />
              <span>info@budsschool.edu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Buds School Virtual Tour</h3>
              <button 
                onClick={() => setIsVideoPlaying(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="bg-gray-200 h-64 flex items-center justify-center rounded">
              <div className="text-center">
                <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Virtual tour video would play here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;