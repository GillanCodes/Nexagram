import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Auth from "../Auth/Auth";
import Navbar from "../Navbar";
import Profile from "../Profile/Profile";

export default function index()
{
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={"/"} Component={Home} />
                <Route path={"/auth"} Component={Auth} />

                <Route path="/u/:username" Component={Profile} />
            </Routes>
        </BrowserRouter>
    ) 
}