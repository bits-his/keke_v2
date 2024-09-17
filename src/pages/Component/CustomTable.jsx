/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export default function CustomTable({ page, addLink = {}, data = [] }) {
  const navigate = useNavigate();

 
 const updateData = (e) =>{
 data.filter((item) => item.email.includes(e.target.value))
 }
  return (

    //           " "

    //
    //                   <Button
    //                     style={{ margin: "5px" }}
    //                     color="info"
    //                     onClick={() => navigate(`/agenttopup`)}
    //                   >
    //                     Top up
    //                   </Button>
    //                   <Button
    //                     color="success"
    //                     onClick={() =>
    //                       navigate(`/agenthistory/history/${agent.agent_id}`)
    //                     }
    //                   >
    //                     View history
    //                   </Button>

    <>
      <Card className="px-2 rounded-sm min-h-full">
        <CardHeader className="px-2 py-4 flex justify-between flex-row align-center item-center">
          <CardTitle>{page} List</CardTitle>
          <div className="flex gap-2">
            <Button onClick={() => navigate(`${addLink.topup}`)}>
              Top-Up {page === "Vehicle Owners" ? "Vehicles" : page}
            </Button>
            <Button onClick={() => navigate(`${addLink.addnew}`)}>
              Add {page}
            </Button>
          </div>
        </CardHeader>
        <div className="">
          <Input
            name="filter"
            type="text"
            className="app_input2"
            onChange={updateData}
            placeholder="Search Individual"
          />
        </div>
        <Table className="p-2">
          <TableCaption className="pb-3">
            A list of your All {page}.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">{page} ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">User Name</TableHead>
              <TableHead className="">Email</TableHead>
              <TableHead
                className={`${page == "Vehicle Owners" ? "hidden" : ""}`}
              >
                Balance
              </TableHead>
              <TableHead className="hidden md:table-cell">Role</TableHead>
              <TableHead className="">Status</TableHead>
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
                <TableCell className="hidden md:table-cell">
                  {admin.username}
                </TableCell>
                <TableCell className="">{admin.email}</TableCell>
                <TableCell
                  className={`${page == "Vehicle Owners" ? "hidden" : ""}`}
                >
                  {admin.balance}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {admin.role}
                </TableCell>
                <TableCell className="">
                  {" "}
                  <Badge variant="outline"> {admin.status}</Badge>
                </TableCell>
                <TableCell className="">
                  {page == "Vehicle Owners" ? (
                    <div className="flex">
                      <Button
                        onClick={() => {
                          navigate(`view/${admin.account_id}`);
                        }}
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => {
                          navigate(`vehicleregistration/${admin.account_id}`);
                        }}
                      >
                        Add Vehicle
                      </Button>
                    </div>
                  ) : page == "Vendor" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link
                          to={`view/${admin.account_id}`}
                          className="neutral-900"
                        >
                          <DropdownMenuItem>View</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem>Top Up</DropdownMenuItem>
                        <Link to={"setup"} className="neutral-900">
                          <DropdownMenuItem>Setup</DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : page == "Super Agent" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link
                          to={`view/${admin.account_id}`}
                          className="neutral-900"
                        >
                          <DropdownMenuItem>View</DropdownMenuItem>
                        </Link>
                        <Link
                          to={`topup/${admin.account_id}`}
                          className="neutral-900"
                        >
                          <DropdownMenuItem>Top Up</DropdownMenuItem>
                        </Link>
                        <Link to={"setup"} className="neutral-900">
                          <DropdownMenuItem>Setup</DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : page == "Agent" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Link
                            to={`view/${admin.account_id}`}
                            className="neutral-900"
                          >
                            View
                          </Link>
                        </DropdownMenuItem>
                        <Link
                          to={`topup/${admin.account_id}`}
                          className="neutral-900"
                        >
                          <DropdownMenuItem>Top Up</DropdownMenuItem>
                        </Link>
                        <Link to={"setup"} className="neutral-900">
                          <DropdownMenuItem>Setup</DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    ""
                  )}
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
