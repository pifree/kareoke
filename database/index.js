const mongoose = require('mongoose');
const url = "mongodb+srv://pifree:SECTkl310htozFW4@youtubedizlayicisi.yvbsa.mongodb.net/dız?retryWrites=true&w=majority";

module.exports = async () => {
  return await mongoose.connect(url, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  });
}