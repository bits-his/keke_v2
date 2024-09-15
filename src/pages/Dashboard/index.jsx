import { useEffect, useState } from "react";
// import MonthlyRevenueBarChart from "./MonthlyRevenueBarChart";
// import MonthlyTransactionLineChart from "./MonthlyTransactionLineChart";
// import { Card, Col, Row } from "reactstrap";
// import CustomDateRange from "../UI/CustomDateRange";
// import moment from "moment";
// import { toParagraph } from "../../lib/Helper";
import DashboardCard from "./CustomCard";
// import Navlogout from "../Navlogout";
import { TrendingUp } from "lucide-react"
import { Bar, BarChart,Line,LineChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  // ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const App = () => {
  // date picker setup

  const handleChangeDate = ({ target: { name, value } }) => {
    switch (name) {
      case "month":
        { const monthStart = moment(`'${dateRange.year}-${value}-01'`).format(
          "YYYY-MM-DD"
        );
        const monthEnd = moment(`'${dateRange.year}-${value}'`)
          .endOf("month")
          .format("YYYY-MM-DD");

        setDateRange({
          ...dateRange,
          from: monthStart,
          to: monthEnd,
          month: value,
        });
        break; }
      case "year":
        { const yearStart = moment(`'${value}-01-01'`).format("YYYY-MM-DD");
        const yearEnd = moment(`'${value}-12'`)
          .endOf("year")
          .format("YYYY-MM-DD");

        setDateRange({
          ...dateRange,
          from: yearStart,
          to: yearEnd,
        });
        break; }

      case "quarter":
        { let startMonth, endMonth;
        let selectedQuarter = value;
        switch (selectedQuarter) {
          case "Q1":
            startMonth = 1;
            endMonth = 3;
            break;
          case "Q2":
            startMonth = 4;
            endMonth = 6;
            break;
          case "Q3":
            startMonth = 7;
            endMonth = 9;
            break;
          case "Q4":
            startMonth = 10;
            endMonth = 12;
            break;
          default:
            // Handle unexpected quarter values
            break;
        }
        const qStart = moment(`'${dateRange.year}-${startMonth}-01'`).format(
          "YYYY-MM-DD"
        );
        const qEnd = moment(`'${dateRange.year}-${endMonth}'`)
          .endOf("month")
          .format("YYYY-MM-DD");

        setDateRange({
          ...dateRange,
          from: qStart,
          to: qEnd,
          quarter: selectedQuarter,
        });
        break; }
      case "from":
        setDateRange({
          ...dateRange,
          from: moment(value).format("YYYY-MM-DD"),
        });
        break;

      case "to":
        setDateRange({
          ...dateRange,
          to: moment(value).format("YYYY-MM-DD"),
        });
        break;
      default:
        break;
    }
    setDateRange((prevDateRange) => ({
      ...prevDateRange,
      [name]: value,
    }));
  };

  const monthlyRevenueData = [
    { month: "January", total: 1000000 },
    { month: "February", total: 1500000 },
    { month: "March", total: 2000000 },
  ];

  const monthlyTransactionData = [
    { month: "January", transaction_count: 200 },
    { month: "February", transaction_count: 350 },
    { month: "March", transaction_count: 150 },
    // Add more months as needed
  ];
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
}
  return (
    <>
      <Tabs defaultValue="daily">
        <TabsList className='p-1'>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quaterly">Quaterly</TabsTrigger>
          <TabsTrigger value="annually">Annually</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div>
          <DashboardCard />
        </div>
        <div className="pt-5 grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Bar Chart</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    radius={8}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Line Chart - Dots</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="desktop"
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-desktop)",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing total transaction for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </Tabs>
    </>
  );
};

export default App;
