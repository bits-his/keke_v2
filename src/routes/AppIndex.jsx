import { useState } from "react";
// import Sidebar from "../component/sidebar/Sidebar";
import AppNavigation from "./AppNavigation";


import { Link, NavLink, Outlet } from "react-router-dom";
import {

  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  // DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  // DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/auth";
import { sidebarModules } from "../pages/user-admin/modules";
// import DropdownLink from "../pages/UI/DropDownLink";


export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";
export default function AppIndex() {
    const user = useSelector((state) => state.auth.user);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logOut = () => {
      dispatch(logout(navigate));
    };

      const [activeDropdown, setActiveDropdown] = useState(null);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-yellow-400 md:block">
        <div className="flex h-full sticky top-0  flex-col gap-2">
          <div className="flex h-14 items-center sticky top-0  border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <img src="" className="h-6 w-6" />
              <h4 className="text-muted">Keke App</h4>
            </Link>
            {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button> */}
          </div>
          <div className="flex-1 sticky top-0 ">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
              {sidebarModules.map((module, index) => {
                // Check if the user has access to the module
                if (true) {
                  // If the module has a submenu
                  if (module.subMenu) {
                    return (
                      <DropdownMenu
                        key={index}
                        mainPath={module.route}
                        mainLabel={module.title}
                        icon={module.icon}
                        subPaths={
                          // Filter the submenu to only include items the user has access to
                          module.subMenu.filter(
                            (subItem) =>
                              user.functionalities &&
                              user.functionalities.includes(subItem.label)
                          )
                        }
                        isOpen={activeDropdown === module.title}
                      />
                    );
                  } else {
                    return (
                      <NavLink
                        key={index}
                        to={module.route}
                        className={({ isActive }) =>
                          `flex items-center gap-4 rounded-lg p-4 transition-all hover:text-primary hover:bg-muted ${
                            isActive ? "bg-muted text-primary" : "text-muted"
                          }`
                        }
                      >
                        {module.icon && <module.icon />}
                        {module.title}
                      </NavLink>
                      // <div
                      //   key={index}
                      //   onClick={() => navigate(module.route)}
                      //   className={`navbar-link-item ${
                      //     location.pathname === module.route &&
                      //     "navbar-active-side-menu"
                      //   }`}
                      // >
                      //   <module.icon className="icon shadow" />
                      //   {module.title}
                      // </div>
                    );
                  }
                }
                return null; // Return null if the user doesn't have access
              })}
              {/* <Link
                to="#"
                className="flex items-center gap-4 rounded-lg bg-muted p-4 text-primary transition-all hover:text-primary hover:bg-muted"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg bg-muted p-4 text-primary transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Products{" "}
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Customers
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg p-4 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link> */}
            </nav>
          </div>
          <div className="mt-auto p-0 sticky bottom-0 ">
            <Card x-chunk="dashboard-02-chunk-0" className="bg-muted/40">
              <CardContent className="p-2 pt-0 md:p-4 ">
                <Button size="sm" className="w-full" onClick={logOut}>
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 ">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Keke App</span>
                </Link>
                {sidebarModules.map((module, index) => {
                  // Check if the user has access to the module
                  if (true) {
                    // If the module has a submenu
                    if (module.subMenu) {
                      return (
                        <DropdownMenu
                          key={index}
                          mainPath={module.route}
                          mainLabel={module.title}
                          icon={module.icon}
                          subPaths={
                            // Filter the submenu to only include items the user has access to
                            module.subMenu.filter(
                              (subItem) =>
                                user.functionalities &&
                                user.functionalities.includes(subItem.label)
                            )
                          }
                          isOpen={activeDropdown === module.title}
                        />
                      );
                    } else {
                      return (
                        <NavLink
                          key={index}
                          to={module.route}
                          className={({ isActive }) =>
                            `flex items-center gap-4 rounded-lg p-4 transition-all hover:text-primary hover:bg-muted ${
                              isActive ? "bg-muted text-primary" : "text-muted"
                            }`
                          }
                        >
                          {module.icon && <module.icon />}
                          {module.title}
                        </NavLink>
                        // <div
                        //   key={index}
                        //   onClick={() => navigate(module.route)}
                        //   className={`navbar-link-item ${
                        //     location.pathname === module.route &&
                        //     "navbar-active-side-menu"
                        //   }`}
                        // >
                        //   <module.icon className="icon shadow" />
                        //   {module.title}
                        // </div>
                      );
                    }
                  }
                  return null; // Return null if the user doesn't have access
                })}
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
              <div className="mt-auto">
                <Card className="border-0">
                  {/* <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader> */}
                  <CardContent className="p-4">
                    <Button size="sm" className="w-full">
                      Logout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          {/* <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </header>
        <main className="sm:p-2 md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

