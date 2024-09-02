const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mlm-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


module.exports = {
    JWT_SECRET: "shshshsh",
    COOKIE_SECRET: "your-cookie-secret",
    PORT: 3000,
  };
