// import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { TooltipProvider } from "@radix-ui/react-tooltip";
import AppIndex from "./routes/AppIndex";
import AppNavigation from "./routes/AppNavigation";

function App() {
  return (
    <div>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        {/* <TooltipProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
        <AppNavigation />
        {/* </TooltipProvider> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
