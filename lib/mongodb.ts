import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://sayantan:dexterisgood@cluster0.3mnn8.mongodb.net/';
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;