
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Cultures from "./pages/Cultures";
import NewCulture from "./pages/NewCulture";
import Operations from "./pages/Operations";
import NewOperation from "./pages/NewOperation";
import NotFound from "./pages/NotFound";
import NewOperationFinance from "./pages/NewOperationFinance" ;
import Recolte from "./pages/Recolte";
import Export from "./pages/Export";
import Profil from "./pages/Profil";



import { AppLayout } from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cultures" element={<Cultures />} />
            <Route path="/cultures/new" element={<NewCulture />} />
            <Route path="/operations" element={<Operations />} />
            <Route path="/operations/new" element={<NewOperation />} />
             <Route path="/finance" element={<NewOperationFinance />} />
            <Route path="/recoltes" element={<Recolte />} />
            <Route path="/exports" element={<Export />} />
            <Route path="/profil" element={<Profil />} />



          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
