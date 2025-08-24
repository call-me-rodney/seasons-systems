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

const LivestockTable = ({ livestock }) => {
  return (
    <Table>
      <TableCaption>A list of all livestock.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Species</TableHead>
          <TableHead>Breed</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Pen ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {livestock.map((animal) => (
          <TableRow key={animal.animalID}>
            <TableCell>{animal.species}</TableCell>
            <TableCell>{animal.breed}</TableCell>
            <TableCell>{animal.status}</TableCell>
            <TableCell>{animal.penID}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LivestockTable;
