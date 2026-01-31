import LoginStub from "./__login_stub__";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import OmegaFederation from "./pages/OmegaFederation";
import AdvancedFeatures from "./pages/AdvancedFeatures";
import GlobalWallboard from "./pages/GlobalWallboard";
import SentryDashboard from "./pages/SentryDashboard";
import SovereignOS from "./pages/SovereignOS";
import ComparisonAnalysis from "./pages/ComparisonAnalysis";
import Sanctuary from "./pages/Sanctuary";
import Dominion from "./pages/Dominion";

function Router() {
  return (
    <Switch>
      <Route path={"/login"} component={LoginStub} />
      <Route path={"/"} component={Landing} />
      <Route path={"/overview"} component={Home} />
      <Route path={"/omega-federation"} component={OmegaFederation} />
      <Route path={"/advanced-features"} component={AdvancedFeatures} />
      <Route path={"/global-wallboard"} component={GlobalWallboard} />
      <Route path={"/sentry-dashboard"} component={SentryDashboard} />
      <Route path={"/sovereign-os"} component={SovereignOS} />
      <Route path={"/comparison-analysis"} component={ComparisonAnalysis} />
      <Route path={"/sanctuary"} component={Sanctuary} />
      <Route path={"/dominion"} component={Dominion} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
