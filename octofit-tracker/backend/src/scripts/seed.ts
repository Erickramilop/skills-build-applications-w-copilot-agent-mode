import connectToDatabase from '../config/database';

const seedDatabase = async () => {
  await connectToDatabase();
  console.log('Seed script ready');
};

seedDatabase().catch((error) => {
  console.error(error);
  process.exit(1);
});
