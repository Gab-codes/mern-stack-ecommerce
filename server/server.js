const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");
const adminOrderRoute = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopcartRouter = require("./routes/shop/cart-routes");
const ShopAddresstRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");

//create a database connection.
mongoose.connect(
    'mongodb+srv://tianna_ecommerce:Password234@ecommerce-cluster0.i9zaj.mongodb.net/'
).then(()=> console.log('MongoDB Connected')).catch((error)=> console.log(error));

const app = express()
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin : "http://localhost:5173",
        methods : ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders : [
            "Content-Type",
            'Authorization',
            'Cache-control',
            'Expires',
            'Pragma'
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRoute);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopcartRouter);
app.use("/api/shop/address", ShopAddresstRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/common/feature", commonFeatureRouter);

app.listen(PORT, ()=> console.log(`Server is now running on port ${PORT}`));