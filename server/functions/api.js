const express = require('express');
const awsServerlessExpress = require('aws-serverless-express');
const morgan = require('morgan');
const cors = require('cors');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const htmlPages = require('./helpers/htmlPages');
const database = require('./helpers/database');

const functionName = 'api';
const basePath = `/.netlify/functions/${functionName}/`;

const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const BASE_URL = 'https://pizzabyexpress.netlify.app';

const app = express(functionName);
const router = express.Router();

app.use(cors());
app.use(morgan('dev'));
app.use('/.netlify/functions/api/stripe/webhook', express.raw({type: "*/*"}))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.send('Expo Stripe Checkout API\nBuild v1.0.0')
});

router.get('/products', async (req, res) => {
  try {
    const result = await database.getProducts();
    res.json(result);
  } catch(err) {
    res.status(500).send('Internal Server Error');
  }
})

router.post('/checkout', async (req, res) => {
  
  try {

    /* 
      For the demonstration purpose, I am using req.body.items to create line_items, 
      but you shouldn't use it in production, mallicious users may change price of items in body before sending to server,
      rather get items from the database using id received in body.
    */

    const order_items = [];
    let amount = 0;
    for(let i=0; i<req.body.items.length; i++) {
      order_items.push({
        name: req.body.items[i].name,
        amount: req.body.items[i].amount*100,
        currency: 'inr',
        quantity: req.body.items[i].quantity,
        images: [req.body.items[i].image]
      });
      amount = amount + req.body.items[i].amount*req.body.items[i].quantity;
    }

    const order = await database.createOrder({items: req.body.items, platform: req.body.platform, amount, createdAt: new Date().toISOString(), paymentStatus: 'pending'});

    let success_url = '';
    let cancel_url = `${BASE_URL}/.netlify/functions/api/payment/cancel`;
    if(req.body.platform === 'web') {
      success_url = `${BASE_URL}/.netlify/functions/api/payment/success?platform=web`;
    }
    else {
      success_url = `${BASE_URL}/.netlify/functions/api/payment/success`;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: order_items,
      success_url,
      cancel_url,
      client_reference_id: order._id.toString(),
      customer_email: 'email@example.com',
    });
    
    res.send({orderId: order._id.toString(), sessionId: session.id});
  }
  catch(err) {
    res.status(500).send('Internal Server Error');
  }
})

/**
 * To redirect users to Stripe
 */
router.get('/web/checkout/redirect', async (req, res) => {
  res.send(htmlPages.checkoutHtmlPage('pk_test_ENcvwuFgRGUey2rsT2GN1A6u', req.query.sessionId));
})

router.get('/payment/success', (req, res) => {
   
  /**
   * Don't fulfill the purchase here. Rather use Webhooks to fulfill purchase.
   */
  
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

router.post('/stripe/webhook', async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    let event;
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Fulfill the purchase...
      const updatedOrder = await database.updateOrderPaymentStatus(session.client_reference_id, 'paid');
    }
  } catch (err) {
    console.log(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  res.json({received: true});
});

router.get('/orders/:orderId', async (req, res) => {
  try {
    const result = await database.getOrderById(req.params.orderId);
    console.log(result);
    res.json(result);
  } catch(err) {
    res.status(500).send('Internal Server Error');
  }
})


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