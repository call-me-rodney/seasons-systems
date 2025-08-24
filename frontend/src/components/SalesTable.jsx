import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const SalesTable = ({ sales }) => {
  return (
    <Table>
      <TableCaption>A list of all sales.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Sale ID</TableHead>
          <TableHead>Sale Date</TableHead>
          <TableHead>Employee ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale) => (
          <TableRow key={sale.saleID}>
            <TableCell>{sale.saleID}</TableCell>
            <TableCell>{new Date(sale.saleDate).toLocaleDateString()}</TableCell>
            <TableCell>{sale.employeeID}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SalesTable;
