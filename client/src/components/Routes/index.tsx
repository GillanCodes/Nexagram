import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Auth from "../Auth/Auth";

export default function index()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} Component={Home} />
                <Route path={"/auth"} Component={Auth} />
            </Routes>
        </BrowserRouter>
    ) 
}