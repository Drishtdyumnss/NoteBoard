const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`MONGODB CONNECTED WITH THE cluster`);
  } catch (err) {
    console.log(`This is Error: ${err.message}`);
  }
};

module.exports = connectDB;
