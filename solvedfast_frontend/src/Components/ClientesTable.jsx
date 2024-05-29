import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { TablePagination } from '@mui/material'; // Agrega Typography para mostrar mensajes
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditClienteModal from './EditClienteModal';
import DeleteConfirmationDialog from './DeleteConfirmationDialog'; // Este componente lo crearemos más adelante
import { toast } from 'react-toastify';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#e4e4e4',
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: 'center',
  },
}));

const StyledTableRow = styled(TableRow)(({}) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ClientesTable = ({ rows, page, rowsPerPage, handleChangePage, updateCliente, deleteCliente, setClientes }) => {
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleEditOpen = (cliente) => {
    setSelectedCliente(cliente);
    setEditOpen(true);
  };

  const handleDeleteOpen = (cliente) => {
    setSelectedCliente(cliente);
    setDeleteOpen(true);
  };

  const handleEditClose = () => {
    setSelectedCliente(null);
    setEditOpen(false);
  };

  const handleDeleteClose = () => {
    setSelectedCliente(null);
    setDeleteOpen(false);
  };

  const handleUpdateCliente = (cliente) => {
    updateCliente(cliente);
    handleEditClose();
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCliente(selectedCliente._id);
      toast.success('Cliente eliminado exitosamente');
      handleDeleteClose();
    } catch (error) {
      toast.error('No se pudo eliminar el cliente');
      handleDeleteClose();
    }
  };

  const startIndex = page * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, rows.length);
  const slicedRows = rows.slice(startIndex, endIndex);

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombres</StyledTableCell>
              <StyledTableCell>Apellidos</StyledTableCell>
              <StyledTableCell>Núm. Documento</StyledTableCell>
              <StyledTableCell>Teléfono</StyledTableCell>
              <StyledTableCell>Distrito</StyledTableCell>
              <StyledTableCell>Dirección</StyledTableCell>
              <StyledTableCell>Provincia</StyledTableCell>
              <StyledTableCell>Referencia</StyledTableCell>
              <StyledTableCell>Comentarios</StyledTableCell>
              <StyledTableCell>Acciones</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedRows.map((row) => (
              <TableRow hover key={row._id}>
                <StyledTableCell>{row.nombres}</StyledTableCell>
                <StyledTableCell>{`${row.apellido_paterno} ${row.apellido_materno}`}</StyledTableCell>
                <StyledTableCell>{row.documento_identidad}</StyledTableCell>
                <StyledTableCell>{row.num_telefono.join(', ')}</StyledTableCell>
                <StyledTableCell>{row.distrito}</StyledTableCell>
                <StyledTableCell>{row.direccion}</StyledTableCell>
                <StyledTableCell>{row.provincia}</StyledTableCell>
                <StyledTableCell>{row.referencia}</StyledTableCell>
                <StyledTableCell>{row.comentario}</StyledTableCell>
                <StyledTableCell>
                  <IconButton aria-label="edit" color="warning" onClick={() => handleEditOpen(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="delete" color="error" onClick={() => handleDeleteOpen(row)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => handleChangePage(newPage)}
      />
      {selectedCliente && (
        <EditClienteModal
          open={editOpen}
          handleClose={handleEditClose}
          cliente={selectedCliente}
          updateCliente={updateCliente}
          setClientes={setClientes}
          clienteId={selectedCliente._id} 
        />
      )}
      {selectedCliente && (
        <DeleteConfirmationDialog
          open={deleteOpen}
          handleClose={handleDeleteClose}
          handleConfirm={handleDeleteConfirm}
          selectedPersonInfo={selectedCliente.nombres + " " + selectedCliente.apellido_paterno + " " + selectedCliente.apellido_materno}
        />
      )}
    </Paper>
  );
};

export default ClientesTable;