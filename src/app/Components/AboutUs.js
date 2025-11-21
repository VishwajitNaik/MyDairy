// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// export default function AboutPage2({ active }) {
//   const rootRef = useRef(null);
//   const textElementsRef = useRef([]);
//   const imageContainerRef = useRef(null);

//   const addTextToRefs = (el, index) => {
//     if (el && !textElementsRef.current.includes(el)) {
//       textElementsRef.current[index] = el;
//     }
//   };

//   const resetAnimations = () => {
//     gsap.set(textElementsRef.current, {
//       opacity: 0,
//       y: 30,
//       clearProps: "all"
//     });
//     gsap.set(imageContainerRef.current, {
//       opacity: 0,
//       y: -250,
//       scale: 0.7,
//       rotation: -100,
//       clearProps: "all"
//     });
    
//     // Kill any ongoing vibrations
//     gsap.killTweensOf(imageContainerRef.current);
//   };

//   // Infinite vibration effect
//   const startVibration = () => {
//     const vibrationTL = gsap.timeline({ repeat: -1, yoyo: true });
    
//     // Multiple vibration patterns for more natural effect
//     vibrationTL
//       // Subtle rotation vibration
//       .to(imageContainerRef.current, {
//         rotation: "+=0.8",
//         duration: 0.1,
//         ease: "power1.inOut"
//       })
//       // Position vibration
//       .to(imageContainerRef.current, {
//         x: "+=3",
//         y: "+=2",
//         duration: 0.08,
//         ease: "power1.inOut"
//       }, "<")
//       // Scale vibration
//       .to(imageContainerRef.current, {
//         scale: 1.02,
//         duration: 0.1,
//         ease: "power1.inOut"
//       }, "<")
//       // Return to original position
//       .to(imageContainerRef.current, {
//         rotation: 0,
//         x: 0,
//         y: 0,
//         scale: 1,
//         duration: 0.1,
//         ease: "power1.inOut"
//       })
//       // Random delay between vibrations
//       .to({}, { duration: 0.5 + Math.random() * 1.5 });
    
//     return vibrationTL;
//   };

//   // Enhanced vibration with multiple patterns
//   const startEnhancedVibration = () => {
//     const masterVibration = gsap.timeline({ repeat: -1 });
    
//     // Pattern 1: Quick subtle vibration
//     masterVibration
//       .to(imageContainerRef.current, {
//         keyframes: [
//           { rotation: "+=0.5", x: "+=2", y: "+=1", scale: 1.01, duration: 0.05 },
//           { rotation: "-=0.3", x: "-=1", y: "-=2", scale: 0.995, duration: 0.05 },
//           { rotation: 0, x: 0, y: 0, scale: 1, duration: 0.05 }
//         ],
//         ease: "power1.inOut"
//       })
//       .to({}, { duration: 0.8 }); // Pause
    
//     // Pattern 2: Slightly different vibration
//     masterVibration
//       .to(imageContainerRef.current, {
//         keyframes: [
//           { rotation: "-=0.4", x: "-=3", y: "+=2", scale: 1.015, duration: 0.06 },
//           { rotation: "+=0.6", x: "+=1", y: "-=1", scale: 0.99, duration: 0.06 },
//           { rotation: 0, x: 0, y: 0, scale: 1, duration: 0.06 }
//         ],
//         ease: "power1.inOut"
//       })
//       .to({}, { duration: 1.2 }); // Longer pause
    
//     // Pattern 3: Very subtle micro-vibration
//     masterVibration
//       .to(imageContainerRef.current, {
//         keyframes: [
//           { rotation: "+=0.2", x: "+=1", duration: 0.03 },
//           { rotation: "-=0.2", x: "-=1", duration: 0.03 },
//           { rotation: 0, x: 0, duration: 0.03 }
//         ],
//         ease: "power1.inOut",
//         repeat: 2
//       })
//       .to({}, { duration: 0.5 });
    
//     return masterVibration;
//   };

//   // Gentle floating vibration (softer version)
//   const startFloatingVibration = () => {
//     const floatTL = gsap.timeline({ repeat: -1 });
    
//     // Continuous gentle floating effect
//     floatTL
//       .to(imageContainerRef.current, {
//         y: "+=4",
//         rotation: "+=0.3",
//         scale: 1.005,
//         duration: 1.5,
//         ease: "sine.inOut"
//       })
//       .to(imageContainerRef.current, {
//         y: "-=4", 
//         rotation: "-=0.3",
//         scale: 0.995,
//         duration: 1.5,
//         ease: "sine.inOut"
//       })
//       .to(imageContainerRef.current, {
//         x: "+=2",
//         rotation: "+=0.2",
//         duration: 1,
//         ease: "sine.inOut"
//       })
//       .to(imageContainerRef.current, {
//         x: "-=2",
//         rotation: "-=0.2", 
//         duration: 1,
//         ease: "sine.inOut"
//       });
    
