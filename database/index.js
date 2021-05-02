const mongoose = require('mongoose');
const url = "mongodb+srv://ibrahim:Laha8876@youtubedizlayicisi.yvbsa.mongodb.net/dız?retryWrites=true&w=majority";

module.exports = async () => {
  return await mongoose.connect(url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  });
}