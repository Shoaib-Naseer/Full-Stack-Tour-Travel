const { Payment } = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

async function makeStripePayment(paymentData) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: paymentData.amount * 100, // Amount in cents
        currency: 'pkr', 
        description: 'Payment Description',
        payment_method_types: ['card'],
      });   
      return paymentIntent.client_secret;
    } catch (error) {
      throw new Error(error.message);
    }
  }


async function getPaymentById(paymentId) {
  try {
    const payment = await Payment.findByPk(paymentId);
    if (!payment) {
      throw new Error('Payment not found');
    }
    return payment;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllPayments() {
    try {
      const payments = await Payment.findAll();
      return payments;
    } catch (error) {
      throw new Error(error.message);
    }
  }


module.exports = {
  getPaymentById,
  makeStripePayment,
  getAllPayments
};
