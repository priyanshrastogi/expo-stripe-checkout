const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient; 

let db = null;

const mongodbUrl = process.env.MONGODB_URL;

exports.getProducts = async () => {
  let products;
  try {
    if(db === null) {
      const conn = await mongoClient.connect(mongodbUrl,  { useNewUrlParser: true });
      db = conn.db('app');
      products = db.collection('products');
    }
    else {
      products = db.collection('products');
    }
    const result = await products.find({}).toArray();
    return result
  }
  catch(err) {
    throw new Error(err);
  }
}

exports.createOrder = async (data) => {
  let orders;
  try {
    if(db === null) {
      const conn = await mongoClient.connect(mongodbUrl,  { useNewUrlParser: true });
      db = conn.db('app');
      orders = db.collection('orders');
    }
    else {
      orders = db.collection('orders');
    }
    const result = await orders.insertOne(data);
    return result.ops[0];
  }
  catch(err) {
    throw new Error(err);
  }
}

exports.updateOrderPaymentStatus = async (id, status) => {
  let orders;
  try {
    if(db === null) {
      const conn = await mongoClient.connect(mongodbUrl,  { useNewUrlParser: true });
      db = conn.db('app');
      orders = db.collection('orders');
    }
    else {
      orders = db.collection('orders');
    }
    const result = await orders.findOneAndUpdate({_id: mongodb.ObjectID(id)}, {$set : {paymentStatus: status}}, { returnOriginal: false });
    return result;
  }
  catch(err) {
    throw new Error(err);
  }
}

exports.getOrderById = async (id) => {
  let orders;
  try {
    if(db === null) {
      const conn = await mongoClient.connect(mongodbUrl,  { useNewUrlParser: true });
      db = conn.db('app');
      orders = db.collection('orders');
    }
    else {
      orders = db.collection('orders');
    }
    const result = await orders.findOne({_id: mongodb.ObjectID(id)});
    return result
  }
  catch(err) {
    throw new Error(err);
  }
}