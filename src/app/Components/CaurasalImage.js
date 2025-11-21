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
      image: "https://picsum.photos/450/300?grayscale",
      title: "Welcome to Jain Dairy",
      description: "Experience the journey of pure, fresh dairy products from farm to your home. Discover our commitment to quality and tradition since 1988.",
      button1: "Explore Products",
      button2: "Our Story",
      overlay: "from-black/60 to-transparent"
    },
    {
      image: "https://picsum.photos/450/300?grayscale",
      title: "Pure & Natural Milk",
      description: "100% pure cow and buffalo milk sourced directly from local farms. No preservatives, no additives - just natural goodness.",
      button1: "View Milk Range",
      button2: "Quality Process",
      overlay: "from-blue-900/50 to-transparent"
    },
    {
      image: "https://picsum.photos/450/300?grayscale",
      title: "Fresh Dairy Products",
      description: "From creamy curd to delicious paneer, discover our wide range of fresh dairy products made with love and care.",
      button1: "Shop Now",
      button2: "Recipes",
      overlay: "from-green-900/50 to-transparent"
    },
    {
      image: "https://picsum.photos/450/300?grayscale",
      title: "Since 1988",
      description: "Trusted by generations for over three decades. Our commitment to quality remains unchanged since our inception.",
      button1: "Our History",
      button2: "Testimonials",
      overlay: "from-purple-900/50 to-transparent"
    }
  ];

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
          gsap.set(slides[0], { opacity: 1 });
          gsap.set(textOverlays[0], { opacity: 1 });
          
          const carouselTl = gsap.timeline({ repeat: -1 });
          
          for (let i = 0; i < slides.length; i++) {
            const next = (i + 1) % slides.length;
            
            carouselTl
              .to(slides[i], { 
                opacity: 0, 
                duration: 1,
                onComplete: () => setCurrentSlide(next)
              })
              .to(textOverlays[i], { 
                opacity: 0, 
                duration: 1 
              }, "<")
              .to(slides[next], { 
                opacity: 1, 
                duration: 1 
              }, "<")
              .to(textOverlays[next], { 
                opacity: 1, 
                duration: 1 
              }, "<")
              .to({}, { duration: 3 }); // Increased pause time
          }
        }
      }
    }, "-=0.3");

    // Add some floating animation to the carousel container
    const floatAnimation = gsap.timeline({ repeat: -1, yoyo: true });
    floatAnimation.to(carouselRef.current, {
      y: -10,
      duration: 2,
      ease: "sine.inOut"
    });

    return () => {
      tl.kill();
      floatAnimation.kill();
      // Kill all carousel animations
      gsap.killTweensOf(carouselRef.current?.children);
    };
  }, [active]);

  const goToSlide = (index) => {
    if (carouselRef.current) {
      const slides = carouselRef.current.querySelectorAll('.carousel-slide');
      const textOverlays = carouselRef.current.querySelectorAll('.text-overlay');
      
      // Hide all slides and overlays
      gsap.set(slides, { opacity: 0 });
      gsap.set(textOverlays, { opacity: 0 });
      
      // Show selected slide and overlay
      gsap.to(slides[index], { opacity: 1, duration: 0.5 });
      gsap.to(textOverlays[index], { opacity: 1, duration: 0.5 });
      
      setCurrentSlide(index);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {/* CAROUSEL WITH TEXT OVERLAY */}
      <div 
        ref={carouselRef}
        className="relative w-[90%] h-[80%] overflow-hidden rounded-2xl shadow-2xl border-4 border-white/20"
      >
        {carouselData.map((slide, index) => (
          <div key={index} className="relative w-full h-full">
            {/* Background Image */}
            <div className={`carousel-slide absolute top-0 left-0 w-full h-full ${index === 0 ? 'opacity-100' : 'opacity-0'}`}>
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt={`Carousel ${index + 1}`}
              />
            </div>
            
            {/* Text Overlay */}
            <div 
              className={`text-overlay absolute inset-0 flex flex-col items-center justify-center text-white 
                p-8 ${index === 0 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000
                bg-gradient-to-r ${slide.overlay}`}
            >
              {/* Title */}
              <h1 
                ref={index === 0 ? titleRef : null}
                className="text-6xl font-bold mb-6 text-center drop-shadow-2xl max-w-4xl leading-tight"
              >
                {slide.title}
              </h1>
              
              {/* Description */}
              <p 
                ref={index === 0 ? contentRef : null}
                className="text-xl mb-8 text-center max-w-2xl leading-relaxed drop-shadow-lg"
              >
                {slide.description}
              </p>
              
              {/* Buttons */}
              <div 
                ref={index === 0 ? buttonsRef : null}
                className="flex gap-6"
              >
                <button className="bg-white text-black px-8 py-4 rounded-full font-semibold 
                  hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 
                  shadow-2xl border border-white/20 text-lg min-w-[180px]">
                  {slide.button1}
                </button>
                <button className="bg-transparent text-white px-8 py-4 rounded-full font-semibold 
                  border-2 border-white hover:bg-white hover:text-black transform hover:scale-105 
                  transition-all duration-300 shadow-2xl text-lg min-w-[180px]">
                  {slide.button2}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {carouselData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm rounded-full 
        px-4 py-2 text-white font-semibold border border-white/20 z-20">
          {currentSlide + 1} / {carouselData.length}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={() => goToSlide((currentSlide - 1 + carouselData.length) % carouselData.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 
          bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center 
          text-white text-2xl border border-white/20 hover:bg-white/20 transition-all 
          duration-300 z-20 hover:scale-110"
        >
          ‹
        </button>
        
        <button 
          onClick={() => goToSlide((currentSlide + 1) % carouselData.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 
          bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center 
          text-white text-2xl border border-white/20 hover:bg-white/20 transition-all 
          duration-300 z-20 hover:scale-110"
        >
          ›
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
      text-white/60 animate-bounce z-10">
        <div className="text-center">
          <div className="text-sm mb-1">Scroll Down</div>
          <div className="text-2xl">↓</div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;