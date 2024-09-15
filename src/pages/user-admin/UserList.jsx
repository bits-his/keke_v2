import { useState, useEffect, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { _get } from "../../lib/Helper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await _get("get-all-users");
        _get("get-all-users", (result) => {
          if (result && result.success) {
            setData(result.results);
          } else {
            throw new Error("Unexpected error or data format");
          }
        });
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Card className="px-2">
        <CardHeader className="flex justify-between flex-row align-center item-center">
          <CardTitle>User List</CardTitle>
          <Button onClick={() => navigate("new")}>Add User</Button>
        </CardHeader>
        <Outlet />
        <Table className="p-2">
          <TableCaption className="pb-3">A list of your All User.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead className="">Email</TableHead>
              <TableHead className="">Role</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="font-medium">{admin.id}</TableCell>
                <TableCell>{admin.name}</TableCell>
                <TableCell>{admin.username}</TableCell>
                <TableCell className="">{admin.email}</TableCell>
                <TableCell className="">{admin.role}</TableCell>
                <TableCell className="">{admin.status}</TableCell>
                <TableCell className="">
                  <Button>edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </Card>
    </>
  );
}

