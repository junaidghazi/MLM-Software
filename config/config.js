const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://junaidtechlife:V2HDCkOEa4zfcDFj@cluster0.yyw0u.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = {
    JWT_SECRET: "shshshsh",
    COOKIE_SECRET: "your-cookie-secret",
    PORT: 3000,
  };

//   mongodb+srv://junaidtechlife:V2HDCkOEa4zfcDFj@cluster0.yyw0u.mongodb.net/