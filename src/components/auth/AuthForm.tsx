import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from "react-router-dom";

type AuthFormProps = {
  isLogin?: boolean;
};

export function AuthForm({ isLogin = true }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = isLogin ? "http://127.0.0.1:8000/api/login" : "http://127.0.0.1:8000/api/register";
      const payload = isLogin
        ? { email, password }
        : { email, password, password_confirmation: passwordConfirm, nom, prenom, telephone };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.message || "Erreur lors de la requête";
        toast.error(errorMsg);
        setIsLoading(false);
        return;
      }

      localStorage.setItem("terreproUser", JSON.stringify(data.user));
      localStorage.setItem("terreproToken", data.token);

      toast.success(isLogin ? "Connexion réussie" : "Compte créé avec succès");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? "Connexion" : "Créer un compte"}</CardTitle>
        <CardDescription>
          {isLogin
            ? "Saisissez vos identifiants pour accéder à votre compte"
            : "Inscrivez-vous pour créer un compte TerrePro"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isLogin && (
            <>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone</Label>
                <Input id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
              </div>
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="passwordConfirm">Confirmer le mot de passe</Label>
              <Input id="passwordConfirm" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full bg-terre-green-600 hover:bg-terre-green-700" disabled={isLoading}>
            {isLoading ? "Chargement..." : isLogin ? "Se connecter" : "Créer un compte"}
          </Button>
          <div className="text-sm text-center">
            {isLogin ? (
              <p>
                Pas encore de compte?{" "}
                <a href="/register" className="text-terre-green-700 hover:text-terre-green-600">
                  S'inscrire
                </a>
              </p>
            ) : (
              <p>
                Déjà un compte?{" "}
                <a href="/login" className="text-terre-green-700 hover:text-terre-green-600">
                  Se connecter
                </a>
              </p>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
