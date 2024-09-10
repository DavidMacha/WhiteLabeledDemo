'use client';
import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Sample data arrays
const unverifiedData = [
  {
    client: "Harper Wilson",
    email: "harperwilson@mail.com",
    address: "123 Main Street, Springfield, IL 62701",
    telephone: "(123) 456-7890",
  },
  {
    client: "Mia Brown",
    email: "miabrown@mail.com",
    address: "456 Elm Avenue, Oakville, CA 94577",
    telephone: "(234) 567-8901",
  },
  {
    client: "Emily Miller",
    email: "emilymiller@mail.com",
    address: "789 Pine Road, Maplewood, NJ 07040",
    telephone: "(345) 678-9012",
  },
  //... other unverified clients
];

const verifiedData = [
  {
    client: "Avery Davis",
    email: "averydavis@mail.com",
    address: "1010 Cedar Lane, Lakeside, TX 75023",
    telephone: "(456) 789-0123",
  },
  {
    client: "Elizabeth Martin",
    email: "elizabethmartin@mail.com",
    address: "1313 Oak Street, Rivertown, FL 33009",
    telephone: "(567) 890-1234",
  },
  {
    client: "Amelia Thompson",
    email: "ameliathompson@mail.com",
    address: "1515 Birch Avenue, Hillcrest, OH 43215",
    telephone: "01234 567 890",
  },
  {
    client: "Olivia White",
    email: "oliviawhite@mail.com",
    address: "1717 Willow Drive, Woodland, WA 98052",
    telephone: "02345 678 901",
  }
  //... other verified clients
];

// Custom reusable table component
const AdvisorTable: FC<{ title: string; data: typeof unverifiedData }> = ({ title, data }) => (
  <section>
    <Typography variant="h5" sx={{ mb: 2 }}>
      {title}
    </Typography>
    <TableContainer component={Paper}>
      <Table>
        <caption>List of {title}</caption>
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Telephone</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.client}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.telephone}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" startIcon={<EditIcon />} color="primary" size="small">
                    Edit
                  </Button>
                  <Button variant="contained" startIcon={<DeleteIcon />} color="error" size="small">
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </section>
);

const AdvisorList: FC = () => {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Advisors
      </Typography>

      {/* Unverified Advisors Table */}
      <AdvisorTable title="Unverified Advisors" data={unverifiedData} />

      {/* Verified Advisors Table */}
      <AdvisorTable title="Verified Advisors" data={verifiedData} />
    </>
  );
};

export default AdvisorList;
