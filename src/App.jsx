import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import Header from "./Components/Header";
import { EstateState } from "./context/EstateProvider";
import CreateList from "./Pages/CreateList";
import Listing from "./Pages/Listing";
import Search from "./Pages/Search";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";
import VerifyPassword from "./Pages/VerifyPassword";
// import UpdateList from "./Pages/UpdateList";

function App() {
  const { user } = EstateState();

  return (
    <>
      {user && <Header data={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/create-listing" element={<CreateList />} />
        <Route exact path="/update-listing/:id" element={<CreateList />} />
        <Route exact path="/listing/:id" element={<Listing />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route
          exact
          path="/reset-password/:id/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/verify/:id/:token" element={<VerifyPassword />} />
      </Routes>
    </>
  );
}

export default App;
