import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Auth from "../Auth/Auth";
import Navbar from "../Navbar";
import Profile from "../Profile/Profile";
import CreatePost from "../Post/CreatePost";
import Post from "../Post/Post";
import FollowFeed from "../Feed/FollowFeed";
import Discover from "../Discorver/Discover";
import Chat from "../Chat/Chat";
import ChatRoom from "../Chat/ChatRoom";

export default function index()
{
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path={"/"} Component={Home} />
                <Route path={"/auth"} Component={Auth} />
                <Route path="/post" Component={CreatePost} />
                <Route path="/feed" Component={FollowFeed} />
                <Route path="/discover" Component={Discover} />
                <Route path="/chat" Component={Chat} />
                <Route path="/chat/:id" Component={ChatRoom} />

                <Route path="/p/:id" Component={Post} />
                <Route path="/u/:username" Component={Profile} />
            </Routes>
        </BrowserRouter>
    ) 
}