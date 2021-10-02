const mongoose = require('mongoose');

module.exports = async () => {
  await mongoose.connect(process.env.DB_URL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  });
  return mongoose;
}
