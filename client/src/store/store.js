import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import  adminProductsSlice  from "./admin/products-slice";
import  shopProductsSlice  from "./shop/products-slice/";
import  shopCartSlice  from "./shop/cart-slice/";
import commonFeatureSlice from "./common-slice";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import adminOrderSlice from "./admin/order-slice";




const store = configureStore({
    reducer : {
       auth : authReducer,
       
       adminProducts: adminProductsSlice,
       shopProducts: shopProductsSlice,
       shopCart: shopCartSlice,
       commonFeature: commonFeatureSlice,
       shopAddress: shopAddressSlice,
       shopOrder: shopOrderSlice,
       adminOrder: adminOrderSlice,
    },
});

export default store;