import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

function PaymentSuccess() {
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        setStatus("error");
        setMessage("Missing session ID.");
        return;
      }

      try {
        const { data } = await api.get(
          `/api/payment/verify-session?sessionId=${sessionId}`,
        );
        if (data.success) {
          setStatus("success");
          setMessage("Payment successful! Redirecting...");
          setTimeout(() => navigate("/my-courses"), 2000);
        } else {
          setStatus("failed");
          setMessage("Payment failed or not completed.");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage("Error verifying payment.");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-[150px] mx-5 text-center">
      {status === "verifying" && <p>Verifying your payment...</p>}
      {status !== "verifying" && (
        <p className={status === "success" ? "text-green-500" : "text-red-500"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default PaymentSuccess;
