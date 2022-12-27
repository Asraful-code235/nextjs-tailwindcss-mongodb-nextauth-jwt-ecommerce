import User from '../../models/User';
import data from '../../utils/data';
import db from '../../utils/db';

// use this route /api/seed to populate the database with products and first admin and user

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};
export default handler;
