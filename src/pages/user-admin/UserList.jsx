import { useState, useEffect} from "react";
import {  useNavigate } from "react-router-dom";
import { _get } from "../../lib/Helper";
import { Button } from "@/components/ui/button";
import {
  Card,
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
  // const [error, setError] = useState(null);

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
        console.error(err,loading);
        // setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Card className="px-2">
        <CardHeader className="px-2 py-4 flex justify-between flex-row align-center item-center">
          <CardTitle>User List</CardTitle>
          <Button onClick={() => navigate("new")}>Add User</Button>
        </CardHeader>
        <div className="">
          <Input
            placeholder="Search User"
            onChange={(e) => {
              console.log(e.target.value);
              setData(data.filter((user) => user.name === e.target.value));
            }}
          />
        </div>
        {/* <div className="overflow-x-auto"> */}
          <Table className="p-2 w-full text-sm text-left rtl:text-right dark:text-gray-400">
            <TableCaption className="pb-3">
              A list of your All User.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Account ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:visible">UserName</TableHead>
                <TableHead className="">Email</TableHead>
                <TableHead className="">Role</TableHead>
                <TableHead className="hidden sm:visible">Status</TableHead>
                <TableHead className="">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">
                    {admin.account_id}
                  </TableCell>
                  <TableCell>{admin.name}</TableCell>
                  <TableCell className="hidden sm:visible">
                    {admin.username}
                  </TableCell>
                  <TableCell className="">{admin.email}</TableCell>
                  <TableCell className="">{admin.role}</TableCell>
                  <TableCell className="hidden sm:visible">
                    {admin.status}
                  </TableCell>
                  <TableCell className="">
                    <Button>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        {/* </div> */}
      </Card>
    </>
  );
}

