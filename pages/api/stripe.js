import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (res.method === "POST") {
    console.log(req.body.cartItem);
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1LaZwNGpVNtQJdiUwejjD3dS" },
          { shipping_rate: "shr_1LaZxxGpVNtQJdiUR78G21pf" },
        ],
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "{{PRICE_ID}}",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      };

      const session = await stripe.checkout.sessions.create(params);

      res.redirect(303, session.url);
    } catch (error) {
      res.status(500).json({ statusCode: 900, message: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
