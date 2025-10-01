import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import ImageCarousel from '../components/ImageCarousel';
import RippleButton from '../components/RippleButton';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="btn-primary"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'features', label: 'Features' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping' }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          variants={itemVariants}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div variants={itemVariants}>
            <ImageCarousel images={product.images} />
          </motion.div>

          {/* Product Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-500">{product.category}</span>
                {product.badge && (
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    product.badge === 'New' ? 'bg-green-500 text-white' :
                    product.badge === 'Sale' ? 'bg-red-500 text-white' :
                    'bg-primary-500 text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({product.rating}/5)</span>
                </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">In Stock</span>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary-600">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <RippleButton
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary py-4 text-lg"
                >
                  Add to Cart
                </RippleButton>
                
                <RippleButton className="p-4 border border-gray-300 hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5" />
                </RippleButton>
                
                <RippleButton className="p-4 border border-gray-300 hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </RippleButton>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">Free Shipping</div>
                  <div className="text-sm text-gray-600">On orders over $50</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">Warranty</div>
                  <div className="text-sm text-gray-600">2 year warranty</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-6 h-6 text-primary-600" />
                <div>
                  <div className="font-medium text-gray-900">Returns</div>
                  <div className="text-sm text-gray-600">30 day returns</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      selectedTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {selectedTab === 'description' && (
                  <motion.div
                    key="description"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="prose max-w-none"
                  >
                    <p className="text-gray-600 leading-relaxed">
                      {product.description} This premium product is designed with the highest quality materials 
                      and cutting-edge technology to provide an exceptional user experience. Whether you're a 
                      professional or an enthusiast, this product will exceed your expectations with its 
                      superior performance and elegant design.
                    </p>
                  </motion.div>
                )}

                {selectedTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {product.features.map((feature, index) => (
                        <motion.li
                          key={feature}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-3"
                        >
                          <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {selectedTab === 'reviews' && (
                  <motion.div
                    key="reviews"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900 mb-2">{product.rating}</div>
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-6 h-6 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">Based on 127 reviews</p>
                      </div>
                      
                      <div className="space-y-4">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center space-x-4">
                            <span className="text-sm font-medium w-8">{rating}</span>
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-yellow-400 h-2 rounded-full"
                                style={{ width: `${(rating / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">{(rating / 5) * 100}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {selectedTab === 'shipping' && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Standard Shipping</h4>
                        <p className="text-gray-600">5-7 business days</p>
                        <p className="text-gray-600">Free on orders over $50</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Express Shipping</h4>
                        <p className="text-gray-600">2-3 business days</p>
                        <p className="text-gray-600">$9.99</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">Overnight Shipping</h4>
                        <p className="text-gray-600">Next business day</p>
                        <p className="text-gray-600">$19.99</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-gray-900">International Shipping</h4>
                        <p className="text-gray-600">7-14 business days</p>
                        <p className="text-gray-600">$24.99</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
