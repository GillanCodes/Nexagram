import { useEffect, useState } from "react";
import Routes from "./components/Routes";
import "./styles/index.scss";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getUsers } from "./actions/users.action";
import { getUser } from "./actions/user.action";
import { UIdContext } from "./App.context";
import { getAllPosts } from "./actions/posts.action";
import { useSelector } from "react-redux";
import { isEmpty } from "./Utils";

function App() {

  const [UId, setUId] = useState(null);
  const dispatch:any = useDispatch();

  const userData = useSelector((state:any) => state.userReducer);
  const [theme, setTheme] = useState('default-light');

  useEffect(() => {
    if (!isEmpty(userData))
      setTheme(userData.settings.theme);
  }, [userData]);

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "GET",
        withCredentials: true,
        url: `${process.env.REACT_APP_API_URL}/jwtid`
      }).then((res) => {
        setUId(res.data);
      }).catch((err) => {
        console.log(err);
      })
    }
    fetchToken();
    if (UId)
    {
      dispatch(getUser(UId));
      dispatch(getUsers());
      dispatch(getAllPosts());
    }

  }, [UId, dispatch])

  return (
    <>
      <UIdContext.Provider value={UId}>
        <div className={`App ${theme}`}>
          <Routes />
        </div>
      </UIdContext.Provider>
    </>
  );
}

export default App;