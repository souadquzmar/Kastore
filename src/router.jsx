import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import ForgetPassword from "./pages/forget-password/ForgetPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";
import ProductDetails from "./components/products/ProductDetails";
import ProtectedRouter from "./components/protected/ProtectedRouter";
import Checkout from "./pages/checkout/Checkout";
import Profile from "./pages/profile/Profile";
import ProfileLayout from "./layout/ProfileLayout";
import Orders from "./pages/profile/Orders";
import Info from "./pages/profile/Info";
import Products from "./pages/products/Products";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/cart',
                element:
                    <ProtectedRouter>
                        <Cart />
                    </ProtectedRouter>
            }, {
                path: '/forgetPassword',
                element: <ForgetPassword />
            }, {
                path: '/resetPassword',
                element: <ResetPassword />
            }, {
                path: '/productDetails/:id',
                element: <ProductDetails />
            }, {
                path: '/checkout',
                element:
                    <ProtectedRouter>
                        <Checkout />
                    </ProtectedRouter>

            },{
                path:'/products/:page',
                element:<Products />
            }
        ]
    }, {
        path:'/profile',
        element:
         <ProtectedRouter>
            <ProfileLayout/>
         </ProtectedRouter>,
         children:[
           {
                index: true,
                element: <Info/>
            },{
                path:'orders',
                element:<Orders/>
            }
         ]
    }
]);

export default router