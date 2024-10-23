import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthLayout from './components/auth/layout';
import AuthLogin from './pages/auth/login';
import AuthRegister from './pages/auth/register';
import AdminLayout from './components/admin/layout';
import AdminDashboard from './pages/admin/dashboard';
import AdminOrders from './pages/admin/orders';
import AdminProducts from './pages/admin/products';
import AdminFeatures from './pages/admin/features';
import ShoppingLayout from './components/shop/layout';
import NotFound from './pages/not-found';
import ShopHome from './pages/shop/home';
import ShopListing from './pages/shop/listing';
import ShopCheckout from './pages/shop/checkout';
import ShopAccount from './pages/shop/account';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './pages/unauth-page/unauth-page';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from "@/components/ui/skeleton";
import PaystackConfirmationPage from './pages/shop/paystack-confirmation';
import SearchProducts from './pages/shop/search';
import SearchProducts from './pages/shop/search';




function App() {

  const {isAuthenticated, user, isLoading } = useSelector(state=> state.auth);
  const dispatch = useDispatch();
  
  useEffect(()=>{
      dispatch(checkAuth());
  }, [dispatch]);

  if(isLoading) return <Skeleton className="w-[600px] h-[600px] " />


  return (
    <div className="flex flex-col overflow-hidden bg-white">

      <Routes>
        <Route 
          path='/'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          } 
        />
        <Route 
          path='/home'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          } 
        />
        {/* Auth Routes */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="features" element={<AdminFeatures />} />
          
        </Route>

        {/* Shop Routes */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShopHome />} />
          <Route path="listing" element={<ShopListing />} />
          <Route path="checkout" element={<ShopCheckout />} />
          <Route path="account" element={<ShopAccount />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="paystack-return" element={ <PaystackConfirmationPage /> } />

        </Route>

        {/* Catch-all Route */}
        <Route path="*" element={<NotFound />} />
        <Route path='/unauth-page' element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
