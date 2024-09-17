'use client';
import { FC, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { Email, Search } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface Client {
  client: string;
  email: string;
  address: string;
  telephone: string;
}

// Sample data arrays
const unverifiedData = [
  {
    client: "Alpha",
    email: "alpha@gmail.com",
    address: "123 Main Street, Springfield, IL 62701",
    telephone: "(123) 456-7890",
  },
  {
    client: "Beta",
    email: "Beta@gmail.com",
    address: "456 Elm Avenue, Oakville, CA 94577",
    telephone: "(234) 567-8901",
  },
  {
    client: "Gamma",
    email: "Gamma@gmail.com",
    address: "789 Pine Road, Maplewood, NJ 07040",
    telephone: "(345) 678-9012",
  },
  //... other unverified clients
];

const verifiedData = [
  {
    client: "Mattral",
    email: "mattral@gmail.com",
    address: "1010 somewhere, somewhere, California",
    telephone: "(456) 789-0123",
  },
  {
    client: "Ekoue",
    email: "ekoue@gmail.com",
    address: "1515 Oak Street, somewhere, California",
    telephone: "(567) 890-1234",
  },
  {
    client: "Kojo",
    email: "kojo@gmail.com",
    address: "1515 Birch Avenue, somewhere, California",
    telephone: "01234 567 890",
  },
  {
    client: "Nebula",
    email: "nebula@gmail.com",
    address: "1717 Willow Drive, somewhere, California",
    telephone: "02345 678 901",
  }
  //... other verified clients
];

const ClientList: FC = () => {
  const router = useRouter();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [open, setOpen] = useState(false);

  const handleView = (client: Client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Clients
      </Typography>

      <Box my={4}>
        <Typography variant="h6">Unverified Clients</Typography>
        <ClientTable data={unverifiedData} handleView={handleView} handleEmail={handleEmail} />
      </Box>

      <Box my={4}>
        <Typography variant="h6">Verified Clients</Typography>
        <ClientTable data={verifiedData} handleView={handleView} handleEmail={handleEmail} />
      </Box>

      {selectedClient && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Client Details</DialogTitle>
          <DialogContent>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">{selectedClient.client}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Email: {selectedClient.email}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Address: {selectedClient.address}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>Telephone: {selectedClient.telephone}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

interface ClientTableProps {
  data: Client[];
  handleView: (client: Client) => void;
  handleEmail: (email: string) => void;
}

const ClientTable: FC<ClientTableProps> = ({ data, handleView, handleEmail }) => (
  <TableContainer component={Paper}>
    <Table>
      <caption>List of Clients</caption>
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
              <Tooltip title="View">
                <IconButton color="primary" onClick={() => handleView(item)}>
                  <Search />
                </IconButton>
              </Tooltip>
              <Tooltip title="Email">
                <IconButton color="secondary" onClick={() => handleEmail(item.email)}>
                  <Email />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ClientList;