//     return floatTL;
//   };

//   // Power vibration (more intense)
//   const startPowerVibration = () => {
//     const powerTL = gsap.timeline({ repeat: -1 });
    
//     powerTL
//       // Strong vibration burst
//       .to(imageContainerRef.current, {
//         keyframes: [
//           { 
//             rotation: "+=1.5", 
//             x: "+=5", 
//             y: "+=3", 
//             scale: 1.03,
//             duration: 0.1,
//             ease: "power2.out"
//           },
//           { 
//             rotation: "-=2", 
//             x: "-=6", 
//             y: "-=4", 
//             scale: 0.97,
//             duration: 0.15,
//             ease: "power2.inOut" 
//           },
//           { 
//             rotation: "+=1", 
//             x: "+=3", 
//             y: "+=2", 
//             scale: 1.01,
//             duration: 0.1,
//             ease: "power2.inOut"
//           },
//           { 
//             rotation: 0, 
//             x: 0, 
//             y: 0, 
//             scale: 1,
//             duration: 0.15,
//             ease: "power2.in"
//           }
//         ]
//       })
//       .to({}, { duration: 2 }); // Rest period
    
//     return powerTL;
//   };

//   useEffect(() => {
//     if (!active) {
//       resetAnimations();
//       return;
//     }

//     const masterTL = gsap.timeline();
    
//     // Image animation with dramatic entrance
//     masterTL.fromTo(imageContainerRef.current,
//       { 
//         opacity: 0, 
//         y: -250, 
//         scale: 0.7,
//         rotation: -100
//       },
//       {
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         rotation: 0,
//         duration: 2,
//         ease: "power3.out",
//         onComplete: () => {
//           // Start vibration after entrance animation completes
//           // Choose one vibration style:
//           startEnhancedVibration(); // Recommended - balanced effect
//           // startVibration(); // Simpler vibration
//           // startFloatingVibration(); // Softer floating effect  
//           // startPowerVibration(); // More intense vibration
//         }
//       }
//     );

//     // Text animation with staggered lines
//     textElementsRef.current.forEach((element, index) => {
//       if (element) {
//         masterTL.fromTo(element,
//           { 
//             opacity: 0, 
//             y: 30,
//             filter: "blur(5px)"
//           },
//           {
//             opacity: 1,
//             y: 0,
//             filter: "blur(0px)",
//             duration: 0.8,
//             ease: "power2.out",
//           },
//           index * 0.15 + 0.5 // Stagger with delay after image starts
//         );
//       }
//     });

//     // Cleanup function
//     return () => {
//       gsap.killTweensOf(imageContainerRef.current);
//     };

//   }, [active]);

//   const textContent = [
//     { 
//       type: "badge", 
//       text: "30+ Years of Trust", 
//       className: "bg-gradient-to-r from-green-400 to-emerald-500 text-black px-4 py-2 rounded-full font-bold text-sm inline-block mb-6" 
//     },
//     { 
//       type: "heading", 
//       text: "Who we are?", 
//       className: "text-5xl font-black mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent" 
//     },
//     { 
//       type: "paragraph", 
//       text: "We began our journey in 1988 with processing and distributing milk products from a single retail shop in Ahmedabad. Today, Jain Dairy is known as one of Gujarat's leading dairy manufacturers.", 
//       className: "text-white/95 leading-relaxed text-lg mb-6" 
//     },
//     { 
//       type: "paragraph", 
//       text: "From a small dairy operation to a modern ISO Certified facility capable of handling 1,00,000 litres of milk per day — our journey has been one of growth, quality and innovation.", 
//       className: "text-white/95 leading-relaxed text-lg mb-8" 
//     },
//     { 
//       type: "subheading", 
//       text: "Live Young. Live Strong.", 
//       className: "text-green-300 text-2xl font-bold mt-8 mb-4" 
//     },
//     { 
//       type: "paragraph", 
//       text: "With a promise of freshness and purity, we cater to homes, restaurants, hotels, hospitals, clubs, and corporate bulk orders — backed by a 24-hour logistics network of 70+ vehicles.", 
//       className: "text-white/85 leading-relaxed text-lg mb-8" 
//     },
//     { 
//       type: "list", 
//       items: [
//         "ISO 22000:2005 Certified Plant",
//         "1200+ Retail Distribution Points", 
//         "16+ Company Outlets",
//         "24/7 Bulk Order Support"
//       ], 
//       className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/90 text-lg" 
//     }
//   ];

//   return (
//     <section
//       ref={rootRef}
//       className="w-full h-full flex items-center justify-center px-6 md:px-[7.5%] py-8"
//     >
//       <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

