import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Cultures = () => {
  const navigate = useNavigate();
  const [cultures, setCultures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/cultures", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("terreproToken")}`,  // stocke ton token quelque part (localStorage, etc.)
      },
    })
    .then((response) => {
      setCultures(response.data);
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des cultures :", error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <>
      <Header 
        title="Mes cultures" 
        subtitle="Gérez vos cultures et parcelles" 
        showAddButton 
        addButtonText="Nouvelle culture" 
        addButtonLink="/cultures/new" 
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cultures.map((culture) => (
          <Card key={culture.id} className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{culture.nom_culture}</CardTitle>
                <Badge variant="outline">
                  {/* À adapter selon la logique de statut */}
                  En cours
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Variété:</span>
                  <span className="text-sm font-medium">{culture.variete}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Catégorie:</span>
                  <span className="text-sm font-medium">{culture.nom_categorie}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date de plantation:</span>
                  <span className="text-sm font-medium">{new Date(culture.date_semis).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date de récolte prévue:</span>
                  <span className="text-sm font-medium">{new Date(culture.date_recolte).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Superficie:</span>
                  <span className="text-sm font-medium">{culture.superficie} ha</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/cultures/${culture.id}`)}
              >
                Détails
              </Button>
              <Button 
                className="bg-terre-green-600 hover:bg-terre-green-700"
                onClick={() => navigate(`/operations/new?cultureId=${culture.id}`)}
              >
                Ajouter opération
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Cultures;
