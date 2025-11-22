// Components/HeroCarousel.jsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const HeroCarousel = ({ active }) => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const buttonsRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselData = [
    {
      image: "/assets/img1.png",
      title: "Welcome to Jain Dairy",
      description: "Experience the journey of pure, fresh dairy products from farm to your home. Discover our commitment to quality and tradition since 1988.",
      button1: "Explore Products",
      button2: "Our Story",
      overlay: "from-black/70 via-black/50 to-transparent"
    },
    {
      image: "/assets/img2.png",
      title: "Pure & Natural Milk",
      description: "100% pure cow and buffalo milk sourced directly from local farms. No preservatives, no additives - just natural goodness.",
      button1: "View Milk Range",
      button2: "Quality Process",
      overlay: "from-blue-900/60 via-blue-900/40 to-transparent"
    },
    {
      image: "/assets/img3.png",
      title: "Fresh Dairy Products",
      description: "From creamy curd to delicious paneer, discover our wide range of fresh dairy products made with love and care.",
      button1: "Shop Now",
      button2: "Recipes",
      overlay: "from-green-900/60 via-green-900/40 to-transparent"
    },
    {
      image: "/assets/img4.png",
      title: "Since 1988",
      description: "Trusted by generations for over three decades. Our commitment to quality remains unchanged since our inception.",
      button1: "Our History",
      button2: "Testimonials",
      overlay: "from-purple-900/60 via-purple-900/40 to-transparent"
    }
  ];

  // Preload images
  useEffect(() => {
    carouselData.forEach(slide => {
      const img = new Image();
      img.src = slide.image;
    });
  }, []);

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Reset animations
    gsap.set([titleRef.current, contentRef.current, buttonsRef.current], {
      opacity: 0,
      y: 50
    });

    // Animate title
    tl.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    // Animate content
    .fromTo(contentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    )
    // Animate buttons
    .fromTo(buttonsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.3"
    )
    // Start carousel animation
    .add(() => {
      if (carouselRef.current) {
        const slides = carouselRef.current.querySelectorAll('.carousel-slide');
        const textOverlays = carouselRef.current.querySelectorAll('.text-overlay');
        
        if (slides && slides.length) {
          gsap.set(slides[0], { opacity: 1, scale: 1 });
          gsap.set(textOverlays[0], { opacity: 1 });
          
          const carouselTl = gsap.timeline({ repeat: -1 });
          
          for (let i = 0; i < slides.length; i++) {
            const next = (i + 1) % slides.length;
            
            carouselTl
              .to(slides[i], { 
                opacity: 0,
                scale: 1.1,
                duration: 1.5,
                ease: "power2.inOut"
              })
              .to(textOverlays[i], { 
                opacity: 0, 
                duration: 1 
              }, "<")
              .fromTo(slides[next], 
                { opacity: 0, scale: 1 },
                { 
                  opacity: 1,
                  scale: 1,
                  duration: 1.5,
                  ease: "power2.inOut",
                  onStart: () => setCurrentSlide(next)
                }
              )
              .to(textOverlays[next], { 
                opacity: 1, 
                duration: 1 
              }, "<0.5")
              .to({}, { duration: 4 }); // Pause time
          }
        }
      }
    }, "-=0.3");

    // Floating animation
    const floatAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    floatAnimation.to(carouselRef.current, {
      y: -15,
      duration: 3,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
      floatAnimation.kill();
    };
  }, [active]);

  const goToSlide = (index) => {
    if (carouselRef.current) {
      const slides = carouselRef.current.querySelectorAll('.carousel-slide');
      const textOverlays = carouselRef.current.querySelectorAll('.text-overlay');
      
      // Hide all slides and overlays
      gsap.set(slides, { opacity: 0, scale: 1 });
      gsap.set(textOverlays, { opacity: 0 });
      
      // Show selected slide and overlay
      gsap.to(slides[index], { 
        opacity: 1, 
        scale: 1,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.to(textOverlays[index], { 
        opacity: 1, 
        duration: 0.8,
        delay: 0.3
      });
      
      setCurrentSlide(index);
    }
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % carouselData.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + carouselData.length) % carouselData.length);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* CAROUSEL CONTAINER */}
      <div 
        ref={carouselRef}
        className="relative w-[95%] h-[85%] overflow-hidden rounded-3xl shadow-2xl border-2 border-white/10"
      >
        {/* CAROUSEL SLIDES */}
        {carouselData.map((slide, index) => (
          <div key={index} className="absolute inset-0 w-full h-full">
            {/* Background Image with Loading State */}
            <div 
              className={`carousel-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                index === 0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt={`${slide.title} - Jain Dairy`}
                loading="eager"
                onError={(e) => {
                  e.target.src = `https://images.unsplash.com/photo-1566474591109-8db269d6d9a3?w=1200&h=800&fit=crop&text=Jain+Dairy+${index + 1}`;
                }}
              />
              
              {/* Enhanced Overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`}
              />
            </div>
            
            {/* Text Content Overlay */}
            <div 
              className={`text-overlay absolute inset-0 flex flex-col items-center justify-center text-white 
                px-8 transition-opacity duration-1000 ${
                index === 0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="text-center max-w-6xl">
                {/* Title */}
                <h1 
                  ref={index === 0 ? titleRef : null}
                  className="text-5xl md:text-7xl font-bold mb-6 text-center leading-tight drop-shadow-2xl"
                >
                  {slide.title}
                </h1>
                
                {/* Description */}
                <p 
                  ref={index === 0 ? contentRef : null}
                  className="text-xl md:text-2xl mb-10 text-center max-w-4xl leading-relaxed drop-shadow-lg opacity-95"
                >
                  {slide.description}
                </p>
                
                {/* Buttons */}
                <div 
                  ref={index === 0 ? buttonsRef : null}
                  className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                >
                  <button 
                    className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold 
                      hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 
                      shadow-2xl border-2 border-white text-lg min-w-[200px] hover:shadow-3xl
                      active:scale-95"
                  >
                    {slide.button1}
                  </button>
                  <button 
                    className="bg-transparent text-white px-10 py-4 rounded-full font-bold 
                      border-2 border-white hover:bg-white hover:text-slate-900 transform hover:scale-105 
                      transition-all duration-300 shadow-2xl text-lg min-w-[200px] hover:shadow-3xl
                      active:scale-95"
                  >
                    {slide.button2}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* CAROUSEL INDICATORS */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-5 h-5 rounded-full cursor-pointer transition-all duration-300 border-2 border-white ${
                currentSlide === index 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-transparent hover:bg-white/50 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* SLIDE COUNTER */}
        <div className="absolute top-8 right-8 bg-black/40 backdrop-blur-md rounded-full 
          px-5 py-3 text-white font-semibold border border-white/20 z-20 shadow-2xl">
          <span className="text-lg">{currentSlide + 1}</span>
          <span className="text-white/60 mx-2">/</span>
          <span className="text-white/60">{carouselData.length}</span>
        </div>

        {/* NAVIGATION ARROWS */}
        <button 
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-14 h-14 
          bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center 
          text-white text-3xl border-2 border-white/20 hover:bg-white/20 transition-all 
          duration-300 z-20 hover:scale-110 hover:border-white/40 shadow-2xl
          active:scale-95"
          aria-label="Previous slide"
        >
          ‹
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-14 h-14 
          bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center 
          text-white text-3xl border-2 border-white/20 hover:bg-white/20 transition-all 
          duration-300 z-20 hover:scale-110 hover:border-white/40 shadow-2xl
          active:scale-95"
          aria-label="Next slide"
        >
          ›
        </button>

        {/* GRADIENT OVERLAYS FOR BETTER READABILITY */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black/30 to-transparent z-10" />
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 
        text-white/70 animate-bounce z-10">
        <div className="text-center">
          <div className="text-sm mb-2 font-medium">Scroll to Explore</div>
          <div className="text-2xl">↓</div>
        </div>
      </div>

      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/50 to-slate-900 pointer-events-none" />
    </div>
  );
};

export default HeroCarousel;