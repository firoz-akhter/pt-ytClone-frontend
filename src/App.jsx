import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import PlayingVideo from "./components/PlayingVideo";
import { useAuth } from "./context/AuthProvider";
import Loading from "./loader/Loading";
import Login from "./components/Login";
import RegisterPage from "./components/RegisterPage";
import { setAuthenticate, storeUser } from "./utils/Redux/userSlice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseApiUrl } from "./BaseURL";
import ProfilePage from "./Pages/User/UserDashboard";

function App() {
  const dispatch = useDispatch();
  const { loading } = useAuth();
  const user = useSelector((state) => state.user.items);
  console.log(user)
  const isAuthenticated = useSelector((state) => state.user.authenticate);
  // Fetch user data when the app loads or login changes
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (isAuthenticated) {
          const response = await axios.get(
            `${baseApiUrl}/api/v1/user/getUserProfile`,
            {
              withCredentials: true,
              headers: { "Content-Type": "*" },
            }
          );
          dispatch(storeUser(response?.data)); // Store user data in Redux
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        dispatch(setAuthenticate(false)); // Set authentication to false on error
      }
    };

    fetchUserData(); // Fetch user data on first load
  }, [isAuthenticated, dispatch]);
  return (
    <div>
      {loading && <Loading />}
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/search/:searchQuery" element={<Search />} />
        <Route path="/video/:id" element={<PlayingVideo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