//         {/* LEFT TEXT CONTENT */}
//         <div className="md:col-span-7 col-span-1 text-white">
//           {textContent.map((item, index) => (
//             <div
//               key={index}
//               ref={(el) => addTextToRefs(el, index)}
//               className={item.className}
//             >
//               {item.type === "badge" && <span>{item.text}</span>}
//               {item.type === "heading" && <h2>{item.text}</h2>}
//               {item.type === "subheading" && <h3>{item.text}</h3>}
//               {item.type === "paragraph" && <p>{item.text}</p>}
//               {item.type === "list" && (
//                 <ul>
//                   {item.items.map((listItem, listIndex) => (
//                     <li key={listIndex} className="flex items-center mb-2">
//                       <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
//                       <span>{listItem}</span>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* RIGHT IMAGE WITH VIBRATION */}
//         <div className="md:col-span-5 col-span-1 flex items-center justify-center">
//           <div
//             ref={imageContainerRef}
//             className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform-gpu bg-white/5 backdrop-blur-sm"
//             style={{ 
//               transformStyle: 'preserve-3d',
//               willChange: 'transform'
//             }}
//           >
//             <img
//               src="https://picsum.photos/1000/1000?random=22"
//               alt="Jain Dairy Facility"
//               className="w-full h-64 object-cover"
//             />
//             <div className="p-6">
//               <h4 className="text-xl font-bold text-white mb-2">Modern Processing Facility</h4>
//               <p className="text-white/70 text-sm">
//                 State-of-the-art dairy processing plant with cutting-edge technology and hygiene standards.
//               </p>
//               <div className="flex gap-2 mt-4">
//                 <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">Hygienic</span>
//                 <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">Efficient</span>
//                 <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">Certified</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AboutPage2({ active }) {
  const rootRef = useRef(null);
  const textElementsRef = useRef([]);
  const imageContainerRef = useRef(null);
  const currentImageIndex = useRef(0);

  // Array of 4 different images
  const images = [
    "https://picsum.photos/1000/800?random=22",
    "https://picsum.photos/1000/800?random=23", 
    "https://picsum.photos/1000/800?random=24",
    "https://picsum.photos/1000/800?random=25"
  ];

  const addTextToRefs = (el, index) => {
    if (el && !textElementsRef.current.includes(el)) {
      textElementsRef.current[index] = el;
    }
  };

  const resetAnimations = () => {
    gsap.set(textElementsRef.current, {
      opacity: 0,
      y: 30,
      clearProps: "all"
    });
    gsap.set(imageContainerRef.current, {
      opacity: 0,
      y: -250,
      scale: 0.7,
      rotation: -100,
      clearProps: "all"
    });
    
    gsap.killTweensOf(imageContainerRef.current);
    currentImageIndex.current = 0;
  };

  // Different transition effects
  const transitionEffects = [
    // Effect 1: Fade with scale
    (imageElement, nextImage) => {
      gsap.to(imageElement, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => {
          imageElement.src = nextImage;
          gsap.fromTo(imageElement, 
            { opacity: 0, scale: 1.2 },
            { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
          );
        }
      });
    },
    
    // Effect 2: Slide left
    (imageElement, nextImage) => {
      gsap.to(imageElement, {
        x: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          imageElement.src = nextImage;
          gsap.fromTo(imageElement, 
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" }
          );
        }
      });
    },
    
    // Effect 3: Rotate flip
    (imageElement, nextImage) => {
      gsap.to(imageElement, {
        rotationY: 90,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          imageElement.src = nextImage;
          gsap.fromTo(imageElement, 
            { rotationY: -90, scale: 0.8 },
            { rotationY: 0, scale: 1, duration: 0.6, ease: "power2.out" }
          );
        }
      });
    },
    
    // Effect 4: Blur transition
    (imageElement, nextImage) => {
      gsap.to(imageElement, {
        filter: "blur(10px)",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          imageElement.src = nextImage;
          gsap.fromTo(imageElement, 
            { filter: "blur(10px)", opacity: 0 },
            { filter: "blur(0px)", opacity: 1, duration: 0.7, ease: "power2.out" }
          );
        }
      });
    }
  ];

  const changeImage = () => {
    const imageElement = imageContainerRef.current?.querySelector('img');
    if (!imageElement) return;

    const nextIndex = (currentImageIndex.current + 1) % images.length;
    const nextImage = images[nextIndex];
    const effectIndex = currentImageIndex.current % transitionEffects.length;
    
    // Apply random transition effect
    transitionEffects[effectIndex](imageElement, nextImage);
    
    currentImageIndex.current = nextIndex;
  };

  // Enhanced vibration
  const startEnhancedVibration = () => {
    const masterVibration = gsap.timeline({ repeat: -1 });
    
    masterVibration
      .to(imageContainerRef.current, {
        keyframes: [
          { rotation: "+=0.5", x: "+=2", y: "+=1", scale: 1.01, duration: 0.05 },
          { rotation: "-=0.3", x: "-=1", y: "-=2", scale: 0.995, duration: 0.05 },
          { rotation: 0, x: 0, y: 0, scale: 1, duration: 0.05 }
        ],
        ease: "power1.inOut"
      })
      .to({}, { duration: 0.8 })
      .to(imageContainerRef.current, {
        keyframes: [
          { rotation: "-=0.4", x: "-=3", y: "+=2", scale: 1.015, duration: 0.06 },
          { rotation: "+=0.6", x: "+=1", y: "-=1", scale: 0.99, duration: 0.06 },
          { rotation: 0, x: 0, y: 0, scale: 1, duration: 0.06 }
        ],
        ease: "power1.inOut"
      })
      .to({}, { duration: 1.2 });
    
    return masterVibration;
  };

  // Auto image change every 3 seconds
  const startImageRotation = () => {
    const rotationTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    rotationTL.add(() => changeImage(), "+=3");
    return rotationTL;
  };

  useEffect(() => {
    if (!active) {
      resetAnimations();
      return;
    }

    const masterTL = gsap.timeline();
    
    masterTL.fromTo(imageContainerRef.current,
      { 
        opacity: 0, 
        y: -250, 
        scale: 0.7,
        rotation: -100
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 2,
        ease: "power3.out",
        onComplete: () => {
          startEnhancedVibration();
          startImageRotation();
        }
      }
    );

    textElementsRef.current.forEach((element, index) => {
      if (element) {
        masterTL.fromTo(element,
          { opacity: 0, y: 30, filter: "blur(5px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
          index * 0.15 + 0.5
        );
      }
    });

    return () => {
      gsap.killTweensOf(imageContainerRef.current);
    };
  }, [active]);

  // COMPLETE TEXT CONTENT - Fixed missing content
  const textContent = [
    { 
      type: "badge", 
      text: "30+ Years of Trust", 
      className: "bg-gradient-to-r from-green-400 to-emerald-500 text-black px-4 py-2 rounded-full font-bold text-sm inline-block mb-6" 
    },
    { 
      type: "heading", 
      text: "Who we are?", 
      className: "text-5xl font-black mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent" 
    },
    { 
      type: "paragraph", 
      text: "We began our journey in 1988 with processing and distributing milk products from a single retail shop in Ahmedabad. Today, Jain Dairy is known as one of Gujarat's leading dairy manufacturers.", 
      className: "text-white/95 leading-relaxed text-lg mb-6" 
    },
    { 
      type: "paragraph", 
      text: "From a small dairy operation to a modern ISO Certified facility capable of handling 1,00,000 litres of milk per day — our journey has been one of growth, quality and innovation.", 
      className: "text-white/95 leading-relaxed text-lg mb-8" 
    },
    { 
      type: "subheading", 
      text: "Live Young. Live Strong.", 
      className: "text-green-300 text-2xl font-bold mt-8 mb-4" 
    },
    { 
      type: "paragraph", 
      text: "With a promise of freshness and purity, we cater to homes, restaurants, hotels, hospitals, clubs, and corporate bulk orders — backed by a 24-hour logistics network of 70+ vehicles.", 
      className: "text-white/85 leading-relaxed text-lg mb-8" 
    },
    { 
      type: "list", 
      items: [
        "ISO 22000:2005 Certified Plant",
        "1200+ Retail Distribution Points", 
        "16+ Company Outlets",
        "24/7 Bulk Order Support"
      ], 
      className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-white/90 text-lg" 
    }
  ];

  return (
    <section ref={rootRef} className="w-full h-full flex items-center justify-center px-6 md:px-[7.5%] py-8">
      <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        
        {/* LEFT TEXT CONTENT - Now with complete content */}
        <div className="md:col-span-7 col-span-1 text-white">
          {textContent.map((item, index) => (
            <div key={index} ref={(el) => addTextToRefs(el, index)} className={item.className}>
              {item.type === "badge" && <span>{item.text}</span>}
              {item.type === "heading" && <h2>{item.text}</h2>}
              {item.type === "subheading" && <h3>{item.text}</h3>}
              {item.type === "paragraph" && <p>{item.text}</p>}
              {item.type === "list" && (
                <ul>
                  {item.items.map((listItem, listIndex) => (
                    <li key={listIndex} className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      <span>{listItem}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT IMAGE WITH ANIMATIONS */}
        <div className="md:col-span-5 col-span-1 flex items-center justify-center">
          <div
            ref={imageContainerRef}
            className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform-gpu bg-white/5 backdrop-blur-sm"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <img
              src={images[0]}
              alt="Jain Dairy Facility"
              className="w-full h-80 object-cover"
              style={{ transformStyle: 'preserve-3d' }}
            />
            {/* Image caption */}
          </div>
        </div>
      </div>
    </section>
  );
} 