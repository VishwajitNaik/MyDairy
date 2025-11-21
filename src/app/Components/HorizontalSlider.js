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

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalSlider() {
  const sliderRef = useRef(null);
  const cardsRef = useRef([]);
  const progressBarRef = useRef(null);

  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, 6);
  }, []);

  useEffect(() => {
    if (!sliderRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    const totalWidth = cards.length * 100;

    // Initial positions
    gsap.set(cards, {
      x: (i) => i * 100 + "%",
      rotationY: -45,
      opacity: 0.6,
      scale: 0.8,
    });

    // Horizontal slider animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sliderRef.current,
        start: "top top",
        end: `+=${totalWidth * 2}%`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Progress bar
          if (progressBarRef.current) {
            gsap.set(progressBarRef.current, { scaleX: progress });
          }

          cards.forEach((card, index) => {
            const cardProgress = (progress - index * 0.15) * 3;

            if (cardProgress >= 0 && cardProgress <= 1) {
              gsap.set(card, {
                rotationY: gsap.utils.interpolate(-45, 0, cardProgress),
                scale: gsap.utils.interpolate(0.8, 1, cardProgress),
                opacity: gsap.utils.interpolate(0.6, 1, cardProgress),
                x: gsap.utils.interpolate(50, 0, cardProgress) + "%",
                zIndex: cardProgress > 0.5 ? 10 : 1,
              });
            } else if (cardProgress > 1) {
              const exitProgress = (cardProgress - 1) * 2;

              gsap.set(card, {
                rotationY: gsap.utils.interpolate(0, 45, exitProgress),
                scale: gsap.utils.interpolate(1, 0.8, exitProgress),
                opacity: gsap.utils.interpolate(1, 0.6, exitProgress),
                x: gsap.utils.interpolate(0, -50, exitProgress) + "%",
              });
            }
          });
        },
      },
    });

    tl.to(cards, {
      x: `-=${totalWidth - 100}%`,
      duration: 1,
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sliderRef.current) trigger.kill();
      });
    };
  }, []);

  const addToRefs = (el, index) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el;
    }
  };

  const cards = [
    { id: 1, src: "https://picsum.photos/800/500?random=1", title: "Card 1" },
    { id: 2, src: "https://picsum.photos/800/500?random=2", title: "Card 2" },
    { id: 3, src: "https://picsum.photos/800/500?random=3", title: "Card 3" },
    { id: 4, src: "https://picsum.photos/800/500?random=4", title: "Card 4" },
    { id: 5, src: "https://picsum.photos/800/500?random=5", title: "Card 5" },
    { id: 6, src: "https://picsum.photos/800/500?random=6", title: "Card 6" },
  ];

  return (
    <div className="w-full h-full bg-slate-900 rounded-3xl overflow-hidden relative text-white">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 z-50">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 origin-left"
        />
      </div>

      {/* Slider */}
      <div ref={sliderRef} className="relative h-full overflow-hidden">
        <div className="relative w-full h-full flex items-center">
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => addToRefs(el, index)}
              className="absolute w-[80vw] max-w-4xl will-change-transform"
              style={{ left: "10%", perspective: "1000px" }}
            >
              <img
                src={card.src}
                alt={card.title}
                className="rounded-3xl shadow-2xl border-4 border-white/20 w-full h-full object-cover"
              />

              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Instructions */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center text-white/80">
          <p className="text-lg">← Scroll Horizontally →</p>
          <p className="text-sm text-purple-300 mt-1">Complete horizontal scroll to continue</p>
        </div>
      </div>
    </div>
  );
}