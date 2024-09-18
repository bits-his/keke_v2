import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { _get } from "../lib/Helper";
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
import CustomTable from "./Component/CustomTable";

export default function AgentTable() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  const [query, setQuery] = useState("select-all");
  const [loading, setLoading] = useState(false);
  const [searchResultNotFound, setSearchResultNotFound] = useState(false);
  const search = () => {
    setQuery("search");
  };
  const getReg = useCallback(() => {
    setLoading(true);
    _get(
      `agents?query_type=${query}&name=${filter}`,
      (resp) => {
        if (resp.success && resp.results) {
          setData(resp.results);
          setSearchResultNotFound(resp.results.length === 0);
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
      }
    );
  }, [query]);

  useEffect(() => {
    if (!filter) {
      setQuery("select-all");
    }
  });

  useEffect(() => {
    setSearchResultNotFound(false);
  }, [filter]);
  useEffect(() => {
    getReg();
  }, [getReg]);

  return (
    <>
      <CustomTable
        data={data}
        page={"Agent"}
        addLink={{ addnew: "addagent", topup: "topup" }}
      />
    </>
  );
}
