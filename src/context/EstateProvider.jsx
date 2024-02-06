import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const EstateContext = createContext();

// eslint-disable-next-line react/prop-types
const EstateProvider = ({ children }) => {
  const [user, setUser] = useState();
  // const navigate = useNavigate();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("loggedInUser")));
  }, []);

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
