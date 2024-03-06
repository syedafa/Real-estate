import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EstateContext = createContext();

// eslint-disable-next-line react/prop-types
const EstateProvider = ({ children }) => {
  const [user, setUser] = useState();
  // const [forgetPassword, setForgetPassword] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem("loggedInUser")));
    const user = () => {
      const userInfo = JSON.parse(localStorage.getItem("loggedInUser"));
      setUser(userInfo);
      if (location.pathname === "/sign-up") {
        return navigate("/sign-up");
      } else if (location.pathname === "/forget-password") {
        return navigate("/forget-password");
      } else if (location.pathname.includes("reset-password")) {
        console.log(location.pathname);
        return;
      } else if (!userInfo) {
        return navigate("/sign-in");
      }
    };
    user();
  }, [navigate]);

  return (
    <EstateContext.Provider value={{ user, setUser }}>
      {children}
    </EstateContext.Provider>
  );
};
export default EstateProvider;
export const EstateState = () => {
  return useContext(EstateContext);
};
