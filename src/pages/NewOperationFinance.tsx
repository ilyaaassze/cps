import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import axios from "axios";

// Imports identiques...

const NewOperationFinance = () => {
  const navigate = useNavigate();
  const [cultures, setCultures] = useState<any[]>([]);
  const [operations, setOperations] = useState<any[]>([]);
  const [selectedCulture, setSelectedCulture] = useState<string>("");
  const [selectedOperationId, setSelectedOperationId] = useState<string>("");
  const [productCost, setProductCost] = useState<string>("");
  const [laborCost, setLaborCost] = useState<string>("");
  const [equipmentCost, setEquipmentCost] = useState<string>("");
  const [otherCost, setOtherCost] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const totalCost = (
    parseFloat(productCost || "0") +
    parseFloat(laborCost || "0") +
    parseFloat(equipmentCost || "0") +
    parseFloat(otherCost || "0")
  ).toFixed(2);

  const authtoken = localStorage.getItem('terreproToken');

  // Récupère les cultures
  useEffect(() => {
    axios.get('http://localhost:8000/api/cultures', {
      headers: {
        'Authorization': `Bearer ${authtoken}`,
      }
    })
    .then((response) => {
      setCultures(response.data);
    })
    .catch(() => {
      toast.error("Erreur lors de la récupération des cultures.");
    });
  }, [authtoken]);

  // Récupère les opérations liées à la culture sélectionnée
  useEffect(() => {
    if (selectedCulture) {
      axios.get(`http://localhost:8000/api/cultures/${selectedCulture}/operations`, {
        headers: {
          'Authorization': `Bearer ${authtoken}`,
        }
      })
      .then((response) => {
        setOperations(response.data); // On suppose response.data est un tableau d'opérations
        setSelectedOperationId(""); // Reset de l'opération sélectionnée
      })
      .catch(() => {
        toast.error("Erreur lors de la récupération des opérations.");
      });
    } else {
      setOperations([]);
    }
  }, [selectedCulture, authtoken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const financeData = {
      cout_produit: productCost,
      cout_main_oeuvre: laborCost,
      cout_equipement: equipmentCost,
      autres_couts: otherCost,
    };

    axios.post(`http://localhost:8000/api/operations/${selectedOperationId}/finance`, financeData, {
      headers: {
        'Authorization': `Bearer ${authtoken}`,
      }
    })
    .then(() => {
      toast.success("Financement enregistré avec succès !");
      navigate("/dashboard");
    })
    .catch(() => {
      toast.error("Erreur lors de l'enregistrement du financement.");
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <>
      <Header title="Nouveau Dépense" subtitle="Enregistrez une dépense lié à une opération" />
      
      <Card className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Détails de dépense</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Coûts associés</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Culture */}
                <div className="space-y-2">
                  <Label htmlFor="culture">Culture</Label>
                 {/* Select Culture */}
         <Select
             value={selectedCulture}
             onValueChange={(val) => setSelectedCulture(val)}
          >
          <SelectTrigger id="culture">
          <SelectValue placeholder="Sélectionnez la culture" />
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

                {/* Opérations liées à la culture */}
                <div className="space-y-2">
                  <Label htmlFor="operation">Opération concernée</Label>
                 <Select
             value={selectedOperationId}
             onValueChange={(val) => setSelectedOperationId(val)}
          >
         <SelectTrigger id="operation">
           <SelectValue placeholder="Sélectionnez l'opération" />
          </SelectTrigger>
       <SelectContent>
        {operations.map((operation) => (
        <SelectItem key={operation.id} value={String(operation.id)}>
        {operation.type_operation}
         </SelectItem>
        ))}
        </SelectContent>
         </Select>
                </div>

                {/* Champs de coûts */}
                <div className="space-y-2">
                  <Label htmlFor="productCost">Coût du produit (€)</Label>
                  <Input
                    id="productCost"
                    type="number"
                    step="0.01"
                    value={productCost}
                    onChange={(e) => setProductCost(e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="laborCost">Coût de main d'œuvre (€)</Label>
                  <Input
                    id="laborCost"
                    type="number"
                    step="0.01"
                    value={laborCost}
                    onChange={(e) => setLaborCost(e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="equipmentCost">Coût d'équipement (€)</Label>
                  <Input
                    id="equipmentCost"
                    type="number"
                    step="0.01"
                    value={equipmentCost}
                    onChange={(e) => setEquipmentCost(e.target.value)}
                    placeholder="0.00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherCost">Autres coûts (€)</Label>
                  <Input
                    id="otherCost"
                    type="number"
                    step="0.01"
                    value={otherCost}
                    onChange={(e) => setOtherCost(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span className="font-medium">Coût total:</span>
                  <span className="font-bold">{totalCost} €</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => navigate("/finance")}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              className="bg-terre-green-600 hover:bg-terre-green-700" 
              disabled={!selectedOperationId || isLoading}
            >
              {isLoading ? "Chargement..." : "Enregistrer"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default NewOperationFinance;
