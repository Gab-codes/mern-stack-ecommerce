const paystack = require("../../helpers/paystack");
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
  try {
    const {
        userId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        reference,
        cartId,
        email
    } = req.body;

    
    const amountInKobo = totalAmount * 100;

    
    const paymentData = {
      email, 
      amount: amountInKobo, 
      currency: "NGN", 
      callback_url: "http://localhost:5173/shop/paystack-return", 
    };

    
    const response = await paystack.post("/transaction/initialize", paymentData);
    
    if (response.data.status) {
      const paymentURL = response.data.data.authorization_url;

      const newlyCreatedOrder = new Order({
        userId,
        cartId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        reference,
      });

      await newlyCreatedOrder.save();

      
      res.status(201).json({
        success: true,
        paymentURL,
        orderId: newlyCreatedOrder._id,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "Error while initializing Paystack payment",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

const capturePayment = async (req, res) => {
    try {
      const { reference, orderId } = req.body;
  
      
      let order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order can not be found",
        });
      }
  
      
      const response = await paystack.get(`/transaction/verify/${reference}`);
  
      if (response.data.status && response.data.data.status === "success") {
        
        order.paymentStatus = "paid";
        order.orderStatus = "confirmed";
        order.reference = reference;
  
        
        for (let item of order.cartItems) {
          let product = await Product.findById(item.productId);
          if (!product) {
            return res.status(404).json({
              success: false,
              message: `Product ${product.title} not found`,
            });
          }
          product.totalStock -= item.quantity;
          await product.save();
        }
  
        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId);
  
        await order.save();
  
        res.status(200).json({
          success: true,
          message: "Order confirmed",
          data: order,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Payment verification failed",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Some error occurred in server!",
      });
    }
  };
  

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
