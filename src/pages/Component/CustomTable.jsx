
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
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

export default function CustomTable({page, addLink,data=[]}) {
  const navigate = useNavigate();

  return (
    //           onClick={() => navigate("/agent")}

    //           <input
    //             name="filter"
    //             value={filter}
    //             type="text"
    //             className="app_input2"
    //             onChange={({ target: { value } }) => setFilter(value)}
    //             placeholder="Search Individual"
    //           />

    //     <div className="table_overflow">
    //       {loading ? (
    //         <Spinner
    //           color="warning"
    //           className="spinner"
    //           type="grow"
    //           style={{ margin: "20px auto" }}
    //         >
    //           " "
    //         </Spinner>
    //       ) : data.length === 0 ? (
    //         <Table
    //           bordered
    //           responsive
    //           // style={{
    //           //   position: "relative",
    //           //   top: "10px",
    //           //   width: "95.3%",
    //           //   left: "32px",
    //           //   marginTop: "4px",
    //           // }}
    //         >
    //           <thead>
    //             <tr>
    //               <th>S/N</th>
    //               <th>Name</th>
    //               <th>Phone</th>
    //               <th>Email</th>
    //               <th>Balance</th>
    //               <th className="text-center">Action</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             <tr>
    //               <td colSpan="6" className="text-center">
    //                 No Agent {filter} found
    //               </td>
    //             </tr>
    //           </tbody>
    //         </Table>
    //       ) : (
    //         <Table
    //           bordered
    //           responsive
    //           style={{
    //             position: "relative",

    //             width: "100%",
    //             marginTop: "4px",
    //           }}
    //         >
    //           <thead>
    //             <tr>
    //               <th>S/N</th>
    //               <th>Name</th>
    //               <th>Phone</th>
    //               <th>Email</th>
    //               <th>Balance</th>
    //               <th className="text-center">Action</th>
    //             </tr>
    //           </thead>
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
      <Card className="px-2">
        <CardHeader className="flex justify-between flex-row align-center item-center">
          <CardTitle>{page} List</CardTitle>
          <Button onClick={() => navigate(`${ addLink }`)}>Add {page}</Button>
        </CardHeader>
        <Table className="p-2">
          <TableCaption className="pb-3">
            A list of your All {page}.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">{page} ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">User Name</TableHead>
              <TableHead className="">Email</TableHead>
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
                <TableCell className="hidden md:table-cell">
                  {admin.role}
                </TableCell>
                <TableCell className="">
                  {" "}
                  <Badge variant="outline"> {admin.status}</Badge>
                </TableCell>
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
