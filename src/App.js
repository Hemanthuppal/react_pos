import React from "react";
import { BrowserRouter as Router, Route, Routes,  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Category from "./Components/Pages/Admin/Category/Category";
import ChangePasword from "./Components/Pages/Admin/ChangePassword/ChangePasword";
import Dashboard from "./Components/Pages/Admin/Dashboard/Dashboard";
import OrderList from "./Components/Pages/Admin/OrderList/OrderList";
import POS from "./Components/Pages/Admin/POS/POS";
import AddProduct from "./Components/Pages/Admin/Product/AddProduct";
import ProductList from "./Components/Pages/Admin/Product/ProductList";
import Registration from "./Components/Pages/Admin/Registration/Registration";
import Tax from "./Components/Pages/Admin/TAX(SGST-CGST)/Tax";
import UserChangePassword from './Components/Pages/Users/ChangePassword/ChangePassword'
import UserOrderlist from "./Components/Pages/Users/Orderlist/Orderlist";
import UserPOS from "./Components/Pages/Users/POS/POS"
import Login from "./Components/Pages/Login/Login";






function App() {
    return (
        <Router>
            <div>
            
                <Routes>
                    <Route path="/Category" exact element={<Category/>} />
                    <Route path="/adminChangepassword" exact element={<ChangePasword/>}/>
                    <Route path="/dashboard" exact element={<Dashboard/>}/>
                    <Route path="/adminorder" exact element={<OrderList/>}/>
                    <Route path="/adminpos" exact element={<POS/>}/>
                    <Route path="/addproduct" exact element={<AddProduct/>}/>
                    <Route path="/productlist" exact element={<ProductList/>}/>
                    <Route path="/registration" exact element={<Registration/>}/>
                    <Route path="/tax" exact element={<Tax/>}/>
                    <Route path="/userchangepassword" exact element={<UserChangePassword/>}/>
                    <Route path="/userorderlist" exact element={<UserOrderlist/>}/>
                    <Route path="/userpos" exact element={<UserPOS/>}/>
                    <Route path="/" exact element={<Login/>}/>
                </Routes>
        
            </div>
        </Router>
    );
}

export default App;
