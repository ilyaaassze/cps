import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Header } from "@/components/layout/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface Operation {
  id: number;
  type_operation: string;
  date_operation: string;
  culture_name: string;
  produit_utilise: string;
  dose: number | string;
  unite: string;
  cout?: string;
}

const Operations = () => {
  const [operations, setOperations] = useState<Operation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const token = localStorage.getItem("terreproToken");
        const response = await axios.get("http://localhost:8000/api/operations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOperations(response.data);
      } catch (error) {
        toast.error("Erreur lors du chargement des opérations.");
        console.error(error);
      }
    };

    fetchOperations();
  }, []);

  const getOperationTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      "Fertilisation": "bg-terre-green-50 border-terre-green-200 text-terre-green-700",
      "Traitement": "bg-blue-50 border-blue-200 text-blue-700",
      "Irrigation": "bg-cyan-50 border-cyan-200 text-cyan-700",
      "Désherbage": "bg-purple-50 border-purple-200 text-purple-700",
      "Récolte": "bg-amber-50 border-amber-200 text-amber-700",
    };
    return colors[type] || "bg-gray-50 border-gray-200 text-gray-700";
  };

  return (
    <>
      <Header
        title="Opérations & Intrants"
        subtitle="Gérez les opérations effectuées sur vos cultures"
        showAddButton
        addButtonText="Nouvelle opération"
        addButtonLink="/operations/new"
      />

      <Card>
        <CardHeader>
          <CardTitle>Liste des opérations</CardTitle>
        </CardHeader>
        <CardContent>
          {operations.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucune opération enregistrée.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Culture</TableHead>
                  <TableHead>Produit</TableHead>
                  <TableHead>Quantité</TableHead>
                  <TableHead>Coût</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {operations.map((operation) => (
                  <TableRow key={operation.id}>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getOperationTypeColor(operation.type_operation)}
                      >
                        {operation.type_operation}
                      </Badge>
                    </TableCell>
                    <TableCell>{operation.date_operation}</TableCell>
                    <TableCell>{operation.culture_name || "Culture inconnue"}</TableCell>
                    <TableCell>{operation.produit_utilise || "—"}</TableCell>
                    <TableCell>
                      {operation.dose} {operation.unite}
                    </TableCell>
                    <TableCell>{operation.cout || "—"}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/operations/${operation.id}`)}
                      >
                        Détails
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Operations;
