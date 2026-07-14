import mongoose from 'mongoose';

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');
  return mongoose.connection;
};

export default connectToDatabase;
