// Components/Footer.jsx
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Animate footer on page load
    const tl = gsap.timeline({
      delay: 0.5
    });

    tl.fromTo(footerRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(contentRef.current?.children,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
      "-=0.5"
    );

    // Floating animation for social icons
    gsap.to(".social-icon", {
      y: -5,
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
    };
  }, []);

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Products", href: "#" },
    { name: "Our Process", href: "#" },
    { name: "Contact", href: "#" }
  ];

  const products = [
    "Fresh Milk",
    "Curd & Yogurt",
    "Butter & Ghee",
    "Paneer",
    "Cheese",
    "Flavored Milk"
  ];

  const socialLinks = [
    { icon: "📘", name: "Facebook", url: "#" },
    { icon: "📷", name: "Instagram", url: "#" },
    { icon: "🐦", name: "Twitter", url: "#" },
    { icon: "💼", name: "LinkedIn", url: "#" },
    { icon: "📺", name: "YouTube", url: "#" }
  ];

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-br from-gray-900 to-black border-t border-white/10 
      backdrop-blur-sm text-white overflow-hidden"
    >
      {/* Main Footer Content */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🥛</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Jain Dairy
              </h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Serving fresh, pure dairy products since 1988. From farm to your home, 
              we ensure the highest quality standards in every product.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="social-icon w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center 
                  text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-110 
                  border border-white/10 backdrop-blur-sm"
                >
                  <span className="text-sm">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-all duration-300 
                    hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Our Products</h4>
            <ul className="space-y-2">
              {products.map((product, index) => (
                <li key={index}>
                  <span className="text-white/70 text-sm hover:text-white transition-colors duration-300 cursor-pointer">
                    {product}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-blue-400">📍</span>
                </div>
                <div>
                  <p className="text-white font-medium">GIDC Industrial Estate</p>
                  <p className="text-white/70">Ahmedabad, Gujarat - 380001</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-green-400">📞</span>
                </div>
                <div>
                  <p className="text-white font-medium">+91 98765 43210</p>
                  <p className="text-white/70">Mon-Sun: 7AM-9PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-purple-400">📧</span>
                </div>
                <div>
                  <p className="text-white font-medium">info@jaindairy.com</p>
                  <p className="text-white/70">Reply within 2 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & Awards */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-white font-semibold text-sm">ISO 22000:2005</div>
              <div className="text-white/60 text-xs">Certified</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">🏆</div>
              <div className="text-white font-semibold text-sm">35+ Years</div>
              <div className="text-white/60 text-xs">Experience</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">🚚</div>
              <div className="text-white font-semibold text-sm">70+ Vehicles</div>
              <div className="text-white/60 text-xs">Fleet</div>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-2">💯</div>
              <div className="text-white font-semibold text-sm">100% Pure</div>
              <div className="text-white/60 text-xs">Quality</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-white/60 text-sm">
              © 2024 Jain Dairy. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
    </footer>
  );
};

export default Footer;