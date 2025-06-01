
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("terreproUser");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-terre-green-50 to-terre-green-100">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-terre-green-600 p-2">
              <img src="/placeholder.svg" alt="TerrePro Logo" className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-terre-green-700">TerrePro</h2>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="border-terre-green-600 text-terre-green-700"
              onClick={() => navigate("/login")}
            >
              Connexion
            </Button>
            <Button 
              className="bg-terre-green-600 hover:bg-terre-green-700"
              onClick={() => navigate("/register")}
            >
              S'inscrire
            </Button>
          </div>
        </header>

        <main className="mt-12 md:mt-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-terre-brown-800 mb-6">
              Gestion intelligente de vos cultures
            </h1>
            <p className="text-xl text-terre-brown-600 mb-8">
              Suivez vos intrants, opérations et rendements agricoles avec précision pour optimiser 
              votre exploitation et augmenter votre productivité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-terre-green-600 hover:bg-terre-green-700"
                onClick={() => navigate("/register")}
              >
                Démarrer gratuitement
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-terre-brown-300 text-terre-brown-700"
                onClick={() => navigate("/login")}
              >
                Explorer la démo
              </Button>
            </div>
          </div>

          <div className="mt-16 md:mt-24">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-terre-green-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-terre-green-600" />
                </div>
                <h3 className="text-xl font-bold text-terre-brown-800 mb-2">Suivi des cultures</h3>
                <p className="text-terre-brown-600">
                  Enregistrez et suivez toutes vos cultures, de la plantation à la récolte, avec des informations détaillées.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-terre-green-100 rounded-full flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-terre-green-600" />
                </div>
                <h3 className="text-xl font-bold text-terre-brown-800 mb-2">Gestion des intrants</h3>
                <p className="text-terre-brown-600">
                  Notez tous vos intrants pour optimiser leur utilisation et réduire vos coûts de production.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-terre-green-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart className="h-6 w-6 text-terre-green-600" />
                </div>
                <h3 className="text-xl font-bold text-terre-brown-800 mb-2">Analyses financières</h3>
                <p className="text-terre-brown-600">
                  Visualisez vos coûts et revenus pour mieux comprendre la rentabilité de chaque culture.
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-24 pt-8 border-t border-terre-green-200 text-center text-terre-brown-500 text-sm">
          <p>© 2025 TerrePro - Tous droits réservés</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

// Temporary components for the landing page
function Calendar(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function Database(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function BarChart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}
