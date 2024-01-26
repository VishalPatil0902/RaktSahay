import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// // import BottomNav from "./components/bottomNav";
// import Splash from "./screens/splash";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import NewProfile from "./screens/newProfile/newProfile";
import Profile from "./screens/Profile/Profile";
import BottomNav from "./components/bottomNav";
import Wrapper from "./components/Wrapper";
import RedirectionPage from "./Global/redirection";
import Splash from "./screens/Splash/splash";
import DonateBlood from "./screens/DonateBlood/DonateBlood";
import RequestBlood from "./screens/RequestBlood/RequestBlood";
import PastRequests from "./screens/RequestBlood/PastRequests";
import ChatBot from "./screens/ChatBot/Chatbot";

function App() {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/donate" element={<DonateBlood />} />
          <Route path={"/login"} exact element={<Login />} />
          <Route path={"/"} exact element={<ChatBot />} />
          <Route path="/new-profile" exact element={<NewProfile />} />
          <Route path="/user-profile" exact element={<Profile />} />
          <Route path="/request" exact element={<RequestBlood />} />
          <Route path="/past-requests" exact element={<PastRequests />} />

          <Route path="/" exact element={<Splash />} />

          {/* <Route path="/login-screen" exact component={LoginScreen} /> */}
          <Route component={BottomNav}>
            {/* <Route path="/home" exact component={HomePage} /> */}
            {/* <Route path="/find-donor" exact component={FindDonorPage} /> */}
            {/* <Route path="/request-donor" exact component={RequestDonorPage} /> */}
          </Route>
          <Route
            path="/redirection/:accessToken"
            element={<RedirectionPage />}
          /> 
        </Routes>
      </Wrapper>
      <BottomNav />
    </Router>
  );
}

export default App;
