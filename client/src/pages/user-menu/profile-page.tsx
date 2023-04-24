import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import routes from 'navigation/routes';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';
import ApiService from 'services/api-service';

type UserServiceTableModel = {
  id: number,
  title: string,
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [serviceTableData, setServiceTableData] = React.useState<UserServiceTableModel[]>([]);

  const handleDelete = async (id: number) => {
    await ApiService.deleteService(id);
    const fetchServiceData = await ApiService.fetchUserServices();
    setServiceTableData(fetchServiceData);
  };

  React.useEffect(() => {
    (async () => {
      const fetchServiceData = await ApiService.fetchUserServices();
      setServiceTableData(fetchServiceData);
    })();
  }, []);

  return (
    <Container>
      <Button variant="contained" sx={{ mt: 1 }} onClick={() => navigate(routes.PostServices)}>Add new service</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Service name</TableCell>
              <TableCell align="right">Manage post</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceTableData.map(({ title, id }) => (
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={id}>
                <TableCell component="th" scope="row">
                  {title}
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => navigate(routes.EditPostService.createLink(id))}>
                    <EditIcon />
                  </IconButton>
                  {' '}
                  <IconButton onClick={() => handleDelete(id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ProfilePage;
