// Components/KeyMilestones.jsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const KeyMilestones = ({ active }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const timelineRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  const milestones = [
    {
      year: "1988",
      title: "Inception with 300 sq. ft shop",
      description: "Started our journey with a small retail shop in Ahmedabad",
      icon: "🏪",
      id: "K1",
      color: "from-red-500 to-red-700",
      position: "start"
    },
    {
      year: "1990",
      title: "Started supplying dairy products to institutional customers",
      description: "Expanded our reach to hotels, restaurants, and corporate clients",
      icon: "🏨",
      id: "K2",
      color: "from-orange-500 to-orange-700",
      position: "end"
    },
    {
      year: "1997",
      title: "Started distributing food products of other brands",
      description: "Became distributors for leading food brands in Ahmedabad",
      icon: "📦",
      id: "K3",
      color: "from-amber-500 to-amber-700",
      position: "start"
    },
    {
      year: "2007",
      title: "New Plant Set Up In GIDC",
      description: "Established modern manufacturing facility in GIDC industrial area",
      icon: "🏭",
      id: "K4",
      color: "from-green-500 to-green-700",
      position: "end"
    },
    {
      year: "2009",
      title: "Became an ISO 22000:2005 Certified Company",
      description: "Achieved international quality standards for food safety",
      icon: "⭐",
      id: "K5",
      color: "from-teal-500 to-teal-700",
      position: "start"
    },
    {
      year: "2010",
      title: "Started distributing milk products to other cities in Gujarat",
      description: "Expanded our distribution network across Gujarat state",
      icon: "🗺️",
      id: "K6",
      color: "from-blue-500 to-blue-700",
      position: "end"
    },
    {
      year: "2012",
      title: "Started company-owned modern retail shops",
      description: "Opened branded retail outlets across major cities in Gujarat",
      icon: "🛍️",
      id: "K7",
      color: "from-purple-500 to-purple-700",
      position: "start"
    }
  ];

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Reset animations
    gsap.set([titleRef.current, lineRef.current, ...cardsRef.current], {
      opacity: 0,
      y: 50
    });

    // Animate title
    tl.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    // Animate timeline line
    .fromTo(lineRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.5 },
      "-=0.5"
    )
    // Animate cards sequentially with bounce effect
    .fromTo(cardsRef.current,
      { 
        x: (i) => i % 2 === 0 ? -100 : 100,
        y: (i) => i % 2 === 0 ? -50 : 50,
        opacity: 0,
        rotation: (i) => i % 2 === 0 ? -10 : 10
      },
      { 
        x: 0,
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "elastic.out(1, 0.8)"
      },
      "-=1"
    );

    // Auto-scroll through milestones
    const autoScroll = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    milestones.forEach((_, index) => {
      autoScroll
        .to(timelineRef.current, {
          scrollTo: { 
            x: index * 320, 
            autoKill: false 
          },
          duration: 1.5,
          ease: "power2.inOut",
          onStart: () => setActiveCard(index)
        })
        .to({}, { duration: 2 }); // Pause on each card
    });

    // Hover effects for cards
    cardsRef.current.forEach((card, index) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          y: index % 2 === 0 ? -15 : 15,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    return () => {
      tl.kill();
      autoScroll.kill();
    };
  }, [active]);

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const scrollToCard = (index) => {
    if (timelineRef.current) {
      gsap.to(timelineRef.current, {
        scrollTo: { x: index * 320, autoKill: false },
        duration: 1,
        ease: "power3.out"
      });
      setActiveCard(index);
    }
  };

  const nextCard = () => {
    const nextIndex = (activeCard + 1) % milestones.length;
    scrollToCard(nextIndex);
  };

  const prevCard = () => {
    const prevIndex = (activeCard - 1 + milestones.length) % milestones.length;
    scrollToCard(prevIndex);
  };

  return (
    <div ref={containerRef} className="w-full h-full p-6 bg-gradient-to-br from-gray-900 to-black overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 ref={titleRef} className="text-5xl font-bold text-white mb-4">
          Key Milestones
        </h1>
        <p className="text-lg text-white/80">
          Our journey of growth and excellence since 1988
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative h-3/4">
        {/* Central Timeline Line */}
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 z-0">
          <div
            ref={lineRef}
            className="h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 
            rounded-full shadow-lg mx-8"
          ></div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevCard}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20
          w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center
          text-white text-2xl border border-white/20 hover:bg-white/20 transition-all duration-300
          hover:scale-110"
        >
          ‹
        </button>

        <button
          onClick={nextCard}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20
          w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center
          text-white text-2xl border border-white/20 hover:bg-white/20 transition-all duration-300
          hover:scale-110"
        >
          ›
        </button>

        {/* Scrollable Timeline */}
        <div 
          ref={timelineRef}
          className="relative h-full overflow-x-auto overflow-y-hidden py-20 scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex space-x-8 px-8 min-w-max">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                ref={addToCardsRef}
                onClick={() => scrollToCard(index)}
                className={`flex-shrink-0 transform-gpu cursor-pointer transition-all duration-300
                  ${activeCard === index ? 'scale-105' : 'scale-95 opacity-80'}`}
              >
                {/* Card Container */}
                <div className={`relative w-80 ${
                  milestone.position === 'start' ? 'mb-32' : 'mt-32'
                }`}>
                  {/* Timeline Dot */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 
                    ${milestone.position === 'start' ? 'top-full mt-4' : 'bottom-full mb-4'} 
                    w-6 h-6 bg-white rounded-full border-4 border-blue-500 shadow-lg z-10
                    ${activeCard === index ? 'scale-150 ring-4 ring-blue-300' : ''}
                    transition-all duration-300`}></div>

                  {/* Year Label */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 
                    ${milestone.position === 'start' ? 'top-full mt-12' : 'bottom-full mb-12'} 
                    text-white font-bold text-lg bg-black/50 px-3 py-1 rounded-full
                    backdrop-blur-sm border border-white/20 z-10`}>
                    {milestone.year}
                  </div>

                  {/* Milestone Card */}
                  <div
                    className={`bg-gradient-to-br ${milestone.color} rounded-2xl p-6 
                    text-white shadow-2xl border border-white/20 backdrop-blur-sm
                    transform-gpu min-h-[200px] flex flex-col justify-between
                    hover:shadow-2xl transition-all duration-300 relative z-20`}
                  >
                    {/* Card Header */}
                    <div className="text-center mb-4">
                      <div className="text-3xl mb-3">{milestone.icon}</div>
                      <div className="text-xs font-mono bg-black/30 px-2 py-1 rounded-full 
                      inline-block mb-2 border border-white/20">
                        {milestone.id}
                      </div>
                      <h3 className="font-bold text-lg leading-tight mb-2">
                        {milestone.title}
                      </h3>
                    </div>

                    {/* Card Content */}
                    <div className="text-center">
                      <p className="text-white/90 text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>

                    {/* Active Indicator */}
                    {activeCard === index && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 
                      rounded-full animate-ping"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 
      bg-black/50 backdrop-blur-sm rounded-2xl p-4 border border-white/20 z-30">
        <div className="flex space-x-3">
          {milestones.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
                ${activeCard === index 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Current Milestone Display */}
      <div className="fixed top-8 right-8 bg-black/50 backdrop-blur-sm rounded-2xl p-4 
      border border-white/20 min-w-[200px] z-30">
        <div className="text-white text-center">
          <div className="text-xs text-white/60 mb-1">Current Milestone</div>
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {milestones[activeCard]?.year}
          </div>
          <div className="text-lg font-semibold mb-1">
            {milestones[activeCard]?.title}
          </div>
          <div className="text-white/80 text-sm">
            {milestones[activeCard]?.description}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-8 left-8 bg-black/50 backdrop-blur-sm rounded-2xl p-4 
      border border-white/20 z-30">
        <div className="text-white text-center">
          <div className="text-2xl font-bold text-green-400">
            {activeCard + 1}/{milestones.length}
          </div>
          <div className="text-xs text-white/60">Milestones</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="fixed bottom-8 right-8 bg-black/50 backdrop-blur-sm rounded-2xl p-4 
      border border-white/20 z-30">
        <div className="text-white text-center text-sm">
          <div className="text-green-400 mb-2">🎯 Interactive Timeline</div>
          <div>Use arrows or click dots</div>
          <div className="text-xs text-white/60 mt-1">Auto-scrolls every 3s</div>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default KeyMilestones;

// // Components/Dispatch.jsx
// "use client";

// import { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';

// const Dispatch = ({ active }) => {
//   const containerRef = useRef(null);
//   const titleRef = useRef(null);
//   const trucksRef = useRef([]);
//   const mapRef = useRef(null);
//   const statsRef = useRef([]);

//   useEffect(() => {
//     if (!active || !containerRef.current) return;

//     const tl = gsap.timeline({
//       defaults: { ease: "power3.out" }
//     });

//     // Title animation
//     tl.fromTo(titleRef.current,
//       { y: -50, opacity: 0 },
//       { y: 0, opacity: 1, duration: 1 }
//     )
//     // Map animation
//     .fromTo(mapRef.current,
//       { scale: 0.8, opacity: 0 },
//       { scale: 1, opacity: 1, duration: 1.2 },
//       "-=0.5"
//     )
//     // Trucks animation
//     .fromTo(trucksRef.current,
//       { x: -100, opacity: 0 },
//       { x: 0, opacity: 1, duration: 0.8, stagger: 0.2 },
//       "-=0.8"
//     )
//     // Stats animation
//     .fromTo(statsRef.current,
//       { y: 50, opacity: 0 },
//       { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
//       "-=0.5"
//     );

//     // Moving trucks animation
//     const truckAnimation = gsap.timeline({ repeat: -1 });
//     trucksRef.current.forEach((truck, index) => {
//       truckAnimation.to(truck, {
//         x: 50,
//         duration: 2 + index * 0.5,
//         ease: "power1.inOut",
//         yoyo: true,
//         repeat: 1
//       }, index * 0.3);
//     });

//     // Pulsing map routes
//     const mapPulse = gsap.timeline({ repeat: -1 });
//     mapPulse
//       .to(mapRef.current.querySelector('.route'), {
//         strokeWidth: 3,
//         duration: 1,
//         ease: "power1.inOut"
//       })
//       .to(mapRef.current.querySelector('.route'), {
//         strokeWidth: 1,
//         duration: 1,
//         ease: "power1.inOut"
//       });

//     return () => {
//       tl.kill();
//       truckAnimation.kill();
//       mapPulse.kill();
//     };
//   }, [active]);

//   const addToTrucksRef = (el) => {
//     if (el && !trucksRef.current.includes(el)) {
//       trucksRef.current.push(el);
//     }
//   };

//   const addToStatsRef = (el) => {
//     if (el && !statsRef.current.includes(el)) {
//       statsRef.current.push(el);
//     }
//   };

//   const dispatchStats = [
//     { label: "Daily Deliveries", value: "250+", color: "from-green-500 to-green-700" },
//     { label: "Delivery Cities", value: "15+", color: "from-blue-500 to-blue-700" },
//     { label: "Fleet Size", value: "70+", color: "from-purple-500 to-purple-700" },
//     { label: "On-time Rate", value: "98%", color: "from-orange-500 to-orange-700" }
//   ];

//   return (
//     <div ref={containerRef} className="w-full h-full p-8">
//       <div className="text-center mb-8">
//         <h1 ref={titleRef} className="text-5xl font-bold text-white mb-4">
//           Dispatch
//         </h1>
//         <p className="text-xl text-white/80">
//           Ready for delivery to your doorstep
//         </p>
//       </div>

//       <div className="grid grid-cols-2 gap-8 h-4/5">
//         {/* Left: Map and Trucks */}
//         <div className="space-y-8">
//           {/* Map */}
//           <div
//             ref={mapRef}
//             className="h-48 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl 
//             p-4 relative overflow-hidden"
//           >
//             {/* Simplified map with routes */}
//             <div className="absolute inset-4">
//               <svg viewBox="0 0 100 60" className="w-full h-full">
//                 {/* Routes */}
//                 <path
//                   className="route stroke-green-400 fill-none"
//                   strokeWidth="1"
//                   d="M10,30 L40,20 L70,40 L90,25"
//                 />
//                 <path
//                   className="route stroke-blue-400 fill-none"
//                   strokeWidth="1"
//                   d="M10,40 L35,50 L65,30 L90,45"
//                 />
//                 {/* Cities */}
//                 <circle cx="10" cy="30" r="2" fill="#10B981" />
//                 <circle cx="40" cy="20" r="2" fill="#10B981" />
//                 <circle cx="70" cy="40" r="2" fill="#10B981" />
//                 <circle cx="90" cy="25" r="2" fill="#10B981" />
//                 <circle cx="10" cy="40" r="2" fill="#3B82F6" />
//                 <circle cx="35" cy="50" r="2" fill="#3B82F6" />
//                 <circle cx="65" cy="30" r="2" fill="#3B82F6" />
//                 <circle cx="90" cy="45" r="2" fill="#3B82F6" />
//               </svg>
//             </div>
//             <div className="absolute bottom-2 left-4 text-white/80 text-sm">
//               Live Delivery Routes
//             </div>
//           </div>

//           {/* Trucks */}
//           <div className="flex justify-around items-center">
//             {[1, 2, 3].map((truck) => (
//               <div
//                 key={truck}
//                 ref={addToTrucksRef}
//                 className="bg-gradient-to-br from-yellow-400 to-orange-600 
//                 rounded-xl p-4 text-center w-24 transform-gpu"
//               >
//                 <div className="text-3xl mb-2">🚚</div>
//                 <div className="text-white text-sm font-bold">Truck {truck}</div>
//                 <div className="text-white/80 text-xs">ON ROUTE</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right: Stats */}
//         <div className="grid grid-cols-2 gap-6">
//           {dispatchStats.map((stat, index) => (
//             <div
//               key={index}
//               ref={addToStatsRef}
//               className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 
//               text-white shadow-2xl flex flex-col items-center justify-center transform-gpu`}
//             >
//               <div className="text-4xl font-bold mb-2">{stat.value}</div>
//               <div className="text-white/90 text-center text-sm">{stat.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom: Status Bar */}
//       <div className="mt-8 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
//         <div className="flex justify-between items-center text-white">
//           <div className="flex items-center">
//             <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
//             <span>All systems operational</span>
//           </div>
//           <div className="text-white/80">
//             Next dispatch: <span className="text-green-300 font-bold">15 minutes</span>
//           </div>
//           <div className="text-white/80">
//             Temperature: <span className="text-blue-300 font-bold">4°C maintained</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dispatch;