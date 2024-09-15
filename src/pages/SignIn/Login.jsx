import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "../../redux/actions/auth";
import { sidebarModules } from "../user-admin/modules";
import { useDispatch, useSelector } from "react-redux";
import { toParagraph } from "../../lib/Helper";
import keke from "../../assets/keke_napep.png";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const handleChange = ({ target: { name, value } }) => {
    setForm((p) => ({ ...p, [name]: value }));
  };

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
  console.log(form,user)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      login(
        { username: form.email, password: form.password },
        (res) => {
          setLoading(false);
          console.log("gfsdasgasdgasdgfa", res);

          const firstItem = res.user.functionalities.split(",")[0];
          const route = getDefaultRoute(firstItem);

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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[450px] gap-6">
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
              <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-300" >
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
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src={keke}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
