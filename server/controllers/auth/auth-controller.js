const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Cart = require("../../models/Cart");

// register
const registerUser = async (req, res) => {
    const {userName, email, password} = req.body;

    try{

        const checkUser = await User.findOne({email});
        if(checkUser) return res.json({success: false, message: "User already exists with the same email!"});

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, 
            email,
            password: hashPassword,
        })

        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Account created successfully"
        })

    } catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Sorry, an error occured"
        });  
    }
};


// login
const loginUser = async (req, res) => {
    const { email, password, guestId } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.json({ success: false, message: "User does not exist! Please register" });
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.json({ success: false, message: "Incorrect password! Please try again" });
        }

        const token = jwt.sign(
            {
                id: checkUser._id,
                role: checkUser.role,
                email: checkUser.email,
                userName: checkUser.userName,
            },
            "CLIENT_SECRET_KEY",
            { expiresIn: "15d" }
        );

        let userCart;

        if (guestId) {
            const guestCart = await Cart.findOne({ guestId });
            if (guestCart) {
                userCart = await Cart.findOne({ userId: checkUser._id });
                if (!userCart) {
                    userCart = new Cart({ userId: checkUser._id, items: [] });
                }

                guestCart.items.forEach((guestItem) => {
                    const existingItemIndex = userCart.items.findIndex(
                        (item) => item.productId.toString() === guestItem.productId.toString()
                    );

                    if (existingItemIndex > -1) {
                        userCart.items[existingItemIndex].quantity += guestItem.quantity;
                    } else {
                        userCart.items.push(guestItem);
                    }
                });

                await userCart.save();
                await Cart.deleteOne({ guestId });
            }
        } else {
            userCart = await Cart.findOne({ userId: checkUser._id }) || new Cart({ userId: checkUser._id, items: [] });
        }

        // res.cookie("token", token, { httpOnly: true, secure: true }).json({
        //     success: true,
        //     message: "Logged in successfully",
        //     user: {
        //         email: checkUser.email,
        //         role: checkUser.role,
        //         id: checkUser._id,
        //         userName: checkUser.userName,
        //     },
        //     cart: userCart ? userCart.items : [],
        // });

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
            email: checkUser.email,
            role: checkUser.role,
            id: checkUser._id,
            userName: checkUser.userName,
            },
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Sorry, an error occurred"
        });
    }
};

  

// logout
const logoutUser = (req, res)=> {
    res.clearCookie("token").json({
        success: true,
        message: "Logged out successfully"
    });
}

// auth middleware 
// const authMiddleware = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token)
//     return res.status(401).json({
//       success: false,
//       message: "Unauthenticated user!",
//     });

//   try {
//     const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: "Unauthorised user!",
//     });
//   }
// };
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthenticated user!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};


module.exports = {registerUser, loginUser, logoutUser, authMiddleware}