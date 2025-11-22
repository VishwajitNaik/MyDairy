"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const NavigationBar = ({ currentPage }) => {
  const navbarRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Dropdown data
  const productsList = [
    { id: 'p1', name: 'Fresh Milk', description: 'Pure cow & buffalo milk' },
    { id: 'p2', name: 'Dairy Products', description: 'Curd, Paneer, Ghee' },
    { id: 'p3', name: 'Organic Range', description: 'Chemical-free products' },
    { id: 'p4', name: 'Flavored Milk', description: 'Chocolate, Strawberry' },
    { id: 'p5', name: 'Cheese Varieties', description: 'Mozzarella, Cheddar' }
  ];

  const servicesList = [
    { id: 's1', name: 'Farm Infrastructure', description: 'Modern dairy farms' },
    { id: 's2', name: 'Quality Control', description: 'ISO certified labs' },
    { id: 's3', name: 'Cold Chain', description: 'Temperature controlled transport' },
    { id: 's4', name: 'Home Delivery', description: 'Daily fresh delivery' },
    { id: 's5', name: 'Bulk Orders', description: 'For hotels & restaurants' }
  ];

  useEffect(() => {
    if (!navbarRef.current) return;

    // Navbar entrance animation
    const tl = gsap.timeline();
    
    tl.fromTo(navbarRef.current,
      {
        y: -100,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "elastic.out(1, 0.8)"
      }
    );

    // Animate menu items sequentially
    tl.fromTo(".nav-item",
      {
        y: -20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );

    // Floating animation
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(navbarRef.current, {
      y: -5,
      duration: 2,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
      floatTl.kill();
    };
  }, []);

  const handleDropdownEnter = (dropdownType) => {
    setActiveDropdown(dropdownType);
    
    // Animate dropdown entrance
    if (dropdownType) {
      gsap.fromTo(`.${dropdownType}-dropdown`,
        {
          opacity: 0,
          y: -10,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        }
      );
    }
  };

  const handleDropdownLeave = () => {
    // Animate dropdown exit
    if (activeDropdown) {
      gsap.to(`.${activeDropdown}-dropdown`, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => setActiveDropdown(null)
      });
    } else {
      setActiveDropdown(null);
    }
  };

  const handleProductClick = (productId) => {
    // Animate product selection
    const productElement = document.querySelector(`[data-product="${productId}"]`);
    if (productElement) {
      gsap.fromTo(productElement,
        { scale: 1 },
        {
          scale: 1.1,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        }
      );
    }
    console.log(`Selected product: ${productId}`);
    setActiveDropdown(null);
  };

  const handleNavClick = (section) => {
    // Animate button click
    const button = document.querySelector(`[data-nav="${section}"]`);
    if (button) {
      gsap.fromTo(button,
        { scale: 1 },
        {
          scale: 0.95,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        }
      );
    }
    console.log(`Navigating to: ${section}`);
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      // Animate mobile menu opening
      gsap.fromTo(".mobile-menu",
        {
          opacity: 0,
          y: -20,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.1
        }
      );
    }
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-10 left-1/2 -translate-x-1/2 
        w-[90vw] rounded-2xl z-[999] bg-black/90 backdrop-blur-xl shadow-2xl 
        border border-white/20 px-8 py-4 flex justify-between items-center"
      >
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">DD</span>
          </div>
          <h1 className="text-white text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Dairy Delights
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {/* About Us */}
          <button
            data-nav="about"
            onClick={() => handleNavClick('about')}
            className="nav-item px-6 py-3 text-white/90 hover:text-white 
            font-medium rounded-xl hover:bg-white/10 transition-all duration-300 
            border border-transparent hover:border-white/20"
          >
            About Us
          </button>

          {/* Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleDropdownEnter('products')}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              data-nav="products"
              className="nav-item px-6 py-3 text-white/90 hover:text-white 
              font-medium rounded-xl hover:bg-white/10 transition-all duration-300 
              border border-transparent hover:border-white/20 flex items-center space-x-1"
            >
              <span>Products</span>
              <span className={`transform transition-transform duration-300 ${activeDropdown === 'products' ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {activeDropdown === 'products' && (
              <div className="products-dropdown absolute top-full left-0 mt-2 w-80 
              bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 
              p-4 z-50">
                <h3 className="text-white font-bold text-lg mb-3 pb-2 border-b border-white/10">
                  Our Products
                </h3>
                <div className="space-y-2">
                  {productsList.map((product) => (
                    <button
                      key={product.id}
                      data-product={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full text-left p-3 rounded-lg hover:bg-white/10 
                      transition-all duration-300 border border-transparent 
                      hover:border-white/20 group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium group-hover:text-green-400 transition-colors">
                          {product.name}
                        </span>
                        <span className="text-white/40 group-hover:text-white/60 text-sm">
                          →
                        </span>
                      </div>
                      <p className="text-white/60 text-sm mt-1 group-hover:text-white/80">
                        {product.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Services & Infrastructure Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => handleDropdownEnter('services')}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              data-nav="services"
              className="nav-item px-6 py-3 text-white/90 hover:text-white 
              font-medium rounded-xl hover:bg-white/10 transition-all duration-300 
              border border-transparent hover:border-white/20 flex items-center space-x-1"
            >
              <span>Services</span>
              <span className={`transform transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {activeDropdown === 'services' && (
              <div className="services-dropdown absolute top-full left-0 mt-2 w-80 
              bg-black/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 
              p-4 z-50">
                <h3 className="text-white font-bold text-lg mb-3 pb-2 border-b border-white/10">
                  Services & Infrastructure
                </h3>
                <div className="space-y-2">
                  {servicesList.map((service) => (
                    <button
                      key={service.id}
                      data-service={service.id}
                      onClick={() => handleNavClick(`service-${service.id}`)}
                      className="w-full text-left p-3 rounded-lg hover:bg-white/10 
                      transition-all duration-300 border border-transparent 
                      hover:border-white/20 group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium group-hover:text-blue-400 transition-colors">
                          {service.name}
                        </span>
                        <span className="text-white/40 group-hover:text-white/60 text-sm">
                          →
                        </span>
                      </div>
                      <p className="text-white/60 text-sm mt-1 group-hover:text-white/80">
                        {service.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Contact */}
          <button
            data-nav="contact"
            onClick={() => handleNavClick('contact')}
            className="nav-item px-6 py-3 text-white/90 hover:text-white 
            font-medium rounded-xl hover:bg-white/10 transition-all duration-300 
            border border-transparent hover:border-white/20"
          >
            Contact
          </button>

          {/* Shop Now - CTA Button */}
          <button
            data-nav="shop"
            onClick={() => handleNavClick('shop')}
            className="nav-item px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 
            text-white font-bold rounded-xl hover:from-green-600 hover:to-blue-700 
            transition-all duration-300 transform hover:scale-105 shadow-lg 
            hover:shadow-green-500/25 border border-green-400/30"
          >
            Shop Now
          </button>
        </div>

        {/* Page Indicator */}
        <div className="hidden lg:flex items-center space-x-3">
          <span className="text-white/70 text-sm">Page</span>
          <span className="bg-gradient-to-r from-green-400 to-blue-500 px-3 py-1 
          rounded-full text-white font-bold text-sm shadow-lg">
            {currentPage}/9
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden w-10 h-10 flex flex-col justify-center items-center 
          space-y-1.5 bg-white/10 rounded-lg border border-white/20"
        >
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu fixed top-32 left-1/2 -translate-x-1/2 
        w-[90vw] bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl 
        border border-white/20 z-[998] p-6 lg:hidden">
          <div className="space-y-3">
            <button
              onClick={() => handleNavClick('about')}
              className="w-full text-left p-4 text-white font-medium rounded-xl 
              bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              About Us
            </button>

            <div className="space-y-2">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'products-mobile' ? null : 'products-mobile')}
                className="w-full text-left p-4 text-white font-medium rounded-xl 
                bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 flex justify-between"
              >
                <span>Products</span>
                <span>▼</span>
              </button>
              
              {activeDropdown === 'products-mobile' && (
                <div className="ml-4 space-y-2">
                  {productsList.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full text-left p-3 text-white/80 rounded-lg 
                      bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
                    >
                      {product.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full text-left p-4 text-white font-medium rounded-xl 
              bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Contact
            </button>

            <button
              onClick={() => handleNavClick('shop')}
              className="w-full p-4 bg-gradient-to-r from-green-500 to-blue-600 
              text-white font-bold rounded-xl text-center hover:from-green-600 
              hover:to-blue-700 transition-all duration-300"
            >
              Shop Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationBar;