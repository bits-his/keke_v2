import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../../redux/actions/auth";
import { sidebarModules } from "../user-admin/modules";
import { useDispatch, useSelector } from "react-redux";
import { toParagraph } from "../../lib/Helper";
// import keke from "../../assets/keke_napep.png";
// import street from "../../assets/street.jpeg";
import road from "../../assets/road.jpeg";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

    const isAuthenticated = useSelector((state) => state.auth.authenticated);

    useEffect(() => {
      if (isAuthenticated) {
        navigate("/dashboard", { replace: true }); 
      }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
      return null;
    }
  const getDefaultRoute = (func) => {
    let allRoutes = [];

    sidebarModules.forEach((m) => {
      if (m.subMenu) {
        m.subMenu.forEach((s) => allRoutes.push({ ...s, route: m.route }));
      } else {
        allRoutes.push({ title: m.title, path: m.route });
      }
    });

    let foundRoute = allRoutes.find(
      (a) => a.title === func || a.label === func
    );

    return foundRoute;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      login(
        { username: form.email, password: form.password },
        () => {
          setLoading(false);

          // const firstItem = res.user?.functionalities.split(",")[0];
          const route = getDefaultRoute("Agents Top Up");

          if (route) {
            // if (route.route) {
            //   navigate(route.route);
            //   console.log(route,'route.route')
            // } else {
            //   navigate(route.path);
            //      console.log("route.path");
            // }
            navigate("/dashboard");
          } else {
            navigate("/dashboard");
            console.log("navigate")
          }
        },
        (err) => {
          setLoading(false);
          setError(err);
        }
      )
    );
  };

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="flex items-center justify-center py-48 sm:py-12 py-auto md:min-h-[100vh] sm:min-h-[100vh]">
        <Card className="h-[450px]  flex items-center justify-center ">
          <CardContent className="px-5">
            <div className="mx-auto grid md:w-[450px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="m@example.com"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-300"
                  >
                    {loading ? "..." : "Sign In"}
                  </Button>
                  <p className="mt-3 text-danger text-center">
                    <b>{toParagraph(Object.keys(error)[0])}</b>{" "}
                    <i>{Object.values(error)[0]}</i>
                  </p>
                  {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
                </div>
              </form>
              {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="relative h-full w-full">
        <img
          src={road}
          alt="Image"
          width="1920"
          height="1080"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          style={{ backgroundPosition: "center" }}
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
    </div>
  );
}
