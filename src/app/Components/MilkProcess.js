// Components/OurProcess.jsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const OurProcess = ({ active }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const pathRef = useRef(null);
  const nodesRef = useRef([]);
  const progressBarRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const processSteps = [
    {
      id: 1,
      title: "Milk Procurement",
      description: "Fresh milk collection from local farms",
      detailedInfo: "We source directly from 500+ local farms with daily collection and strict quality standards",
      icon: "🚜",
      color: "from-red-500 to-red-700",
      duration: "Step 1",
      stats: "500+ Farms"
    },
    {
      id: 2,
      title: "Quality Checks",
      description: "Testing for purity & freshness",
      detailedInfo: "Comprehensive testing including fat content, purity, acidity levels, and temperature checks",
      icon: "🔍",
      color: "from-blue-500 to-blue-700",
      duration: "Step 2",
      stats: "15+ Tests"
    },
    {
      id: 3,
      title: "Milk Processing",
      description: "Advanced processing techniques",
      detailedInfo: "Pasteurization, homogenization, and standardization processes at 72°C for 15 seconds",
      icon: "⚙️",
      color: "from-green-500 to-green-700",
      duration: "Step 3",
      stats: "72°C / 15s"
    },
    {
      id: 4,
      title: "Product Manufacturing",
      description: "Creating dairy products",
      detailedInfo: "Production of paneer, curd, butter, ghee, cheese, and other dairy delicacies",
      icon: "🏭",
      color: "from-purple-500 to-purple-700",
      duration: "Step 4",
      stats: "6+ Products"
    },
    {
      id: 5,
      title: "Product Quality",
      description: "Final product verification",
      detailedInfo: "Microbial testing, texture analysis, taste verification, and packaging integrity checks",
      icon: "✅",
      color: "from-yellow-500 to-yellow-700",
      duration: "Step 5",
      stats: "100% Verified"
    },
    {
      id: 6,
      title: "Cold Storage",
      description: "Temperature preservation",
      detailedInfo: "Maintained at 4°C with 24/7 monitoring and backup systems for optimal freshness",
      icon: "❄️",
      color: "from-cyan-500 to-cyan-700",
      duration: "Step 6",
      stats: "4°C Maintained"
    },
    {
      id: 7,
      title: "Packing",
      description: "Automated packaging",
      detailedInfo: "Tetra packs, PET bottles, pouches, and glass bottles with automated sealing systems",
      icon: "📦",
      color: "from-pink-500 to-pink-700",
      duration: "Step 7",
      stats: "4 Packaging Types"
    },
    {
      id: 8,
      title: "Dispatch",
      description: "Ready for delivery",
      detailedInfo: "70+ vehicle fleet serving 15+ cities with 98% on-time delivery rate",
      icon: "🚚",
      color: "from-orange-500 to-orange-700",
      duration: "Step 8",
      stats: "70+ Vehicles"
    }
  ];

  useEffect(() => {
    if (!active || !containerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    // Reset animations
    gsap.set([titleRef.current, pathRef.current, ...nodesRef.current], {
      opacity: 0,
      scale: 0.8
    });

    // Animate title
    tl.fromTo(titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    // Animate path
    .fromTo(pathRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 1.5 },
      "-=0.5"
    )
    // Animate nodes sequentially
    .fromTo(nodesRef.current,
      { 
        scale: 0,
        rotation: -180,
        opacity: 0
      },
      { 
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "elastic.out(1, 0.8)"
      },
      "-=1"
    );

    // Progress animation through steps
    const progressTl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
    processSteps.forEach((_, index) => {
      progressTl
        .to(progressBarRef.current, {
          width: `${((index + 1) / processSteps.length) * 100}%`,
          duration: 1.2,
          ease: "power2.inOut",
          onStart: () => setCurrentStep(index)
        })
        .to(nodesRef.current[index], {
          scale: 1.1,
          duration: 0.2,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        }, "<")
        .to({}, { duration: 0.3 }); // Shorter pause between steps
    });

    // Continuous path glow effect
    const pathGlow = gsap.timeline({ repeat: -1, yoyo: true });
    pathGlow
      .to(pathRef.current, {
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
        duration: 1.5,
        ease: "sine.inOut"
      })
      .to(pathRef.current, {
        boxShadow: "0 0 8px rgba(59, 130, 246, 0.2)",
        duration: 1.5,
        ease: "sine.inOut"
      });

    return () => {
      tl.kill();
      progressTl.kill();
      pathGlow.kill();
    };
  }, [active]);

  const addToNodesRef = (el) => {
    if (el && !nodesRef.current.includes(el)) {
      nodesRef.current.push(el);
    }
  };

  const handleCardHover = (index, isHovering) => {
    setHoveredCard(isHovering ? index : null);
    
    if (nodesRef.current[index]) {
      gsap.to(nodesRef.current[index], {
        scale: isHovering ? 1.15 : 1,
        zIndex: isHovering ? 50 : 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  return (
    <div ref={containerRef} className="w-full h-full p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 ref={titleRef} className="text-5xl font-bold text-white mb-4">
          Our Process
        </h1>
        <p className="text-lg text-white/80 mb-6">
          From farm to your home - The journey of pure dairy
        </p>
        
        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex justify-between text-white/60 text-xs mb-2">
            <span>Start</span>
            <span>In Progress</span>
            <span>Complete</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000"
              style={{ width: '0%' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Process Path */}
      <div className="relative max-w-6xl mx-auto">
        {/* Main Path Line */}
        <div
          ref={pathRef}
          className="absolute top-1/2 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 to-green-400 
          rounded-full transform -translate-y-1/2 shadow-lg"
        ></div>

        {/* Process Nodes - Compact Grid */}
        <div className="relative grid grid-cols-4 gap-4">
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className={`relative ${index % 2 === 0 ? 'mb-16' : 'mt-16'}`}
            >
              {/* Node Container */}
              <div
                ref={addToNodesRef}
                onMouseEnter={() => handleCardHover(index, true)}
                onMouseLeave={() => handleCardHover(index, false)}
                className={`bg-gradient-to-br ${step.color} rounded-xl p-4 text-white 
                shadow-xl transform-gpu cursor-pointer transition-all duration-300 min-h-[140px]
                ${currentStep >= index ? 'opacity-100' : 'opacity-60'}
                ${hoveredCard === index ? 'shadow-2xl' : 'shadow-lg'}`}
              >
                {/* Step Number */}
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full 
                flex items-center justify-center text-black font-bold text-xs shadow-md">
                  {step.id}
                </div>

                {/* Icon */}
                <div className="text-2xl mb-2 text-center">{step.icon}</div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="font-bold text-sm mb-1 leading-tight">{step.title}</h3>
                  <p className="text-white/90 text-xs leading-relaxed mb-2">
                    {step.description}
                  </p>
                  <div className="text-white/70 text-xs font-semibold bg-black/20 rounded px-2 py-1">
                    {step.stats}
                  </div>
                </div>

                {/* Active Indicator */}
                {currentStep === index && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                  w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                )}
              </div>

              {/* Hover Detailed Info */}
              {hoveredCard === index && (
                <div className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 mt-3 
                w-64 bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 border border-white/20 
                shadow-2xl animate-in fade-in-0 zoom-in-95">
                  <div className="text-center">
                    <div className="text-lg font-bold text-white mb-2">{step.title}</div>
                    <div className="text-white/80 text-sm leading-relaxed mb-3">
                      {step.detailedInfo}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-green-400 font-semibold">{step.duration}</span>
                      <span className="text-blue-300">{step.stats}</span>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 
                  w-4 h-4 bg-gray-900 rotate-45 border-l border-t border-white/20"></div>
                </div>
              )}

              {/* Connecting Lines for even rows */}
              {index < processSteps.length - 1 && index % 2 === 0 && (
                <div className="absolute top-1/2 right-0 w-6 h-0.5 bg-blue-400 
                transform translate-x-full -translate-y-1/2"></div>
              )}

              {/* Connecting Lines for odd rows */}
              {index < processSteps.length - 1 && index % 2 === 1 && (
                <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-blue-400 
                transform -translate-x-full -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>

        {/* Start and End Markers */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center 
          text-white text-xs font-bold shadow-md">
            🏁
          </div>
        </div>

        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center 
          text-white text-xs font-bold shadow-md">
            🎯
          </div>
        </div>
      </div>

      {/* Current Step Display */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 
      backdrop-blur-sm rounded-xl p-4 border border-white/20 min-w-[200px]">
        <div className="text-center text-white">
          <div className="text-xs text-white/60 mb-1">Current Step</div>
          <div className="text-lg font-bold mb-1">
            {processSteps[currentStep]?.title || "Starting..."}
          </div>
          <div className="text-white/80 text-sm">
            {processSteps[currentStep]?.description}
          </div>
          <div className="flex items-center justify-center mt-2 space-x-1">
            {processSteps.map((_, index) => (
              <div 
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentStep >= index ? 'bg-green-400' : 'bg-gray-400'
                } ${currentStep === index ? 'scale-125' : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="fixed bottom-6 right-6 bg-black/60 backdrop-blur-sm rounded-xl p-3 
      border border-white/20">
        <div className="text-white text-center">
          <div className="text-xl font-bold text-green-400">
            {currentStep + 1}/8
          </div>
          <div className="text-white/60 text-xs">Steps Completed</div>
        </div>
      </div>

      {/* Hover Instructions */}
      <div className="fixed top-6 right-6 bg-black/60 backdrop-blur-sm rounded-lg p-3 
      border border-white/20">
        <div className="text-white text-center text-xs">
          <div className="text-green-400 mb-1">💡 Interactive</div>
          <div>Hover over cards</div>
          <div>for more details</div>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;