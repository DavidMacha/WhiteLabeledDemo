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
} from '@mui/material';
import { Edit, Chat, Check, Cancel, RemoveCircle } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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
    client: "Davis",
    email: "davis@gmail.com",
    address: "1010 Cedar Lane, Lakeside, TX 75023",
    telephone: "(456) 789-0123",
  },
  {
    client: "Elizabeth",
    email: "elizabeth@gmail.com",
    address: "1313 Oak Street, Rivertown, FL 33009",
    telephone: "(567) 890-1234",
  },
  {
    client: "Amelia",
    email: "amelia@gmail.com",
    address: "1515 Birch Avenue, Hillcrest, OH 43215",
    telephone: "01234 567 890",
  },
  {
    client: "Olivia",
    email: "olivia@gmail.com",
    address: "1717 Willow Drive, Woodland, WA 98052",
    telephone: "02345 678 901",
  }
  //... other verified clients
];

interface Client {
    client: string;
    email: string;
    address: string;
    telephone: string;
  }
  
  const ClientList: FC = () => {
    const router = useRouter();
    const [unverifiedClients, setUnverifiedClients] = useState<Client[]>(unverifiedData);
    const [verifiedClients, setVerifiedClients] = useState<Client[]>(verifiedData);
  
    const handleView = (client: Client) => {
      alert(`Viewing client: ${client.client}\nEmail: ${client.email}\nAddress: ${client.address}\nTelephone: ${client.telephone}`);
    };
  
    const handleVerify = (client: Client) => {
      setUnverifiedClients(unverifiedClients.filter(c => c !== client));
      setVerifiedClients([...verifiedClients, client]);
      toast.success(`${client.client} has been verified!`);
    };
  
    const handleRemoveVerify = (client: Client) => {
      setVerifiedClients(verifiedClients.filter(c => c !== client));
      setUnverifiedClients([...unverifiedClients, client]);
      toast.info(`${client.client} has been moved to unverified!`);
    };
  
    const handleCancel = () => {
      toast.warning('Notification sent: Please submit more documents.');
    };
  
    const handleChat = () => {
      toast.info('Notification sent for chat.');
      router.push('/apps/chat');
    };
  
    return (
      <Box>
        <Typography variant="h4" gutterBottom>Clients</Typography>
  
        {/* Unverified Clients */}
        <Box my={4}>
          <Typography variant="h6">Unverified Clients</Typography>
          <ClientTable
            data={unverifiedClients}
            onVerify={handleVerify}
            onView={handleView}
            onCancel={handleCancel}
            onChat={handleChat}
          />
        </Box>
  
        {/* Verified Clients */}
        <Box my={4}>
          <Typography variant="h6">Verified Clients</Typography>
          <ClientTable
            data={verifiedClients}
            onRemoveVerify={handleRemoveVerify}
            onView={handleView}
            onChat={handleChat}
          />
        </Box>
      </Box>
    );
  };
  
  interface ClientTableProps {
    data: Client[];
    onVerify?: (client: Client) => void;
    onRemoveVerify?: (client: Client) => void;
    onView: (client: Client) => void;
    onCancel?: () => void;
    onChat: () => void;
  }
  
  const ClientTable: FC<ClientTableProps> = ({ data, onVerify, onRemoveVerify, onView, onCancel, onChat }) => (
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
                  <IconButton color="primary" onClick={() => onView(item)}>
                    <Edit />
                  </IconButton>
                </Tooltip>
                {onVerify && (
                  <>
                    <Tooltip title="Verify">
                      <IconButton color="success" onClick={() => onVerify(item)}>
                        <Check />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cancel">
                      <IconButton color="error" onClick={onCancel}>
                        <Cancel />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
                {onRemoveVerify && (
                  <Tooltip title="Remove Verification">
                    <IconButton color="warning" onClick={() => onRemoveVerify(item)}>
                      <RemoveCircle />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Chat">
                  <IconButton color="default" onClick={onChat}>
                    <Chat />
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