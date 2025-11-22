"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

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
      position: "start",
    },
    {
      year: "1990",
      title: "Started supplying dairy products",
      description: "Supplied dairy items to hotels & restaurants",
      icon: "🏨",
      id: "K2",
      color: "from-orange-500 to-orange-700",
      position: "end",
    },
    {
      year: "1997",
      title: "Started distributing food products",
      description: "Became distributors for major brands",
      icon: "📦",
      id: "K3",
      color: "from-amber-500 to-amber-700",
      position: "start",
    },
    {
      year: "2007",
      title: "New Plant in GIDC",
      description: "Established a modern manufacturing facility",
      icon: "🏭",
      id: "K4",
      color: "from-green-500 to-green-700",
      position: "end",
    },
    {
      year: "2009",
      title: "ISO 22000 Certified",
      description: "Achieved international quality standards",
      icon: "⭐",
      id: "K5",
      color: "from-teal-500 to-teal-700",
      position: "start",
    },
    {
      year: "2010",
      title: "Expanded to multiple cities",
      description: "Distribution network across Gujarat",
      icon: "🗺️",
      id: "K6",
      color: "from-blue-500 to-blue-700",
      position: "end",
    },
    {
      year: "2012",
      title: "Opened branded outlets",
      description: "Retail shops across Gujarat",
      icon: "🛍️",
      id: "K7",
      color: "from-purple-500 to-purple-700",
      position: "start",
    },
  ];

  /* ----------------------------------------------------------
     ANIMATIONS
  ------------------------------------------------------------- */
  useEffect(() => {
    if (!active || !containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set([titleRef.current, lineRef.current, ...cardsRef.current], {
      opacity: 0,
      y: 50,
    });

    tl.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.5 },
        "-=0.5"
      )
      .fromTo(
        cardsRef.current,
        {
          x: (i) => (i % 2 === 0 ? -100 : 100),
          y: (i) => (i % 2 === 0 ? -50 : 50),
          opacity: 0,
          rotation: (i) => (i % 2 === 0 ? -10 : 10),
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "elastic.out(1, 0.8)",
        },
        "-=1"
      );

    // Auto-scroll timeline
    const autoScroll = gsap.timeline({ repeat: -1 });

    milestones.forEach((_, index) => {
      autoScroll
        .to(timelineRef.current, {
          scrollTo: { x: index * 320 },
          duration: 1.5,
          ease: "power2.inOut",
          onStart: () => setActiveCard(index),
        })
        .to({}, { duration: 2 });
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
    gsap.to(timelineRef.current, {
      scrollTo: { x: index * 320 },
      duration: 1.2,
      ease: "power3.out",
    });
    setActiveCard(index);
  };

  const nextCard = () => scrollToCard((activeCard + 1) % milestones.length);
  const prevCard = () =>
    scrollToCard((activeCard - 1 + milestones.length) % milestones.length);

  /* ----------------------------------------------------------
     RENDER
  ------------------------------------------------------------- */

  return (
    <div
      ref={containerRef}
      className="w-full h-full p-6 bg-gradient-to-br from-gray-900 to-black overflow-hidden rounded-[30px]"
    >
      {/* Title */}
      <div className="text-center mb-10">
        <h1 ref={titleRef} className="text-5xl font-bold text-white mb-2">
          Key Milestones
        </h1>
        <p className="text-white/70 text-lg">
          A journey of commitment and growth since 1988
        </p>
      </div>

      {/* Timeline */}
      <div className="relative h-3/4">
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0">
          <div
            ref={lineRef}
            className="h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full mx-10"
          ></div>
        </div>

        {/* Arrows */}
        <button
          onClick={prevCard}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 
          bg-black/40 backdrop-blur-sm rounded-full text-white text-3xl flex items-center 
          justify-center border border-white/20 hover:bg-white/20 transition-all"
        >
          &lsaquo;
        </button>

        <button
          onClick={nextCard}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 
          bg-black/40 backdrop-blur-sm rounded-full text-white text-3xl flex items-center 
          justify-center border border-white/20 hover:bg-white/20 transition-all"
        >
          &rsaquo;
        </button>

        {/* Scrollable timeline */}
        <div
          ref={timelineRef}
          className="relative h-full overflow-x-auto overflow-y-hidden py-20 scrollbar-hide"
        >
          <div className="flex space-x-8 px-12 min-w-max">
            {milestones.map((m, index) => (
              <div
                key={m.id}
                ref={addToCardsRef}
                onClick={() => scrollToCard(index)}
                className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                  activeCard === index ? "scale-105" : "scale-95 opacity-80"
                }`}
              >
                <div className={`relative w-80 ${m.position === "start" ? "mb-28" : "mt-28"}`}>
                  
                  {/* Dot */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 ${
                      m.position === "start" ? "top-full mt-2" : "bottom-full mb-2"
                    } w-6 h-6 bg-white rounded-full border-4 border-blue-500 shadow`}
                  ></div>

                  {/* Year */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 ${
                      m.position === "start" ? "top-full mt-10" : "bottom-full mb-10"
                    } text-white bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm`}
                  >
                    {m.year}
                  </div>

                  {/* Card */}
                  <div
                    className={`bg-gradient-to-br ${m.color} rounded-2xl p-6 shadow-2xl 
                    text-white border border-white/20 backdrop-blur-sm`}
                  >
                    <div className="text-center mb-3 text-3xl">{m.icon}</div>
                    <h3 className="text-lg font-bold mb-2 text-center">{m.title}</h3>
                    <p className="text-sm text-center opacity-90">{m.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom scrollbar hide */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default KeyMilestones;
