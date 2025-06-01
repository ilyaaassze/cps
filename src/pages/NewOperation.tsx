import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "@/components/ui/sonner";

import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// ... imports identiques ...
const operationTypes = [
  { id: "Fertilisation", name: "Fertilisation" },
  { id: "Traitement", name: "Traitement" },
  { id: "Irrigation", name: "Irrigation" },
  { id: "Désherbage", name: "Désherbage" },
  { id: "Récolte", name: "Récolte" },
];


const NewOperation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [cultures, setCultures] = useState([]);
  const [selectedCulture, setSelectedCulture] = useState(searchParams.get("cultureId") || "");
  const [operationType, setOperationType] = useState("");
  const [operationDate, setOperationDate] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg/ha");
  const [notes, setNotes] = useState("");
  const [technique, setTechnique] = useState("");
  const [equipement, setEquipement] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authtoken = localStorage.getItem("terreproToken");

  useEffect(() => {
    const fetchCultures = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cultures", {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        });
        setCultures(response.data);
      } catch (error) {
        console.error("Erreur de chargement des cultures :", error);
        toast.error("Impossible de charger les cultures.");
      }
    };

    fetchCultures();
  }, [authtoken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const operationData = {
      type_operation: operationType,
      date_operation: operationDate,
      produit_utilise: product,
      dose: quantity,
      unite: unit,
      technique: technique,
      equipement: equipement,
      remarques: notes,
    };

    try {
      await axios.post(
        `http://localhost:8000/api/cultures/${selectedCulture}/operations`,
        operationData,
        {
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        }
      );
      toast.success("Opération enregistrée avec succès !");
      navigate("/operations");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'enregistrement de l'opération.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header
        title="Nouvelle opération"
        subtitle="Enregistrez une opération effectuée sur une culture"
      />

      <Card className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Détails de l'opération</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="culture">Culture concernée</Label>
                <Select value={selectedCulture} onValueChange={setSelectedCulture}>
                  <SelectTrigger id="culture">
                    <SelectValue placeholder="Sélectionnez une culture" />
                  </SelectTrigger>
                  <SelectContent>
                    {cultures.map((culture: any) => (
                      <SelectItem key={culture.id} value={String(culture.id)}>
                        {culture.nom_culture}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="operationType">Type d'opération</Label>
                <Select value={operationType} onValueChange={setOperationType}>
                  <SelectTrigger id="operationType">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {operationTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="operationDate">Date de l'opération</Label>
                <Input
                  id="operationDate"
                  type="date"
                  value={operationDate}
                  onChange={(e) => setOperationDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="equipement">Équipement</Label>
                <Input
                  id="equipement"
                  value={equipement}
                  onChange={(e) => setEquipement(e.target.value)}
                  placeholder="Nom de l'équipement"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technique">Technique</Label>
                <textarea
                  id="technique"
                  value={technique}
                  onChange={(e) => setTechnique(e.target.value)}
                  placeholder="Technique utilisée"
                  className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Détails du produit utilisé</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Produit</Label>
                  <Input
                    id="product"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="Ex: NPK 15-15-15, Fongicide, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantité</Label>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.01"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Ex: 300"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unité</Label>
                    <Select value={unit} onValueChange={setUnit}>
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="kg/ha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg/ha">kg/ha</SelectItem>
                        <SelectItem value="L/ha">L/ha</SelectItem>
                        <SelectItem value="t/ha">t/ha</SelectItem>
                        <SelectItem value="mm">mm</SelectItem>
                        <SelectItem value="unité">unité</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Remarques</Label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Conditions climatiques, problèmes rencontrés, etc."
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/operations")}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-terre-green-600 hover:bg-terre-green-700"
              disabled={!selectedCulture || !operationType || !operationDate || isLoading}
            >
              {isLoading ? "Chargement..." : "Enregistrer"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default NewOperation;
