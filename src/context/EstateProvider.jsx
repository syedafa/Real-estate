import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EstateContext = createContext();

// eslint-disable-next-line react/prop-types
const EstateProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname);
  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem("loggedInUser")));
    const userInfo = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(userInfo);
    if (location.pathname === "/sign-up") {
      navigate("/sign-up");
    } else if (!userInfo) {
      navigate("/sign-in");
    }
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
