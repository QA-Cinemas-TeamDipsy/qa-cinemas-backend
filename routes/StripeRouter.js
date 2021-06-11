const express = require("express");
// password: zz,DEe936.aRZ6E
const router = express.Router();
const Stripe_Key =
  "sk_test_51Ixvo4AlfwidcJXzYMbTR7Of7QwAppMxV7QDv8pDHH9ZeZGbnWPUuvjajHXxNG3A46W9iY5QOR652fCBmknjy5fs00V2Q32bDl";
// npm i stripe
const stripe = require("stripe")(Stripe_Key);
// customerId will need to be added to a database
const customerId = "cus_Jb87ybTUd41ngj";

// Create a payment charge
router.post("/createCharge", async (req, res) => {
  const { amount, cardId, oneTime, email } = req.body;
  if (oneTime) {
    const {
      cardNumber,
      cardExpMonth,
      cardExpYear,
      cardCVC,
      country,
      postalCode,
    } = req.body;

    if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
      return res.status(400).send({
        Error: "Necessary Card Details are required for One Time Payment",
      });
    }
    try {
      const cardToken = await stripe.tokens.create({
        card: {
          number: cardNumber,
          exp_month: cardExpMonth,
          exp_year: cardExpYear,
          cvc: cardCVC,
          address_state: country,
          address_zip: postalCode,
        },
      });

      const charge = await stripe.charges.create({
        amount: amount,
        currency: "gbp",
        source: cardToken.id,
        receipt_email: email,
        description: `Stripe Charge Of Amount ${amount} from ${email}`,
      });

      if (charge.status == "succeeded") {
        return res.status(200).send({ Success: charge });
      } else {
        return res
          .status(400)
          .send({ Error: "Please try again later for One Time Payment" });
      }
    } catch (error) {
      return res.status(400).send({
        Error: "error really raw message",
      });
    }
  } else {
    try {
      const createCharge = await stripe.charges.create({
        amount: amount,
        currency: "gbp",
        receipt_email: email,
        customer: customerId,
        card: cardId,
        description: `Stripe Charge Of Amount ${amount} for Payment`,
      });
      if (createCharge.status == "succeeded") {
        return res.status(200).send({ Success: charge });
      } else {
        return res
          .status(400)
          .send({ Error: "Please try again later for payment" });
      }
    } catch (error) {
      return res.status(404).send({
        Error: "error raw message",
      });
    }
  }
});

module.exports = router;
