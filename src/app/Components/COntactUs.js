// Components/ContactUs.jsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const ContactUs = ({ active }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  const socialRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: "📞",
      title: "Phone",
      details: "+91 98765 43210",
      subtitle: "Mon-Sun: 7:00 AM - 9:00 PM"
    },
    {
      icon: "📧",
      title: "Email",
      details: "info@jaindairy.com",
      subtitle: "We reply within 2 hours"
    },
    {
      icon: "📍",
      title: "Address",
      details: "GIDC Industrial Estate, Ahmedabad",
      subtitle: "Gujarat, India - 380001"
    },
    {
      icon: "🕒",
      title: "Business Hours",
      details: "24/7 Operations",
      subtitle: "Customer Support: 8AM-8PM"
    }
  ];

  const socialLinks = [
    { icon: "📘", name: "Facebook", url: "#", color: "from-blue-500 to-blue-700" },
    { icon: "📷", name: "Instagram", url: "#", color: "from-pink-500 to-pink-700" },
    { icon: "🐦", name: "Twitter", url: "#", color: "from-sky-500 to-sky-700" },
    { icon: "💼", name: "LinkedIn", url: "#", color: "from-blue-600 to-blue-800" }
  ];

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Reset animations
    gsap.set([titleRef.current, formRef.current, infoRef.current, mapRef.current, socialRef.current], {
      opacity: 0,
      y: 30
    });

    // Animate title
    tl.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    // Animate contact info cards
    .fromTo(infoRef.current?.children,
      { 
        x: -100,
        opacity: 0,
        scale: 0.8
      },
      { 
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    )
    // Animate form
    .fromTo(formRef.current,
      { 
        x: 100,
        opacity: 0,
        rotationY: 10
      },
      { 
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "power3.out"
      },
      "-=0.8"
    )
    // Animate map
    .fromTo(mapRef.current,
      { 
        scale: 0.8,
        opacity: 0,
        rotationX: -15
      },
      { 
        scale: 1,
        opacity: 1,
        rotationX: 0,
        duration: 0.8,
        ease: "power3.out"
      },
      "-=0.5"
    )
    // Animate social links
    .fromTo(socialRef.current?.children,
      { 
        y: 50,
        opacity: 0,
        scale: 0
      },
      { 
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "elastic.out(1, 0.8)"
      },
      "-=0.3"
    );

    // Floating animation for contact info cards
    contactInfo.forEach((_, index) => {
      if (infoRef.current?.children[index]) {
        gsap.to(infoRef.current.children[index], {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      }
    });

    // Pulse animation for social links
    socialLinks.forEach((_, index) => {
      if (socialRef.current?.children[index]) {
        gsap.to(socialRef.current.children[index], {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.3
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, [active]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Success animation
    gsap.to(formRef.current, {
      keyframes: [
        { scale: 1.02, duration: 0.2 },
        { scale: 1, duration: 0.2 }
      ],
      ease: "power2.out"
    });
    
    setIsSubmitting(false);
    
    // Show success message
    const submitButton = formRef.current?.querySelector('button[type="submit"]');
    if (submitButton) {
      const originalText = submitButton.textContent;
      submitButton.textContent = "Message Sent! ✅";
      submitButton.className = "w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300";
      
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.className = "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg";
      }, 3000);
    }
  };

  return (
<div
  ref={containerRef}
  className="w-full h-full p-6 bg-gradient-to-br from-gray-900 to-black 
  overflow-y-auto scrollbar-contact"
>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 ref={titleRef} className="text-5xl font-bold text-white mb-4">
          Get In Touch
        </h1>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Left: Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <div ref={infoRef} className="grid grid-cols-1 gap-4">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 
                text-white shadow-xl border border-white/10 backdrop-blur-sm
                transform-gpu cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl bg-white/10 p-3 rounded-xl">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                    <p className="text-white/90 text-sm font-semibold">{info.details}</p>
                    <p className="text-white/60 text-xs mt-1">{info.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-8">
            <h3 className="text-white text-xl font-bold mb-4 text-center">Follow Us</h3>
            <div ref={socialRef} className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`bg-gradient-to-br ${social.color} rounded-xl p-4 
                  text-white text-center shadow-lg transform-gpu cursor-pointer
                  hover:shadow-2xl transition-all duration-300 border border-white/20`}
                >
                  <div className="text-2xl mb-2">{social.icon}</div>
                  <div className="text-sm font-semibold">{social.name}</div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle: Contact Form */}
        <div className="lg:col-span-2">
          <div
            ref={formRef}
            className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-8 
            shadow-2xl border border-white/10 backdrop-blur-sm h-full"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Send us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-white text-sm font-semibold mb-2 block">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 
                    text-white placeholder-white/50 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-semibold mb-2 block">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 
                    text-white placeholder-white/50 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 
                  text-white placeholder-white/50 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 
                  text-white placeholder-white/50 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Subject *
                </label>
                <select
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 
                  text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
                  focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="product">Product Information</option>
                  <option value="wholesale">Wholesale Order</option>
                  <option value="complaint">Complaint</option>
                  <option value="partnership">Business Partnership</option>
                </select>
              </div>

              <div>
                <label className="text-white text-sm font-semibold mb-2 block">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 
                  text-white placeholder-white/50 focus:outline-none focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent transition-all duration-300 
                  resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white 
                py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 
                transform hover:scale-105 transition-all duration-300 shadow-lg 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Sending Message...
                  </div>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-12 max-w-7xl mx-auto">
        <div
          ref={mapRef}
          className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl p-8 
          shadow-2xl border border-white/10 backdrop-blur-sm"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Visit Our Location
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl 
            h-64 flex items-center justify-center border-2 border-white/10">
              <div className="text-center text-white">
                <div className="text-4xl mb-4">🗺️</div>
                <div className="text-lg font-semibold">Interactive Map</div>
                <div className="text-white/60 text-sm mt-2">GIDC Industrial Estate, Ahmedabad</div>
              </div>
            </div>

            {/* Location Details */}
            <div className="space-y-4">
              <div className="text-white">
                <h3 className="font-bold text-lg mb-2">Jain Dairy Headquarters</h3>
                <p className="text-white/80 leading-relaxed">
                  Located in the heart of Gujarat's industrial hub, our state-of-the-art 
                  facility ensures the highest quality dairy products with modern 
                  technology and traditional values.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-white/80 text-sm">
                <div>
                  <strong>Parking:</strong> Available
                </div>
                <div>
                  <strong>Tour:</strong> By Appointment
                </div>
                <div>
                  <strong>Capacity:</strong> 1,00,000 L/day
                </div>
                <div>
                  <strong>ISO:</strong> 22000:2005
                </div>
              </div>

              <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold 
              hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 
              shadow-lg border border-white/20 mt-4">
                Get Directions →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Response Banner */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 
      bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 
      rounded-full shadow-2xl border border-white/20 backdrop-blur-sm z-30
      animate-pulse">
        <div className="flex items-center space-x-2 text-sm font-semibold">
          <span>⚡</span>
          <span>Quick Response Guaranteed - Within 2 Hours!</span>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;