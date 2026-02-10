"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

export type Column<T> = {
  key?: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
};

interface ReusableTableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export default function ReusableTable<T>({
  data,
  columns,
}: ReusableTableProps<T>) {
  return (
    <div className="mt-6 rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="border-b">
            {columns.map((col, i) => (
              <TableHead key={i}>{col.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((col, j) => (
                <TableCell key={j}>
                  {col.render
                    ? col.render(row)
                    : col.key
                    ? String(row[col.key] ?? "")
                    : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
