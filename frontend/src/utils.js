// Formats a number as money, e.g. 1500 -> ₹1,500.00
export const money = (n) => Number(n).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
