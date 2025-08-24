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

const CropTable = ({ crops }) => {
  return (
    <Table>
      <TableCaption>A list of all crops.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Field ID</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {crops.map((crop) => (
          <TableRow key={crop.cropID}>
            <TableCell>{crop.type}</TableCell>
            <TableCell>{crop.status}</TableCell>
            <TableCell>{crop.fieldID}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CropTable;
