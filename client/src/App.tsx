import LoginStub from "./__login_stub__";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
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

import { __LoginStub__ } from "./__login_stub__";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/login"} component={LoginStub} />
      <Route path={"/login"} component={__LoginStub__} />
      <Route path={"/"} component={Landing} />
      <Route path={"/overview"} component={Home} />
      <Route path={"/omega-federation"} component={OmegaFederation} />
      <Route path={"/advanced-features"} component={AdvancedFeatures} />
      <Route path={"/global-wallboard"} component={GlobalWallboard} />
      <Route path={"/sentry-dashboard"} component={SentryDashboard} />
      <Route path={"/sovereign-os"} component={SovereignOS} />
      <Route path={"/comparison-analysis"} component={ComparisonAnalysis} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
