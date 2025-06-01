
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Database, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  description,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description: string;
  color: string;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-4 w-4 ${color}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header 
        title="Tableau de bord" 
        subtitle="Bienvenue sur TerrePro" 
        showAddButton 
        addButtonText="Nouvelle culture" 
        addButtonLink="/cultures/new" 
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Cultures actives"
          value="3"
          icon={Database}
          description="Cultures en cours de production"
          color="text-terre-green-600"
        />
        <DashboardCard
          title="Opérations planifiées"
          value="7"
          icon={Calendar}
          description="Prévues pour les 7 prochains jours"
          color="text-terre-brown-600"
        />
        <DashboardCard
          title="Coûts totaux"
          value="2 540 €"
          icon={BarChart}
          description="Coûts d'exploitation pour l'année"
          color="text-red-500"
        />
        <DashboardCard
          title="Revenu estimé"
          value="4 800 €"
          icon={PieChart}
          description="Basé sur les prix de marché actuels"
          color="text-blue-500"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Cultures récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-terre-brown-100 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-terre-green-600"></div>
                  <div>
                    <p className="font-medium">Pomme de terre</p>
                    <p className="text-xs text-muted-foreground">
                      Plantée le 15/03/2025
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/cultures/1")}
                >
                  Voir
                </Button>
              </div>
              <div className="flex items-center justify-between border-b border-terre-brown-100 pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-terre-green-700"></div>
                  <div>
                    <p className="font-medium">Tomates</p>
                    <p className="text-xs text-muted-foreground">
                      Plantée le 05/04/2025
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/cultures/2")}
                >
                  Voir
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-terre-green-500"></div>
                  <div>
                    <p className="font-medium">Oignons</p>
                    <p className="text-xs text-muted-foreground">
                      Plantés le 10/04/2025
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/cultures/3")}
                >
                  Voir
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Opérations à venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-terre-brown-100 pb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-terre-brown-100 p-1.5 rounded-full">
                    <Calendar className="h-4 w-4 text-terre-brown-500" />
                  </div>
                  <div>
                    <p className="font-medium">Fertilisation</p>
                    <p className="text-xs text-muted-foreground">
                      Pommes de terre - 30/04/2025
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/operations/new")}
                >
                  Noter
                </Button>
              </div>
              <div className="flex items-center justify-between border-b border-terre-brown-100 pb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-terre-brown-100 p-1.5 rounded-full">
                    <Calendar className="h-4 w-4 text-terre-brown-500" />
                  </div>
                  <div>
                    <p className="font-medium">Traitement</p>
                    <p className="text-xs text-muted-foreground">
                      Tomates - 03/05/2025
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/operations/new")}
                >
                  Noter
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-terre-brown-100 p-1.5 rounded-full">
                    <Calendar className="h-4 w-4 text-terre-brown-500" />
                  </div>
                  <div>
                    <p className="font-medium">Irrigation</p>
                    <p className="text-xs text-muted-foreground">
                      Oignons - 05/05/2025
                    </p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/operations/new")}
                >
                  Noter
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="my-6">
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button
              className="bg-terre-green-600 hover:bg-terre-green-700 text-white"
              onClick={() => navigate("/cultures/new")}
            >
              Ajouter une culture
            </Button>
            <Button
              variant="outline"
              className="border-terre-green-200 text-terre-green-700"
              onClick={() => navigate("/operations/new")}
            >
              Noter une opération
            </Button>
            <Button
              variant="outline"
              className="border-terre-brown-200 text-terre-brown-700"
              onClick={() => navigate("/cultures")}
            >
              Voir toutes les cultures
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
