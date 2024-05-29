import React, { useState, useEffect } from 'react';
import Menu from '../Components/Menu';
import ClientesTable from '../Components/ClientesTable';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import AddClienteModal from '../Components/AddClienteModal';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8000/api/clientes')
      .then(response => {
        setClientes(response.data.clientes);
      })
      .catch(error => {
        console.error('Error fetching clientes:', error);
      });
  }, []);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    axios.post('http://localhost:8000/api/cliente/find', { data: searchQuery })
      .then(response => {
        setClientes(response.data.clientes);
      })
      .catch(error => {
        console.error('Error searching clientes:', error);
      });
  };

  const handleAddCliente = (cliente) => {
    setClientes([...clientes, cliente]);
  };

  const handleUpdateCliente = (updatedCliente) => {
    setClientes(clientes.map(cliente => (cliente._id === updatedCliente._id ? updatedCliente : cliente)));
  };


  const handleDeleteCliente = (id) => {
    axios.delete(`http://localhost:8000/api/cliente/${id}`)
      .then(() => {
        setClientes(clientes.filter(cliente => cliente._id !== id));
      })
      .catch(error => {
        console.error('Error deleting cliente:', error);
      });
  };

  return (
    <div>
      <Menu />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 4, pl: 6, pr: 6 }}>
          <Grid item xs={12} md={8}>
            <Typography variant='h2'>Clientes</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button color="success" variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}> Agregar Cliente</Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center" sx={{pt: 1, pl:6, pr: 6}}>
            <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Buscar cliente por dato"
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button color="primary" variant="contained" startIcon={<SearchIcon />} onClick={handleSearch}> BUSCAR CLIENTE</Button>
                </Box>
            </Grid>
        </Grid>

        <Grid container spacing={2} direction="column" justifyContent="flex-end" sx={{ pt: 4, pl: 6, pr: 6 }}>
          <Grid item xs={12} md={12}>
            <ClientesTable
              rows={clientes}
              page={currentPage}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              updateCliente={handleUpdateCliente}
              deleteCliente={handleDeleteCliente}
            />
          </Grid>
        </Grid>
      </Box>
      <AddClienteModal open={open} handleClose={() => setOpen(false)} addCliente={handleAddCliente} />
    </div>
  );
}

export default Clientes;