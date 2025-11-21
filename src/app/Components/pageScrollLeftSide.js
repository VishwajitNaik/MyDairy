"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pagesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    pagesRef.current = pagesRef.current.slice(0, 9);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const pages = pagesRef.current.filter(Boolean);

    // Set initial state for all pages
    gsap.set(pages, {
      width: "60vw",
      height: "60vh",
      x: "20%",
      y: "20%",
      opacity: 0,
      rotationY: 90, // Start rotated for 3D effect
    });

    // Show first page
    gsap.set(pages[0], { opacity: 1, rotationY: 0 });

    // Create scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${pages.length * 100}%`,
        scrub: 1,
        pin: true,
      }
    });

    // Add page transitions to timeline
    pages.forEach((page, index) => {
      if (index === 0) return;

      const prevPage = pages[index - 1];

      // Current page enters
      tl.to(page, {
        opacity: 1,
        rotationY: 0,
        duration: 1,
        ease: "power2.out"
      }, `+=0.5`)

      // Previous page gets cut (moves away and fades)
      .to(prevPage, {
        x: "-100%",
        opacity: 0,
        rotationY: -90,
        duration: 0.8,
        ease: "power2.in"
      }, `<0.3`); // Overlap with current page entry
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el, index) => {
    if (el && !pagesRef.current.includes(el)) {
      pagesRef.current[index] = el;
    }
  };

  const pages = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/1200/800?random=${i + 1}`,
    title: `Page ${i + 1}`,
    description: `This is page ${i + 1} of 9`
  }));

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold text-white">9 Page Scroll Cut Animation</h1>
      </div>

      <div ref={containerRef} className="relative h-screen">
        {pages.map((page, index) => (
          <div
            key={page.id}
            ref={(el) => addToRefs(el, index)}
            className="absolute inset-0 flex items-center justify-center will-change-transform"
            style={{ 
              zIndex: pages.length - index,
              perspective: "1000px"
            }}
          >
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden transform-style-preserve-3d">
              <Image
                src={page.src}
                width={1200}
                height={800}
                alt={page.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-1 rounded">
                Page {index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Complete! ✨</h2>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//   const pagesRef = useRef([]);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     pagesRef.current = pagesRef.current.slice(0, 9);
//   }, []);

//   useEffect(() => {
//     if (!containerRef.current) return;

//     const pages = pagesRef.current.filter(Boolean);

//     // Set initial state for all pages
//     gsap.set(pages, {
//       width: "90vw",
//       height: "90vh",
//       x: "5%",
//       y: "5%",
//       opacity: 0,
//       rotation: 45, // Start rotated
//       scale: 0.8,
//     });

//     // Create master timeline
//     const tl = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         start: "top top",
//         end: `+=${pages.length * 120}%`,
//         scrub: 1.5,
//         pin: true,
//         anticipatePin: 1,
//       }
//     });

//     // Add page animations to timeline
//     pages.forEach((page, index) => {
//       if (index === 0) {
//         // First page
//         tl.to(page, {
//           opacity: 1,
//           rotation: 0,
//           scale: 1,
//           duration: 1,
//           ease: "back.out(1.2)"
//         });
//       } else {
//         const prevPage = pages[index - 1];
        
//         // Current page enters from top with rotation
//         tl.to(page, {
//           y: "5%",
//           rotation: 0,
//           opacity: 1,
//           scale: 1,
//           duration: 1.2,
//           ease: "power2.out"
//         }, `+=0.3`)

//         // Previous page exits to left with rotation
//         .to(prevPage, {
//           x: "-100%",
//           rotation: -45,
//           opacity: 0,
//           scale: 0.7,
//           duration: 1,
//           ease: "power2.in"
//         }, `<0.5`); // Overlap the animations
//       }
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(trigger => trigger.kill());
//     };
//   }, []);

//   const addToRefs = (el, index) => {
//     if (el && !pagesRef.current.includes(el)) {
//       pagesRef.current[index] = el;
//     }
//   };

//   const pages = Array.from({ length: 9 }, (_, i) => ({
//     id: i + 1,
//     src: `https://picsum.photos/1200/800?random=${i + 1}`,
//     title: `Rotating Page ${i + 1}`,
//     description: `Experience the 45° rotation effect`
//   }));

//   return (
//     <div className="min-h-screen bg-gray-900 overflow-hidden">
//       <div className="text-center py-12">
//         <h1 className="text-4xl font-bold text-white mb-2">45° Rotating Pages</h1>
//         <p className="text-purple-300">5% padding with smooth rotation transitions</p>
//       </div>

//       <div ref={containerRef} className="relative h-screen">
//         {pages.map((page, index) => (
//           <div
//             key={page.id}
//             ref={(el) => addToRefs(el, index)}
//             className="absolute inset-0 flex items-center justify-center will-change-transform"
//             style={{ zIndex: pages.length - index }}
//           >
//             <div className="relative bg-white rounded-xl shadow-lg overflow-hidden transform-gpu">
//               <Image
//                 src={page.src}
//                 width={1200}
//                 height={800}
//                 alt={page.title}
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 left-4 text-white bg-black/60 px-3 py-1 rounded">
//                 Page {index + 1} • 45° Rotate
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="py-16 text-center text-white">
//         <h2 className="text-3xl font-bold">Rotation Journey Complete! ✨</h2>
//       </div>
//     </div>
//   );
// }


// *********************Scroll page top side *******************'

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pagesRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    pagesRef.current = pagesRef.current.slice(0, 6); // Changed to 6 pages
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const pages = pagesRef.current.filter(Boolean);
    const totalPages = pages.length;

    // Set initial positions with centered layout
    gsap.set(pages, {
      width: "70vw", // Smaller width for better centering
      height: "70vh", // Smaller height
      x: "15%", // Center horizontally (100-70)/2 = 15%
      y: "15%", // Center vertically (100-70)/2 = 15%
      opacity: 0,
      scale: 0.9,
      rotation: 45,
    });

    // Show first page initially and hide others completely
    gsap.set(pages[0], { 
      opacity: 1, 
      scale: 1,
      rotation: 0 
    });

    // Hide all other pages initially (important for stacking)
    for (let i = 1; i < pages.length; i++) {
      gsap.set(pages[i], {
        opacity: 0,
        y: "150%", // Start below the screen
        rotation: -45,
      });
    }

    // Create a pinned section with scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${totalPages * 100}%`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeIndex = Math.min(Math.floor(progress * totalPages), totalPages - 1);
        
        pages.forEach((page, index) => {
          if (index === activeIndex) {
            // Active page - animate in to center position
            gsap.to(page, {
              y: "15%", // Center vertically
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            });
          } else if (index === activeIndex - 1 && activeIndex > 0) {
            // Previous page - move up and out
            gsap.to(page, {
              y: "-150%",
              rotation: 45,
              opacity: 0,
              scale: 0.8,
              duration: 0.8,
              ease: "power2.in"
            });
          } else if (index < activeIndex - 1) {
            // Older pages - keep them hidden above
            gsap.set(page, {
              y: "-150%",
              opacity: 0,
              rotation: 45,
            });
          } else if (index > activeIndex) {
            // Future pages - keep them hidden below
            gsap.set(page, {
              y: "150%",
              opacity: 0,
              rotation: -45,
            });
          }
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const addToRefs = (el, index) => {
    if (el && !pagesRef.current.includes(el)) {
      pagesRef.current[index] = el;
    }
  };

  // Only 6 pages with smaller images
  const pages = [
    { 
      id: 1, 
      src: "https://picsum.photos/800/600?random=1", // Smaller image size
      title: "Page 1",
      description: "Welcome to the rotating scroll experience"
    },
    { 
      id: 2, 
      src: "https://picsum.photos/800/600?random=2", 
      title: "Page 2",
      description: "Smooth top-to-top transitions"
    },
    { 
      id: 3, 
      src: "https://picsum.photos/800/600?random=3", 
      title: "Page 3",
      description: "45 degree rotation effects"
    },
    { 
      id: 4, 
      src: "https://picsum.photos/800/600?random=4", 
      title: "Page 4",
      description: "Perfectly centered layout"
    },
    { 
      id: 5, 
      src: "https://picsum.photos/800/600?random=5", 
      title: "Page 5",
      description: "Smaller images for better focus"
    },
    { 
      id: 6, 
      src: "https://picsum.photos/800/600?random=6", 
      title: "Page 6",
      description: "Final rotating destination"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      
      {/* Header - This will scroll away */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center px-8">
          <h1 className="text-6xl font-bold text-white mb-6">
            Centered Pages
          </h1>
          <p className="text-2xl text-purple-200 mb-8">
            70% width × 70% height with perfect centering
          </p>
          <p className="text-xl text-purple-300 animate-bounce">Scroll down to begin ↓</p>
        </div>
      </div>

      {/* Pinned Pages Container */}
      <div 
        ref={containerRef} 
        className="relative"
        style={{ height: `${pages.length * 100}vh` }}
      >
        {pages.map((page, index) => (
          <div
            key={page.id}
            ref={(el) => addToRefs(el, index)}
            className="absolute inset-0 flex items-center justify-center will-change-transform" // Changed to center both ways
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/30 transform-gpu">
              <img
                src={page.src}
                alt={page.title}
                className="w-full h-full object-cover"
              />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Page Content */}
              <div className="absolute bottom-8 left-8 text-white">
                <div className="bg-black/60 px-4 py-2 rounded-lg mb-4">
                  <span className="text-base text-purple-300 font-semibold">
                    Page {index } of {pages.length}
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-3">{page.title}</h2>
                <p className="text-xl text-purple-200">{page.description}</p>
              </div>

              {/* Page Number Indicator */}
              <div className="absolute top-8 right-8 bg-black/80 text-white px-5 py-3 rounded-full text-xl font-bold border-2 border-purple-400/60">
                {index + 1}
              </div>

              {/* Size Indicator */}
              <div className="absolute top-8 left-8 bg-purple-600/90 text-white px-4 py-2 rounded text-base font-semibold">
                70% × 70%
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer - This appears after pinned section */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Journey Complete! 🎉
          </h2>
          <p className="text-2xl text-purple-200">
            Experienced all {pages.length} centered pages
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full backdrop-blur-sm border border-purple-400/30">
        <p className="text-lg">Scroll ↓ for centered page transitions</p>
      </div>
    </div>
  );
}