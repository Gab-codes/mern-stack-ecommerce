require("dotenv").config();
const axios = require("axios");

// Paystack configuration
const paystack = axios.create({
  baseURL: "https://api.paystack.co",
  headers: {
    Authorization: "Bearer sk_test_f5264db1ae744e6f4d96e19bc72a8abd8a079b3e",
    "Content-Type": "application/json",
  },
});

module.exports = paystack;
