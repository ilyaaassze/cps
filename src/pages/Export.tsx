import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import axios from "axios";

interface Culture {
  id: number;
  nom_culture: string;
}

const Export = () => {
  const [cultures, setCultures] = useState<Culture[]>([]);
  const [typeFichier, setTypeFichier] = useState<string>("");
  const [cultureId, setCultureId] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const token = localStorage.getItem("terreproToken");

  useEffect(() => {
    if (!token) {
      toast.error("Utilisateur non authentifié");
      return;
    }
    const fetchCultures = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cultures", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCultures(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des cultures:", error);
        toast.error("Impossible de charger les cultures");
      }
    };

    fetchCultures();
  }, [token]);

  const handleExport = async () => {
    if (!typeFichier) {
      toast.error("Veuillez sélectionner un format d'export");
      return;
    }

    if (!cultureId) {
      toast.error("Veuillez sélectionner une culture");
      return;
    }

    if (!token) {
      toast.error("Utilisateur non authentifié");
      return;
    }

    setIsExporting(true);

    try {
      // Correction importante : l'URL doit inclure la cultureId dynamique
      const response = await axios.post(
        `http://localhost:8000/api/cultures/${cultureId}/exports`,
        { type_fichier: typeFichier },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // pour récupérer le fichier binaire
        }
      );

      // Récupération du nom de fichier dans les headers Content-Disposition (si présent)
      const disposition = response.headers["content-disposition"];
      let filename = `export.${typeFichier === "excel" ? "xlsx" : typeFichier === "csv" ? "csv" : "pdf"}`;

      if (disposition) {
        const match = disposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) filename = match[1];
      }

      // Création et déclenchement du téléchargement
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("Fichier exporté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'export :", error);
      toast.error("Erreur lors de l'exportation");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Header
        title="Exporter les opérations financières"
        subtitle="Générez un fichier PDF, CSV ou Excel des opérations financières pour une culture spécifique"
      />

      <Card className="max-w-xl mx-auto mt-6">
        <CardHeader>
          <CardTitle>Choisissez la culture et le format d'export</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="culture_id">Culture</Label>
            <Select
              value={cultureId !== null ? String(cultureId) : ""}
              onValueChange={(value) => setCultureId(Number(value))}
            >
              <SelectTrigger id="culture_id" aria-label="Sélection de la culture">
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
            <Label htmlFor="type_fichier">Format</Label>
            <Select
              value={typeFichier}
              onValueChange={(value) => setTypeFichier(value)}
            >
              <SelectTrigger id="type_fichier" aria-label="Sélection du format d'export">
                <SelectValue placeholder="Sélectionnez un format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            onClick={handleExport}
            disabled={!typeFichier || !cultureId || isExporting}
            className="bg-terre-green-600 hover:bg-terre-green-700"
          >
            {isExporting ? "Export en cours..." : "Exporter"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Export;
