
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showAddButton?: boolean;
  addButtonText?: string;
  addButtonLink?: string;
}

export function Header({
  title,
  subtitle,
  showAddButton = false,
  addButtonText = "Ajouter",
  addButtonLink = "/cultures/new",
}: HeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 border-b border-terre-brown-200 mb-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold text-terre-brown-800">{title}</h1>
          {subtitle && <p className="text-terre-brown-500">{subtitle}</p>}
        </div>
      </div>
      {showAddButton && (
        <Button 
          className="bg-terre-green-600 hover:bg-terre-green-700 text-white gap-2"
          onClick={() => navigate(addButtonLink)}
        >
          <Plus className="h-4 w-4" />
          {addButtonText}
        </Button>
      )}
    </div>
  );
}
