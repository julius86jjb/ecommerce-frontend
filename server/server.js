const express = require("express");
const cors = require("cors");
const bodyparser = require('body-parser');

const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors({ origin: true, credentials: true }));

const stripe = require('stripe')('sk_test_51OVWQLHOraHpQAo7y2iB6iFZcJHDd7gnpGAE2bfN9wzGGZXzajhJQpS9QbrywBSuax1T3ONksIL3z6F0fk4hMlfD00Q9NJpa2X')

app.post('/checkout', async (req, res, next) => {
  try {
    // const session = await stripe.checkout.sessions.create({
    //   line_items: req.body.items.map((item) => ({
    //     currency: 'usd',
    //     product_data: {
    //       name: item.product.title,
    //       images: item.product.image
    //     },
    //     unit_amount: item.product.price * 100
    //   })),
    //   mode: 'payment',
    //   success_url: 'http://localhost:4242/success.html',
    //   cancel_url: 'http://localhost:4242/cancel.html',
    // });
    // res.status(200).json(session)


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
      },
          shipping_options: [
          {
              shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                  amount: 0,
                  currency: 'usd',
              },
              display_name: 'Free shipping',
              // Delivers between 5-7 business days
              delivery_estimate: {
                  minimum: {
                  unit: 'business_day',
                  value: 5,
                  },
                  maximum: {
                  unit: 'business_day',
                  value: 7,
                  },
              }
              }
          },
          {
              shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                  amount: 1500,
                  currency: 'usd',
              },
              display_name: 'Next day air',
              // Delivers in exactly 1 business day
              delivery_estimate: {
                  minimum: {
                  unit: 'business_day',
                  value: 1,
                  },
                  maximum: {
                  unit: 'business_day',
                  value: 1,
                  },
              }
              }
          },
          ],
         line_items:  req.body.items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.product.title,
              images: [item.product.image]
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
        })),
         mode: "payment",
         success_url: "./public/checkout.html",
         cancel_url: "./public/cancel.html",
      });

      res.status(200).json(session);
  } catch (error) {
    next(error);
  }
})
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`aplicacion is running on ${PORT}`));

