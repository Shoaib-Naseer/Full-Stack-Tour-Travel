const stripe = require("stripe")(
  "sk_test_51Lr422SCUj16GG00GGQzfM9IERpOo31SqaXd4xt0BwyimfBl9MBYzd1PpicpYPLoJ74iHVkXxd9AydjFqk7rZf3r00atrE0MOp",
);
const responseUtils = require("../utils/responseUtils");

// Create a payment intent
// app.post('/create-payment-intent', async (req, res) => {
async function createPayment(req, reply) {
  try {
    const { amount, id } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      payment_method: id,
      currency: "pkr",
      confirm: true,
      payment_method_types: ["card"],
    });

    responseUtils.sendSuccessResponse(reply, paymentIntent, 201);
  } catch (error) {
    responseUtils.sendFailureResponse(reply, error.message);
  }
}

module.exports = {
  createPayment,
};
