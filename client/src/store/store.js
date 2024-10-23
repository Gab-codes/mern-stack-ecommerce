import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import  adminProductsSlice  from "./admin/products-slice";
import  shopProductsSlice  from "./shop/products-slice/";
import  shopCartSlice  from "./shop/cart-slice/";
import commonFeatureSlice from "./common-slice";
import shopAddressSlice from "./shop/address-slice";
import shopOrderSlice from "./shop/order-slice";
import shopSearchSlice from "./shop/search-slice";
import shopReviewSlice from "./shop/review-slice";
import adminOrderSlice from "./admin/order-slice";




const store = configureStore({
    reducer : {
       auth : authReducer,
       
       adminOrder: adminOrderSlice,
       adminProducts: adminProductsSlice,

       shopProducts: shopProductsSlice,
       shopCart: shopCartSlice,
       commonFeature: commonFeatureSlice,
       shopAddress: shopAddressSlice,
       shopOrder: shopOrderSlice,
       shopSearch: shopSearchSlice,
       shopReview: shopReviewSlice,
    },
});

export default store;