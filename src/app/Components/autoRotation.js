// components/MilkProductsCarousel.jsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const MilkProductsCarousel = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);
  
  const milkProducts = [
    {
      id: 1,
      title: "FRESH COW MILK",
      image: "assets/card1.png",
      logo: "🥛",
      description: "100% pure cow milk from grass-fed cows raised in natural environments",
      price: "₹45/L",
      features: ["Pasteurized", "Rich in Calcium", "No Preservatives", "Daily Fresh", "Hormone Free", "Vitamin D"],
      nutrition: "Protein: 3.4g, Fat: 3.5g, Calcium: 125mg per 100ml",
      shelfLife: "5-7 days refrigerated",
      benefits: ["Strong Bones", "Muscle Growth", "Healthy Heart", "Better Immunity"],
      usage: "Ideal for drinking, cooking, making curd and sweets"
    },
    {
      id: 2,
      title: "BUFFALO MILK",
      image: "assets/card2.png",
      logo: "🐃",
      description: "Creamy buffalo milk with high fat content perfect for traditional sweets",
      price: "₹60/L",
      features: ["High Fat Content", "Creamy Texture", "Rich in Protein", "Ideal for Sweets", "Natural Cream", "Thicker"],
      nutrition: "Fat: 7-8%, Protein: 4.2g, Calcium: 210mg per 100ml",
      shelfLife: "4-6 days refrigerated",
      benefits: ["Rich Taste", "More Cream", "Energy Boost", "Traditional Recipes"],
      usage: "Perfect for Rabri, Kheer, Paneer and traditional Indian sweets"
    },
    {
      id: 3,
      title: "ORGANIC MILK",
      image: "assets/card3.png",
      logo: "🌿",
      description: "Certified organic milk from pesticide-free farms with ethical farming",
      price: "₹80/L",
      features: ["Organic Certified", "No Antibiotics", "Free Range", "Eco-Friendly", "No Pesticides", "Sustainable"],
      nutrition: "Natural Omega-3, Vitamin D enriched, Higher CLA content",
      shelfLife: "7-10 days refrigerated",
      benefits: ["Chemical Free", "Better Nutrition", "Environment Friendly", "Ethical Farming"],
      usage: "Best for health-conscious families and organic lifestyle"
    },
    {
      id: 4,
      title: "LOW FAT MILK",
      image: "assets/card4.png",
      logo: "⚖️",
      description: "Perfect for weight management and healthy lifestyle without compromising nutrition",
      price: "₹50/L",
      features: ["Low Fat", "High Protein", "Less Calories", "Heart Healthy", "Weight Management", "Nutrient Rich"],
      nutrition: "Fat: 1.5%, Protein: 3.5g, Calcium: 120mg per 100ml",
      shelfLife: "6-8 days refrigerated",
      benefits: ["Weight Control", "Heart Health", "Low Cholesterol", "Fitness Friendly"],
      usage: "Ideal for diet plans, fitness routines and calorie control"
    },
    {
      id: 5,
      title: "FLAVORED MILK",
      image: "assets/img3.png",
      logo: "🍫",
      description: "Delicious flavored milk in various tastes that kids and adults love",
      price: "₹55/L",
      features: ["Chocolate", "Strawberry", "Vanilla", "Kesar", "Natural Flavors", "Vitamin Enriched"],
      nutrition: "Added vitamins, Natural flavors, Essential minerals",
      shelfLife: "10-15 days refrigerated",
      benefits: ["Great Taste", "Kids Favorite", "Quick Energy", "Nutritious Drink"],
      usage: "Perfect for school lunches, quick breakfast and refreshing drinks"
    },
    {
      id: 6,
      title: "FORTIFIED MILK",
      image: "assets/img4.png",
      logo: "💪",
      description: "Extra nutrients added for better health and complete nutrition",
      price: "₹65/L",
      features: ["Vitamin D", "Calcium Fortified", "Iron Enriched", "Protein Boost", "Vitamin B12", "Zinc Added"],
      nutrition: "Extra Calcium, Vitamin D, Iron, Protein 4.0g per 100ml",
      shelfLife: "8-12 days refrigerated",
      benefits: ["Strong Immunity", "Bone Health", "Energy Production", "Complete Nutrition"],
      usage: "Recommended for growing children, pregnant women and elderly"
    }
  ];

  const nextCard = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCard((prev) => (prev + 1) % milkProducts.length);
    setExpandedCard(null);
  };

  const prevCard = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentCard((prev) => (prev - 1 + milkProducts.length) % milkProducts.length);
    setExpandedCard(null);
  };

  const goToCard = (index) => {
    if (isTransitioning || index === currentCard) return;
    setIsTransitioning(true);
    setCurrentCard(index);
    setExpandedCard(null);
  };

  const toggleExpand = (productId) => {
    setExpandedCard(expandedCard === productId ? null : productId);
  };

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-sans">
      <h2 className="text-indigo-800 text-2xl md:text-3xl font-bold mb-2 text-center">
        Premium Milk Products
      </h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Discover our range of fresh and nutritious dairy products
      </p>
      
      {/* Main Carousel Container - Centered */}
      <div className="relative w-full max-w-6xl mx-auto h-[500px] perspective-1000 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          {milkProducts.map((product, index) => {
            let position = 'next';
            if (index === currentCard) {
              position = 'active';
            } else if (
              index === currentCard - 1 ||
              (currentCard === 0 && index === milkProducts.length - 1)
            ) {
              position = 'prev';
            }

            // Calculate positions with proper spacing
            const getCardStyles = () => {
              switch (position) {
                case 'active':
                  return 'translate-x-0 rotate-y-0 opacity-100 z-30 scale-100';
                case 'prev':
                  return 'translate-x-[-200%] md:translate-x-[-160%] rotate-y--15 opacity-70 z-20 scale-90';
                case 'next':
                  return 'translate-x-[200%] md:translate-x-[160%] rotate-y-15 opacity-70 z-20 scale-90';
                default:
                  return 'translate-x-0 rotate-y-0 opacity-0 z-10 scale-90';
              }
            };

            return (
              <div
                key={product.id}
                className={`absolute w-80 h-96 bg-white rounded-2xl shadow-2xl cursor-pointer overflow-hidden backface-hidden transition-all duration-600 ease-in-out border-2 border-gray-100
                  ${getCardStyles()}`}
                onClick={() => toggleExpand(product.id)}
              >
                {/* Product Card Content */}
                <div className="relative h-full">
                  {/* Product Image */}
                  <div className="h-40 bg-gradient-to-r from-blue-100 to-indigo-100 relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 text-3xl bg-white/90 rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                      {product.logo}
                    </div>
                    
                    {/* Navigation Buttons on Active Card */}
                    {position === 'active' && (
                      <div className="absolute bottom-3 left-3 right-3 flex justify-between pointer-events-none">
                        <button 
                          className="bg-white/90 w-10 h-10 rounded-full flex items-center justify-center text-gray-700 text-lg shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto border border-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            prevCard();
                          }}
                        >
                          ‹
                        </button>
                        <button 
                          className="bg-white/90 w-10 h-10 rounded-full flex items-center justify-center text-gray-700 text-lg shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 pointer-events-auto border border-gray-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextCard();
                          }}
                        >
                          ›
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-gray-800 mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Price */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-indigo-600">
                        {product.price}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                        Fresh Today
                      </span>
                    </div>

                    {/* Quick Features */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {product.features.length > 3 && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          +{product.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Expand Indicator */}
                    <div className="absolute bottom-3 right-3 text-sm text-gray-500 font-medium">
                      {product.id}/{milkProducts.length}
                    </div>

                    {/* Click Hint */}
                    {!expandedCard && position === 'active' && (
                      <div className="absolute bottom-3 left-3 text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full animate-pulse font-medium">
                        Click for full details
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center mt-8 gap-3">
        {milkProducts.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer
              ${index === currentCard 
                ? 'bg-indigo-600 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
              }`}
            onClick={() => goToCard(index)}
          />
        ))}
      </div>

      {/* Expanded Card Modal */}
      {expandedCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div 
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {milkProducts.map((product) => {
              if (product.id !== expandedCard) return null;
              
              return (
                <div key={product.id} className="p-8">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h2>
                      <p className="text-gray-600 text-lg">{product.description}</p>
                    </div>
                    <button 
                      onClick={() => setExpandedCard(null)}
                      className="bg-gray-100 hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center text-gray-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div>
                      <div className="rounded-2xl overflow-hidden mb-6">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                      
                      <div className="bg-blue-50 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-indigo-600">{product.price}</span>
                          <div className="text-4xl">{product.logo}</div>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>📊 <strong>Nutrition:</strong> {product.nutrition}</div>
                          <div>📅 <strong>Shelf Life:</strong> {product.shelfLife}</div>
                          <div>👨‍👩‍👧‍👦 <strong>Best For:</strong> {product.usage}</div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Features */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Key Features</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {product.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Health Benefits</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {product.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-center text-gray-700">
                              <span className="text-green-500 mr-2">✓</span>
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4">
                        <button className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                          Add to Cart
                        </button>
                        <button className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4 max-w-xs text-center">
        <div className="bg-white/80 rounded-lg p-3 shadow-sm">
          <div className="text-indigo-600 font-bold">6+</div>
          <div className="text-xs text-gray-600">Products</div>
        </div>
        <div className="bg-white/80 rounded-lg p-3 shadow-sm">
          <div className="text-indigo-600 font-bold">100%</div>
          <div className="text-xs text-gray-600">Natural</div>
        </div>
        <div className="bg-white/80 rounded-lg p-3 shadow-sm">
          <div className="text-indigo-600 font-bold">Daily</div>
          <div className="text-xs text-gray-600">Fresh</div>
        </div>
      </div>
    </div>
  );
};

export default MilkProductsCarousel;