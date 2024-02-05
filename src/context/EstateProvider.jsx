import { createContext, useContext, useState } from "react";

const EstateContext = createContext();

// eslint-disable-next-line react/prop-types
const EstateProvider = ({ children }) => {
  const [user, setUser] = useState();
  // const navigate=useNavigate()
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setUser(userInfo);
  //   if (!userInfo) {
  //     navigate("/");
  //   }
  // }, [navigate]);
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
