import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import RippleButton from './RippleButton';
import { formatCurrency } from '../utils/currency';

const ProductCard = ({ product, index = 0, viewMode = 'grid' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-gray-100 aspect-square">
            <motion.img
              variants={imageVariants}
              whileHover="hover"
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay with buttons */}
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              whileHover="visible"
              className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-2"
            >
              <motion.div variants={buttonVariants} initial="hidden" whileHover="visible">
                <RippleButton
                  onClick={handleAddToCart}
                  className="bg-white text-primary-600 p-3 rounded-full shadow-lg hover:bg-primary-600 hover:text-white transition-all duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                </RippleButton>
              </motion.div>
              
              <motion.div variants={buttonVariants} initial="hidden" whileHover="visible">
                <RippleButton className="bg-white text-gray-600 p-3 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-200">
                  <Heart className="w-5 h-5" />
                </RippleButton>
              </motion.div>
              
              <motion.div variants={buttonVariants} initial="hidden" whileHover="visible">
                <RippleButton className="bg-white text-gray-600 p-3 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-200">
                  <Eye className="w-5 h-5" />
                </RippleButton>
              </motion.div>
            </motion.div>

            {/* Badge */}
            {product.badge && (
              <div className="absolute top-3 left-3">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  product.badge === 'New' ? 'bg-green-500 text-white' :
                  product.badge === 'Sale' ? 'bg-red-500 text-white' :
                  'bg-primary-500 text-white'
                }`}>
                  {product.badge}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{product.category}</span>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-primary-600">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
