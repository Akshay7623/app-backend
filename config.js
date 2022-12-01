const mongoose = require('mongoose');
const connection = mongoose.connect(
    "mongodb+srv://Akshay7623:Akki7623@cluster0.cikk4v6.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );