import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyPassword = () => {
  const { id, token } = useParams();
  console.log(id, token);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyAccount = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/auth/verify/${id}/${token}`);
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          setLoading(false);
          return;
        }
        setLoading(false);
        navigate("/sign-in");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    verifyAccount();
  }, []);
  return <>{loading && <div>Verifying...</div>}</>;
};

export default VerifyPassword;
