import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";
import axios from "axios";

interface Culture {
  id: number;
  nom_culture: string;
}

const NewRecolte = () => {
  const navigate = useNavigate();
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [formData, setFormData] = useState({
    culture_id: "",
    date_recolte: "",
    quantite: "",
    prix_vente: "",
    benefice: "",
    etat: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("terreproToken");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/cultures", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setCultures(response.data))
      .catch((error) => {
        console.error("Erreur lors du chargement des cultures:", error);
        toast.error("Impossible de charger les cultures");
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(
        `http://localhost:8000/api/cultures/${formData.culture_id}/recoltes`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Récolte enregistrée avec succès !");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title="Nouvelle Récolte" subtitle="Ajoutez une récolte pour une culture existante" />

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Informations sur la récolte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="culture_id">Culture</Label>
              <Select
                value={formData.culture_id}
                onValueChange={(val) => handleSelectChange("culture_id", val)}
              >
                <SelectTrigger id="culture_id">
                  <SelectValue placeholder="Sélectionnez une culture" />
                </SelectTrigger>
                <SelectContent>
                  {cultures.map((culture) => (
                    <SelectItem key={culture.id} value={String(culture.id)}>
                      {culture.nom_culture}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_recolte">Date de récolte</Label>
              <Input
                type="date"
                name="date_recolte"
                value={formData.date_recolte}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantite">Quantité (kg)</Label>
                <Input
                  type="number"
                  step="0.01"
                  name="quantite"
                  value={formData.quantite}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prix_vente">Prix de vente (€/kg)</Label>
                <Input
                  type="number"
                  step="0.01"
                  name="prix_vente"
                  value={formData.prix_vente}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefice">Bénéfice (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  name="benefice"
                  value={formData.benefice}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="etat">État</Label>
                <Input
                  type="text"
                  name="etat"
                  placeholder="Ex: vendue, stockée..."
                  value={formData.etat}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => navigate("/recoltes")}>
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-terre-green-600 hover:bg-terre-green-700"
              disabled={!formData.culture_id || !formData.date_recolte || isLoading}
            >
              {isLoading ? "Chargement..." : "Enregistrer"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default NewRecolte;
