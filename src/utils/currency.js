
const USD_TO_INR_RATE = 83.0;

export const formatCurrency = (amount, currency = 'INR') => {
  if (currency === 'INR') {
    return `₹${Math.round(amount * USD_TO_INR_RATE).toLocaleString('en-IN')}`;
  }
  return `$${amount.toFixed(2)}`;
};

export const convertToINR = (usdAmount) => {
  return Math.round(usdAmount * USD_TO_INR_RATE);
};
