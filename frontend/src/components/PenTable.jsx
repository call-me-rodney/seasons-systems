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

const PenTable = ({ pens }) => {
  return (
    <Table>
      <TableCaption>A list of all pens.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Capacity</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pens.map((pen) => (
          <TableRow key={pen.penID}>
            <TableCell>{pen.name}</TableCell>
            <TableCell>{pen.location}</TableCell>
            <TableCell>{pen.type}</TableCell>
            <TableCell>{pen.capacity}</TableCell>
            <TableCell>{pen.isFull ? 'Full' : 'Available'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PenTable;
