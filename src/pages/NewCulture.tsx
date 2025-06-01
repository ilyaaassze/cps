
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
 import axios from "axios";


// Mock data for categories and crops
const categories = [
  { id: "1", name: "Légumes" },
  { id: "2", name: "Céréales" },
  { id: "3", name: "Fruits" },
];

const cropsByCategory = {
  "1": [
    { id: "1", name: "Pomme de terre" },
    { id: "2", name: "Tomate" },
    { id: "3", name: "Oignon" },
    { id: "4", name: "Carotte" },
    { id: "5", name: "Salade" },
  ],
  "2": [
    { id: "6", name: "Blé" },
    { id: "7", name: "Maïs" },
    { id: "8", name: "Orge" },
    { id: "9", name: "Avoine" },
  ],
  "3": [
    { id: "10", name: "Pomme" },
    { id: "11", name: "Poire" },
    { id: "12", name: "Fraise" },
    { id: "13", name: "Framboise" },
  ],
};

const soilTypes = [
  { id: "1", name: "Argileux" },
  { id: "2", name: "Limoneux" },
  { id: "3", name: "Sableux" },
  { id: "4", name: "Argilo-limoneux" },
  { id: "5", name: "Limono-sableux" },
];


const NewCulture = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [variety, setVariety] = useState("");
  const [plantingDate, setPlantingDate] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [area, setArea] = useState("");
  const [soilType, setSoilType] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //console.log('Token envoyé:', token);

      const categoryName = categories.find(cat => cat.id === selectedCategory)?.name || "";
      const soilTypeName = soilTypes.find(soil => soil.id === soilType)?.name || "";

      const token = localStorage.getItem('terreproToken');
      await axios.post('http://localhost:8000/api/cultures', {
        nom_culture: selectedCrop,
        nom_categorie: categoryName,
        variete: variety,
        type_sol: soilTypeName,
        date_semis: plantingDate,
        date_recolte: harvestDate,
        superficie: area,
        notes: notes
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Culture ajoutée avec succès!');
      navigate('/cultures');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la culture:', error);
      toast.error('Erreur lors de l\'ajout de la culture');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header
        title="Nouvelle culture"
        subtitle="Ajoutez une nouvelle culture à votre exploitation"
      />

      <Card className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Informations de base</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value);
                    setSelectedCrop("");
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Sélectionnez une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="crop">Culture</Label>
                <Select
                  value={selectedCrop}
                  onValueChange={setSelectedCrop}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger id="crop">
                    <SelectValue placeholder="Sélectionnez une culture" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory && cropsByCategory[selectedCategory]?.map((crop) => (
                      <SelectItem key={crop.id} value={crop.name}>
                        {crop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="variety">Variété</Label>
                <Input
                  id="variety"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="Ex: Bintje, Roma..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soil">Type de sol</Label>
                <Select
                  value={soilType}
                  onValueChange={setSoilType}
                >
                  <SelectTrigger id="soil">
                    <SelectValue placeholder="Sélectionnez un type de sol" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil.id} value={soil.id}>
                        {soil.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plantingDate">Date de semis/plantation prévue</Label>
                <Input
                  id="plantingDate"
                  type="date"
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="harvestDate">Date de récolte prévue</Label>
                <Input
                  id="harvestDate"
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Superficie (hectares)</Label>
                <Input
                  id="area"
                  type="number"
                  step="0.01"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Ex: 2.5"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes additionnelles</Label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Plan de fertilisation, conditions climatiques prévues, etc."
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/cultures")}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-terre-green-600 hover:bg-terre-green-700"
              disabled={!selectedCategory || !selectedCrop || !plantingDate || !area || isLoading}
            >
              {isLoading ? "Chargement..." : "Enregistrer"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};


export default NewCulture;
