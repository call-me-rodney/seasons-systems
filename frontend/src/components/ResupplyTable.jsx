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

const ResupplyTable = ({ resupplies }) => {
  return (
    <Table>
      <TableCaption>A list of all resupply requests.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Request ID</TableHead>
          <TableHead>Request Date</TableHead>
          <TableHead>Item ID</TableHead>
          <TableHead>Supplier ID</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resupplies.map((resupply) => (
          <TableRow key={resupply.requestID}>
            <TableCell>{resupply.requestID}</TableCell>
            <TableCell>{new Date(resupply.requestDate).toLocaleDateString()}</TableCell>
            <TableCell>{resupply.itemID}</TableCell>
            <TableCell>{resupply.supplierID}</TableCell>
            <TableCell>{resupply.quantity}</TableCell>
            <TableCell>{resupply.deliveryDate ? 'Delivered' : 'Pending'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ResupplyTable;
