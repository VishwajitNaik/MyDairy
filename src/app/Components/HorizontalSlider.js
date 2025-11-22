// // Horizantal Card Slider with 3D Rotation

// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//   const sliderRef = useRef(null);
//   const cardsRef = useRef([]);
//   const progressBarRef = useRef(null);

//   useEffect(() => {
//     cardsRef.current = cardsRef.current.slice(0, 6);
//   }, []);

//   useEffect(() => {
//     if (!sliderRef.current) return;

//     const cards = cardsRef.current.filter(Boolean);
//     const totalWidth = cards.length * 100; // 100% per card

//     // Set initial positions
//     gsap.set(cards, {
//       x: (i) => i * 100 + "%",
//       rotationY: -45,
//       opacity: 0.6,
//       scale: 0.8,
//     });

//     // Horizontal scroll animation
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sliderRef.current,
//         start: "top top",
//         end: `+=${totalWidth * 2}%`,
//         scrub: 1,
//         pin: true,
//         anticipatePin: 1,
//         onUpdate: (self) => {
//           const progress = self.progress;
          
//           // Update progress bar
//           if (progressBarRef.current) {
//             gsap.set(progressBarRef.current, {
//               scaleX: progress,
//             });
//           }

//           // Individual card animations
//           cards.forEach((card, index) => {
//             const cardProgress = (progress - index * 0.15) * 3;
            
//             if (cardProgress >= 0 && cardProgress <= 1) {
//               // Rotation and scale animation
//               const rotation = gsap.utils.interpolate(-45, 0, cardProgress);
//               const scale = gsap.utils.interpolate(0.8, 1, cardProgress);
//               const opacity = gsap.utils.interpolate(0.6, 1, cardProgress);
//               const x = gsap.utils.interpolate(50, 0, cardProgress);

//               gsap.set(card, {
//                 rotationY: rotation,
//                 scale: scale,
//                 opacity: opacity,
//                 x: x + "%",
//                 zIndex: cardProgress > 0.5 ? 10 : 1,
//               });
//             } else if (cardProgress > 1) {
//               // Exit animation
//               const exitProgress = (cardProgress - 1) * 2;
//               const rotation = gsap.utils.interpolate(0, 45, exitProgress);
//               const scale = gsap.utils.interpolate(1, 0.8, exitProgress);
//               const opacity = gsap.utils.interpolate(1, 0.6, exitProgress);
//               const x = gsap.utils.interpolate(0, -50, exitProgress);

//               gsap.set(card, {
//                 rotationY: rotation,
//                 scale: scale,
//                 opacity: opacity,
//                 x: x + "%",
//                 zIndex: 1,
//               });
//             }
//           });
//         },
//       },
//     });

