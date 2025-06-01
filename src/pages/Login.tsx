
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem("terreproUser");
    if (user) {
      // Redirect to dashboard if already logged in
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleDemoLogin = () => {
    // Create a mock user object and store in localStorage
    const demoUser = {
      id: "demo-user-123",
      name: "Utilisateur Demo",
      email: "demo@terrepro.fr",
      role: "farmer"
    };
    
    localStorage.setItem("terreproUser", JSON.stringify(demoUser));
    toast.success("Connexion avec le compte démo réussie");
    navigate("/dashboard");
  };

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
            La plateforme de gestion agricole
          </p>
        </div>
        <AuthForm isLogin />
        <div className="mt-6 text-center">
          <p className="text-terre-brown-600 mb-2">Essayez rapidement la plateforme :</p>
          <Button 
            onClick={handleDemoLogin}
            variant="outline" 
            className="w-full border-terre-green-600 text-terre-green-700 hover:bg-terre-green-50"
          >
            Connexion avec le compte démo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
