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

const SupplierTable = ({ suppliers }) => {
  return (
    <Table>
      <TableCaption>A list of all suppliers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Contacts</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Specialty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {suppliers.map((supplier) => (
          <TableRow key={supplier.supplierID}>
            <TableCell>{supplier.name}</TableCell>
            <TableCell>{supplier.contacts}</TableCell>
            <TableCell>{supplier.address}</TableCell>
            <TableCell>{supplier.specialty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SupplierTable;
