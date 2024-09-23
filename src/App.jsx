// import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { TooltipProvider } from "@radix-ui/react-tooltip";
import AppNavigation from "./routes/AppNavigation";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { init } from "./redux/actions/auth";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const initUser = useCallback(() => {
      dispatch(
        init(
          navigate,
          () => {
            navigate(`${location.pathname}${location.search}`);
          },
          () => {
            navigate("/login");
          }
        )
      );
    }, []);

    useEffect(() => {
      initUser();
    }, [initUser]);
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
