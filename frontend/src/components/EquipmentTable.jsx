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

const EquipmentTable = ({ equipment }) => {
  return (
    <Table>
      <TableCaption>A list of all equipment.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>In Use</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equipment.map((item) => (
          <TableRow key={item.equipmentID}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.model}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.isInUse ? 'Yes' : 'No'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EquipmentTable;