//     // Main horizontal movement
//     tl.to(cards, {
//       x: `-=${totalWidth - 100}%`,
//       duration: 1,
//       ease: "none",
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   const addToRefs = (el, index) => {
//     if (el && !cardsRef.current.includes(el)) {
//       cardsRef.current[index] = el;
//     }
//   };

//   const cards = [
//     { id: 1, src: "https://picsum.photos/800/500?random=1", title: "Card 1" },
//     { id: 2, src: "https://picsum.photos/800/500?random=2", title: "Card 2" },
//     { id: 3, src: "https://picsum.photos/800/500?random=3", title: "Card 3" },
//     { id: 4, src: "https://picsum.photos/800/500?random=4", title: "Card 4" },
//     { id: 5, src: "https://picsum.photos/800/500?random=5", title: "Card 5" },
//     { id: 6, src: "https://picsum.photos/800/500?random=6", title: "Card 6" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      
//       {/* Header */}
//       <div className="text-center py-16">
//         <h1 className="text-6xl font-bold text-white mb-4">
//           Horizontal Card Slider
//         </h1>
//         <p className="text-xl text-purple-200">
//           Scroll down to see cards slide and rotate
//         </p>
//       </div>

//       {/* Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
//         <div 
//           ref={progressBarRef}
//           className="h-full bg-gradient-to-r from-purple-500 to-pink-500 origin-left"
//         />
//       </div>

//       {/* Horizontal Slider Section */}
//       <div 
//         ref={sliderRef}
//         className="relative h-screen overflow-hidden"
//       >
//         <div className="relative w-full h-full flex items-center">
//           {cards.map((card, index) => (
//             <div
//               key={card.id}
//               ref={(el) => addToRefs(el, index)}
//               className="absolute w-[80vw] max-w-4xl will-change-transform"
//               style={{
//                 left: "10%",
//                 perspective: "1000px",
//               }}
//             >
//               <div className="relative group">
//                 <Image
//                   src={card.src}
//                   width={800}
//                   height={500}
//                   alt={card.title}
//                   className="rounded-3xl shadow-2xl w-full h-auto border-4 border-white/20 group-hover:border-purple-400/50 transition-all duration-300"
//                 />
                
//                 {/* Card Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
                
//                 {/* Card Title */}
//                 <div className="absolute bottom-6 left-6 text-white">
//                   <h3 className="text-3xl font-bold mb-2">{card.title}</h3>
//                   <p className="text-purple-200">Scroll to navigate</p>
//                 </div>

//                 {/* Index Indicator */}
//                 <div className="absolute top-6 right-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
//                   {index + 1} / {cards.length}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Instructions */}
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white/80">
//           <p className="text-lg">← Scroll →</p>
//           <p className="text-sm text-purple-300 mt-1">Cards will rotate and slide horizontally</p>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="py-20 text-center">
//         <h2 className="text-4xl font-bold text-white mb-4">
//           Slider Complete! 🎉
//         </h2>
//         <p className="text-xl text-purple-200">
//           Thanks for scrolling through our 3D card slider
//         </p>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function HorizontalSlider() {
//   const sliderRef = useRef(null);
//   const cardsRef = useRef([]);
//   const progressBarRef = useRef(null);

//   useEffect(() => {
//     cardsRef.current = cardsRef.current.slice(0, 6);
//   }, []);

//   useEffect(() => {
//     if (!sliderRef.current) return;

//     const cards = cardsRef.current.filter(Boolean);
//     const totalWidth = cards.length * 100;

//     // Set initial positions
//     gsap.set(cards, {
//       x: (i) => i * 100 + "%",
//       rotationY: -45,
//       opacity: 0.6,
//       scale: 0.8,
//     });

//     // Horizontal scroll animation
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: sliderRef.current,
//         start: "top top",
//         end: `+=${totalWidth * 2}%`,
//         scrub: 1,
//         pin: true,
//         anticipatePin: 1,
//         onUpdate: (self) => {
//           const progress = self.progress;
          
//           // Update progress bar
//           if (progressBarRef.current) {
//             gsap.set(progressBarRef.current, {
//               scaleX: progress,
//             });
//           }

//           // Individual card animations
//           cards.forEach((card, index) => {
//             const cardProgress = (progress - index * 0.15) * 3;
            
//             if (cardProgress >= 0 && cardProgress <= 1) {
//               const rotation = gsap.utils.interpolate(-45, 0, cardProgress);
//               const scale = gsap.utils.interpolate(0.8, 1, cardProgress);
//               const opacity = gsap.utils.interpolate(0.6, 1, cardProgress);
//               const x = gsap.utils.interpolate(50, 0, cardProgress);

//               gsap.set(card, {
//                 rotationY: rotation,
//                 scale: scale,
//                 opacity: opacity,
//                 x: x + "%",
//                 zIndex: cardProgress > 0.5 ? 10 : 1,
//               });
//             } else if (cardProgress > 1) {
//               const exitProgress = (cardProgress - 1) * 2;
//               const rotation = gsap.utils.interpolate(0, 45, exitProgress);
//               const scale = gsap.utils.interpolate(1, 0.8, exitProgress);
//               const opacity = gsap.utils.interpolate(1, 0.6, exitProgress);
//               const x = gsap.utils.interpolate(0, -50, exitProgress);

//               gsap.set(card, {
//                 rotationY: rotation,
//                 scale: scale,
//                 opacity: opacity,
//                 x: x + "%",
//                 zIndex: 1,
//               });
//             }
//           });
//         },
//       },
//     });

//     tl.to(cards, {
//       x: `-=${totalWidth - 100}%`,
//       duration: 1,
//       ease: "none",
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => {
//         if (trigger.trigger === sliderRef.current) {
//           trigger.kill();
//         }
//       });
//     };
//   }, []);

//   const addToRefs = (el, index) => {
//     if (el && !cardsRef.current.includes(el)) {
//       cardsRef.current[index] = el;
//     }
//   };

//   const cards = [
//     { id: 1, src: "https://picsum.photos/800/500?random=1", title: "Card 1" },
//     { id: 2, src: "https://picsum.photos/800/500?random=2", title: "Card 2" },
//     { id: 3, src: "https://picsum.photos/800/500?random=3", title: "Card 3" },
//     { id: 4, src: "https://picsum.photos/800/500?random=4", title: "Card 4" },
//     { id: 5, src: "https://picsum.photos/800/500?random=5", title: "Card 5" },
//     { id: 6, src: "https://picsum.photos/800/500?random=6", title: "Card 6" },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
//       {/* Header */}
//       <div className="text-center py-16">
//         <h1 className="text-6xl font-bold text-white mb-4">
//           Horizontal Card Slider
//         </h1>
//         <p className="text-xl text-purple-200">
//           Scroll down to see cards slide and rotate
//         </p>
//       </div>

//       {/* Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
//         <div 
//           ref={progressBarRef}
//           className="h-full bg-gradient-to-r from-purple-500 to-pink-500 origin-left"
//         />
//       </div>

//       {/* Horizontal Slider Section */}
//       <div 
//         ref={sliderRef}
//         className="relative h-screen overflow-hidden"
//       >
//         <div className="relative w-full h-full flex items-center">
//           {cards.map((card, index) => (
//             <div
//               key={card.id}
//               ref={(el) => addToRefs(el, index)}
//               className="absolute w-[80vw] max-w-4xl will-change-transform"
//               style={{
//                 left: "10%",
//                 perspective: "1000px",
//               }}
//             >
//               <div className="relative group">
//                 <Image
//                   src={card.src}
//                   width={800}
//                   height={500}
//                   alt={card.title}
//                   className="rounded-3xl shadow-2xl w-full h-auto border-4 border-white/20 group-hover:border-purple-400/50 transition-all duration-300"
//                 />
                
//                 {/* Card Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-3xl" />
                
//                 {/* Card Title */}
//                 <div className="absolute bottom-6 left-6 text-white">
//                   <h3 className="text-3xl font-bold mb-2">{card.title}</h3>
//                   <p className="text-purple-200">Scroll to navigate</p>
//                 </div>

//                 {/* Index Indicator */}
//                 <div className="absolute top-6 right-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
//                   {index + 1} / {cards.length}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Instructions */}
//         <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white/80">
//           <p className="text-lg">← Scroll →</p>
//           <p className="text-sm text-purple-300 mt-1">Cards will rotate and slide horizontally</p>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="py-20 text-center">
//         <h2 className="text-4xl font-bold text-white mb-4">
//           Slider Complete! 🎉
//         </h2>
//         <p className="text-xl text-purple-200">
//           Thanks for scrolling through our 3D card slider
//         </p>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

export default function TeamSlider() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CEO & Founder",
      specialization: "Business Strategy & Leadership",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "Leading the company with 10+ years of industry experience and visionary leadership",
      skills: ["Strategic Planning", "Team Leadership", "Business Development", "Innovation"],
      experience: "12+ years",
      education: "MBA - Harvard Business School"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CTO",
      specialization: "Technology & Innovation",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Technology innovator with expertise in AI and software architecture development",
      skills: ["AI/ML", "Software Architecture", "Cloud Computing", "DevOps"],
      experience: "10+ years",
      education: "MS Computer Science - Stanford University"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Design Director",
      specialization: "UX/UI & Brand Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Creative director with a passion for user-centered design and brand storytelling",
      skills: ["UX Research", "UI Design", "Brand Identity", "Design Systems"],
      experience: "8+ years",
      education: "BFA Design - Rhode Island School of Design"
    },
    {
      id: 4,
      name: "David Kim",
      position: "Lead Developer",
      specialization: "Full-Stack Development",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Full-stack developer specializing in scalable applications and modern frameworks",
      skills: ["React/Next.js", "Node.js", "Python", "Database Design"],
      experience: "7+ years",
      education: "BS Computer Engineering - MIT"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      position: "Marketing Head",
      specialization: "Digital Marketing & Growth",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
      description: "Digital marketing strategist driving growth and brand awareness campaigns",
      skills: ["SEO/SEM", "Content Strategy", "Social Media", "Analytics"],
      experience: "9+ years",
      education: "MA Marketing - Northwestern University"
    },
    {
      id: 6,
      name: "Alex Martinez",
      position: "Product Manager",
      specialization: "Product Strategy & Development",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      description: "Product visionary bridging customer needs with technical implementation",
      skills: ["Product Roadmap", "Agile Methodology", "User Research", "Data Analysis"],
      experience: "6+ years",
      education: "MS Product Management - Carnegie Mellon"
    }
  ];

  const nextCard = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCard((prev) => (prev + 1) % teamMembers.length);
    setExpandedCard(null);
  };

  const prevCard = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCard((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
    setExpandedCard(null);
  };

  const goToCard = (index) => {
    if (isTransitioning || index === currentCard) return;
    setIsTransitioning(true);
    setCurrentCard(index);
    setExpandedCard(null);
  };

  const toggleExpand = (memberId) => {
    setExpandedCard(expandedCard === memberId ? null : memberId);
  };

  // GSAP animations
  useEffect(() => {
    if (!isTransitioning) return;

    const tl = gsap.timeline({
      onComplete: () => setIsTransitioning(false)
    });

    tl.fromTo(".team-card", 
      { 
        opacity: 0, 
        scale: 0.8,
        rotationY: -45,
        x: 100
      },
      { 
        opacity: 1, 
        scale: 1,
        rotationY: 0,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      }
    );
  }, [currentCard, isTransitioning]);

  // Reset transitioning state after animation completes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Auto-rotate cards every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!expandedCard) {
        nextCard();
      }
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isTransitioning, expandedCard]);

  return (
    <div className="w-full h-full bg-slate-900 rounded-3xl overflow-hidden relative text-white">
      {/* Our Team Heading */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center z-40 w-full px-4">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Our Team
        </h2>
        <p className="text-white/70 text-lg">Meet the amazing people behind our success</p>
      </div>

      {/* Main Content */}
      <div className="w-full h-full flex items-center justify-center pt-28 pb-12 px-8">
        <div className="relative w-full max-w-6xl h-96">
          {/* Navigation Arrows */}
          <button
            onClick={prevCard}
            disabled={isTransitioning}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextCard}
            disabled={isTransitioning}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Current Team Member Card */}
          <div className="team-card w-full max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex flex-col md:flex-row h-96">
              {/* Profile Image Section */}
              <div className="md:w-2/5 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                <div className="relative">
                  <img
                    src={teamMembers[currentCard].image}
                    alt={teamMembers[currentCard].name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/20 shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm">
                    {currentCard + 1}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mt-6 text-center">
                  {teamMembers[currentCard].name}
                </h3>
                <p className="text-purple-300 font-semibold text-lg mt-2 text-center">
                  {teamMembers[currentCard].position}
                </p>
                <p className="text-white/60 text-sm mt-1 text-center">
                  {teamMembers[currentCard].specialization}
                </p>

                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {teamMembers[currentCard].skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details Section */}
              <div className="md:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <p className="text-white/80 text-lg leading-relaxed mb-6">
                    {teamMembers[currentCard].description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/60 text-sm">Experience</p>
                      <p className="text-white font-semibold">{teamMembers[currentCard].experience}</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3">
                      <p className="text-white/60 text-sm">Education</p>
                      <p className="text-white font-semibold text-sm">{teamMembers[currentCard].education}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <p className="text-white/60 text-sm mb-2">Key Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {teamMembers[currentCard].skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm text-white/80 border border-purple-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expand Button */}
                <button
                  onClick={() => toggleExpand(teamMembers[currentCard].id)}
                  className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 self-start"
                >
                  {expandedCard === teamMembers[currentCard].id ? "Show Less" : "View Full Profile"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            onClick={() => goToCard(index)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentCard
                ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125"
                : "bg-white/30 hover:bg-white/50"
            } ${isTransitioning ? "opacity-50" : ""}`}
          />
        ))}
      </div>

      {/* Auto-scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center text-white/40 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          <span>Auto-scrolling in 6 seconds</span>
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}