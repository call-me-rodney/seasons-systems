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

const EmployeeTable = ({ employees }) => {
  return (
    <Table>
      <TableCaption>A list of all employees.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Department</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.employeeID}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>{employee.role}</TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.isActive ? 'Active' : 'Inactive'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeeTable;
