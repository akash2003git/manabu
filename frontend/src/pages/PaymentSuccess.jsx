import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { userAtom } from "../store/store";
import { getMe } from "../api/userApi";

function PaymentSuccess() {
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Processing your payment...");
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom);

  useEffect(() => {
    const refreshUserData = async () => {
      try {
        const updatedUser = await getMe();
        setUser(updatedUser);
        setStatus("success");
        setMessage("Payment successful! Redirecting...");
        setTimeout(() => navigate("/my-courses"), 2000);
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Payment processed, but unable to refresh user data.");
      }
    };

    refreshUserData();
  }, [navigate, setUser]);

  return (
    <div className="flex flex-col items-center justify-center mt-[150px] mx-5 text-center">
      {status === "loading" && <p>Processing your payment...</p>}
      {status === "success" && <p className="text-green-500">{message}</p>}
      {status === "error" && <p className="text-red-500">{message}</p>}
    </div>
  );
}

export default PaymentSuccess;
