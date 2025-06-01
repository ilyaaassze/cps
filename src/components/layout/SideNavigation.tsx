
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { 
  Calendar, 
  Settings, 
  LogOut, 
  Database, 
  BarChart, 
  User,
  Banknote,
   Wheat ,
    FileDown,
  Plus,
  
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

export function SideNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("terreproUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("terreproUser");
    toast.success("Déconnexion réussie");
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: BarChart,
    },
    {
      title: "Gestion des cultures",
      url: "/cultures",
      icon: Database,
    },
    {
      title: "Opérations & Intrants",
      url: "/operations",
      icon: Calendar,
    },
     {
      title: "Dépenses",
      url: "/finance",
      icon: Banknote,
    },
     {
      title: "Suivi",
      url: "/recoltes",
      icon: Wheat,
    },
     {
      title: "Export",
      url: "/exports",
      icon: FileDown,
    },
    {
      title: "Profil",
      url: "/profil",
      icon: User,
    },
   
  ];

  return (
    <Sidebar className="border-r border-terre-brown-200">
      <SidebarHeader className="py-6">
        <div className="flex items-center px-3">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-terre-green-600 p-1">
              <img
                src="/placeholder.svg"
                alt="TerrePro Logo"
                className="h-6 w-6"
              />
            </div>
            <h2 className="text-lg font-bold text-terre-green-600">TerrePro</h2>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={cn(
                        location.pathname === item.url ? "bg-terre-green-50 text-terre-green-700" : ""
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-terre-brown-200">
        {user && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-terre-green-100 flex items-center justify-center">
                <span className="text-terre-green-700 font-medium">
                  {user.name?.substring(0, 1) || "U"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2 text-terre-brown-600"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>Se déconnecter</span>
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
