
import { Link, useNavigate } from "react-router-dom";
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

export default function ViewTable({page, addLink={},data=[]}) {
    const navigate = useNavigate()
  return (
    <>
      {/* <Card className="px-2 rounded-sm min-h-full"> */}

      <div className="">
        <Input
          name="filter"
          type="text"
          className="app_input2"
          onChange={({ target: value }) => console.log(value)}
          placeholder="Search Individual"
        />
      </div>
      <Table className="p-2">
        {data.length == 0 && (
          <TableCaption className="pb-3">
            No Transactions made.
          </TableCaption>
        )}

        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="">Status</TableHead>
            <TableHead className="">Credit</TableHead>
            <TableHead className="hidden md:table-cell">Debit</TableHead>
            {/* <TableHead className="">Action</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {transaction.t_date}
              </TableCell>
              <TableCell>{transaction.Type_of_top_up}</TableCell>
              <TableCell className="hidden md:table-cell">
                {transaction.description}
              </TableCell>
              <TableCell className="">
                {" "}
                <Badge variant="outline"> {transaction.status}</Badge>
              </TableCell>
              <TableCell className="">{transaction.credit}</TableCell>

              <TableCell className="hidden md:table-cell">
                {transaction.debit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
      </Table>
    </>
  );
}
