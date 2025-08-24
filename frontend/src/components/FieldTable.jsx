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

const FieldTable = ({ fields }) => {
  return (
    <Table>
      <TableCaption>A list of all fields.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Soil Type</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field) => (
          <TableRow key={field.fieldID}>
            <TableCell>{field.name}</TableCell>
            <TableCell>{field.location}</TableCell>
            <TableCell>{field.size}</TableCell>
            <TableCell>{field.soilType}</TableCell>
            <TableCell>{field.isActive ? 'Active' : 'Inactive'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FieldTable;
