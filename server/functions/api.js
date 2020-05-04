const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
const morgan = require('morgan');
const cors = require('cors');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const htmlPages = require('./helpers/htmlPages');

const functionName = 'api';
const basePath = `/.netlify/functions/${functionName}/`;

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const app = express(functionName);
const router = express.Router();

app.use(cors());
app.use(morgan('dev'));
app.use('/.netlify/functions/api/stripe/webhook', express.raw({type: "*/*"}))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send('Expo Stripe Checkout API')
});

router.get('/items', (req, res) => {

})

router.post('/checkout', async (req, res) => {
  
  /* 
  For the demonstration purpose, I am using req.body.items to create line_items, 
  but you shouldn't use it in production, mallicious users may change price of items in body before sending to server,
  rather get items from the database using id received in body.
  */
  //console.log(req.body.items);
  const order_items = [];
  for(let i=0; i<req.body.items.length; i++) {
    order_items.push({
      name: req.body.items[i].name,
      amount: req.body.items[i].amount*100,
      currency: 'inr',
      quantity: req.body.items[i].quantity,
      images: [req.body.items[i].image]
    })
  }

  // Insert a record in orders with payment as pending and with session id,
  const orderId = 'testingorderid';
  console.log(order_items);
  // Generate a session

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: order_items,
    success_url: 'https://pizzabyexpress.netlify.app/.netlify/functions/api/payment/success' + req.body.platform === 'web' ? '?platform=web' : '',
    cancel_url: 'https://pizzabyexpress.netlify.app/.netlify/functions/api/payment/cancel',
    client_reference_id: orderId,
    customer_email: 'email@example.com',
  });
  
  res.send({orderId, sessionId: session.id});

})

/**
 * To redirect users to Stripe
 */
router.get('/web/checkout/redirect', async (req, res) => {
  res.send(htmlPages.checkoutHtmlPage('pk_test_ENcvwuFgRGUey2rsT2GN1A6u', req.query.sessionId));
})

router.get('/payment/success', (req, res) => {
  console.log("Payment Success");
  if(req.query.platform === 'web') {
    res.send(htmlPages.checkoutSuccessHtmlPage());
  }
  else
    res.json({success: true});
})

router.get('/payment/cancel', (req, res) => {
  console.log("Payment Cancelled");
  res.json({success: false});
})

router.post('/stripe/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Fulfill the purchase...
    console.log(session);
  }

  // Return a response to acknowledge receipt of the event
  res.json({received: true});
});


app.use(basePath, router);

router.use(awsServerlessExpressMiddleware.eventContext());

if(process.env.NODE_ENV !== 'production')
  app.listen(3000)

// Initialize awsServerlessExpress
const server = awsServerlessExpress.createServer(app);

// Export lambda handler
exports.handler = (event, context) => {
  return awsServerlessExpress.proxy(server, event, context)
}