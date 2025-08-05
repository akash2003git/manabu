import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function PaymentFailed() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");

  useEffect(() => {
    console.error("Payment failed for course:", courseId);
  }, [courseId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center mx-5">
      <h1 className="text-3xl font-bold text-red-500 mb-4">Payment Failed</h1>
      <p className="text-txt mb-6">
        Your payment could not be processed. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="cursor-pointer px-6 py-2 bg-accent text-white rounded-lg hover:bg-secondary"
        >
          Try Again
        </button>
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default PaymentFailed;
