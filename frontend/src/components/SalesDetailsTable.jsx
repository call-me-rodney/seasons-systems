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

const SalesDetailsTable = ({ salesDetails }) => {
  return (
    <Table>
      <TableCaption>A list of all sales details.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Item ID</TableHead>
          <TableHead>Quantity Sold</TableHead>
          <TableHead>Unit Price</TableHead>
          <TableHead>Sale Total</TableHead>
          <TableHead>Payment Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {salesDetails.map((detail) => (
          <TableRow key={detail.salesDetailsID}>
            <TableCell>{detail.item}</TableCell>
            <TableCell>{detail.quantitySold}</TableCell>
            <TableCell>{detail.unitPrice}</TableCell>
            <TableCell>{detail.saleTotal}</TableCell>
            <TableCell>{detail.paymentMethod}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SalesDetailsTable;
