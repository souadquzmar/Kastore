import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Cart from "./pages/cart/Cart";
import ForgetPassword from "./pages/forget-password/ForgetPassword";
import ResetPassword from "./pages/reset-password/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
        {
            index:true,
            element: <Home/>
        },
        {
            path:'/register',
            element:<Register/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/cart',
            element:<Cart/>
        },{
            path:'/forgetPassword',
            element:<ForgetPassword/>
        },{
            path:'/resetPassword',
            element:<ResetPassword/>
        },

    ]
  },
]);

export default router