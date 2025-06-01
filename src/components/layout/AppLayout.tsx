
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideNavigation } from "./SideNavigation";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";

export function AppLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("terreproUser");
    
    if (!user) {
      toast.error("Veuillez vous connecter pour accéder à cette page");
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, [location, navigate]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SideNavigation />
        <main className="flex-1 overflow-y-auto">
          <div className="terre-container">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
