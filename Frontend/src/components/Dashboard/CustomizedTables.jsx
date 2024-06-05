import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Select,
} from '@chakra-ui/react';

const CustomizedTables = ({ filteredUsers }) => {


  return (
    <TableContainer>
     
      <Table variant='striped'>
        <TableCaption>List of Users</TableCaption>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Roll Number</Th>
            <Th>Semester</Th>
            <Th>Parentage</Th>
            <Th>Gender</Th>
            <Th>Mobile</Th>
            <Th>Created At</Th>
            <Th>Updated At</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers?.map((user) => (
            <Tr key={user._id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.rollNumber}</Td>
              <Td>{user.semester}</Td>
              <Td>{user.parentage}</Td>
              <Td>{user.gender}</Td>
              <Td>{user.mob}</Td>
              <Td>{new Date(user.createdAt).toLocaleString()}</Td>
              <Td>{new Date(user.updatedAt).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CustomizedTables;
