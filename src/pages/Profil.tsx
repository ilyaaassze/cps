import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import axios from "axios";

const Profil = () => {
  const navigate = useNavigate();

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Charger profil utilisateur connecté
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("terreproToken");
        if (!token) {
          toast.error("Utilisateur non connecté");
          navigate("/login");
          return;
        }
        const res = await axios.get("http://localhost:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = res.data;
        setNom(user.nom);
        setPrenom(user.prenom);
        setEmail(user.email);
        setTelephone(user.telephone);
      } catch (error) {
        toast.error("Erreur lors du chargement du profil");
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const token = localStorage.getItem("terreproToken");
      await axios.put(
        "http://localhost:8000/api/user", // <-- pas d'id dans l'URL
        {
          nom,
          prenom,
          email,
          telephone,
          password: password || undefined,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Profil mis à jour avec succès !");
      navigate("/profil");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errs = error.response.data.errors;
        for (const key in errs) {
          if (errs.hasOwnProperty(key)) {
            toast.error(`${key} : ${errs[key][0]}`);
          }
        }
      } else {
        toast.error("Erreur lors de la mise à jour");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title="Modifier mon profil" subtitle="Mettez à jour vos informations personnelles" />

      <Card className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                  placeholder="Votre nom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  required
                  placeholder="Votre prénom"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Adresse mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="exemple@domaine.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input
                  id="telephone"
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                  placeholder="0601020304"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="password">Mot de passe (laisser vide pour ne pas changer)</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nouveau mot de passe"
                  minLength={8}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Chargement..." : "Mettre à jour"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
};

export default Profil;
