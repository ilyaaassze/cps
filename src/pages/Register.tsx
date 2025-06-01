
import { AuthForm } from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("terreproUser");
    if (user) {
      // Redirect to dashboard if already logged in
      navigate("/dashboard");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-terre-green-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-terre-green-600 p-3">
              <img
                src="/placeholder.svg"
                alt="TerrePro Logo"
                className="h-8 w-8"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-terre-brown-800">TerrePro</h1>
          <p className="text-terre-brown-600 mt-2">
            Créez votre compte pour commencer
          </p>
        </div>
        <AuthForm isLogin={false} />
      </div>
    </div>
  );
};

export default Register;
