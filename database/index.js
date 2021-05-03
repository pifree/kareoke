const mongoose = require('mongoose');
const url = "mongodb+srv://Oblivion:gHzFVWnNlgLJx5Qv@jahardo.fuchd.mongodb.net/radio?retryWrites=true&w=majority";

module.exports = async () => {
  return await mongoose.connect(url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  });
}