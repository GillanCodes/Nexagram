import { useEffect, useState } from "react";
import Routes from "./components/Routes";
import "./styles/index.scss";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getUsers } from "./actions/users.action";
import { getUser } from "./actions/user.action";

function App() {

  const [UId, setUId] = useState(null);
  const dispatch:any = useDispatch();

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
    }

  }, [UId, dispatch])

  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;