import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight, Shield } from 'lucide-react';
import RippleButton from '../components/RippleButton';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

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

  const shipping = getTotalPrice() > 4150 ? 0 : 830; // Free shipping over ₹4,150
  const tax = getTotalPrice() * 0.08;
  const total = getTotalPrice() + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen bg-gray-50 py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-xl text-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/products">
              <RippleButton className="btn-primary px-8 py-3 text-lg">
                Start Shopping
              </RippleButton>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
            </div>
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear Cart
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              variants={containerVariants}
              className="space-y-4"
            >
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  layout
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center space-x-4">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.category}</p>
                      <p className="text-lg font-bold text-primary-600">{formatCurrency(item.price)}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Continue Shopping */}
            <motion.div variants={itemVariants} className="mt-8">
              <Link to="/products">
                <RippleButton className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </RippleButton>
              </Link>
            </motion.div>
          </div>

          {/* Order Summary */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(getTotalPrice())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary-600">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link to="/checkout">
                  <RippleButton className="w-full btn-primary py-4 text-lg flex items-center justify-center space-x-2">
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </RippleButton>
                </Link>
                
                <button className="w-full btn-secondary py-3">
                  Save for Later
                </button>
              </div>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium text-gray-900 mb-3">Promo Code</h4>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <RippleButton className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    Apply
                  </RippleButton>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t text-center">
                <div className="flex items-center justify-center space-x-2 text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Secure checkout</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
