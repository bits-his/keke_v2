import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function DashboardCard({title, data, Icon,link, }) {
  return (
    <>
      <Link to={link} style={{ textDecoration: "none" }}>
        <Card
          x-chunk="dashboard-01-chunk-0"
          className="min-h-16 p h-40 bg-yellow-400"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {title ? title : "Total Users"}
            </CardTitle>

            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data ? data : `0`}
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
            {Icon ? <i className="flex justify-end pt-4">< Icon /></i> : `₦`}
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
