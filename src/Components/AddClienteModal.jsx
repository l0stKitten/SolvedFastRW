import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const AddClienteModal = ({ open, handleClose, addCliente }) => {
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [clientesEncontrados, setClientesEncontrados] = useState([]);
  const [showClientesModal, setShowClientesModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      documento_identidad: "",
      tipo_documento: "",
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      num_telefono: "",
      distrito: "",
      provincia: "",
      direccion: "",
      referencia: "",
      comentario: "",
      forceCreate: false,
    },
    validationSchema: Yup.object({
      documento_identidad: Yup.string()
        .matches(/^\d+$/, "Ingrese un dato válido")
        .test(
          "len",
          "Longitud incorrecta para el tipo de dato Seleccionado",
          (val) =>
            val &&
            (parseInt(formik.values.tipo_documento) === 1
              ? val.length === 8
              : val.length === 12)
        ),
      tipo_documento: Yup.string(),
      nombres: Yup.string().required("Nombre es requerido"),
      apellido_paterno: Yup.string().required("Apellido Paterno es requerido"),
      apellido_materno: Yup.string().required("Apellido Materno es requerido"),
      num_telefono: Yup.string()
        .matches(/^\d+$/, "Ingrese un dato válido")
        .required("Número de Teléfono es requerido"),
      distrito: Yup.string().required("Distrito es requerido"),
      provincia: Yup.string().required("Provincia es requerido"),
      direccion: Yup.string().required("Dirección es requerida"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:8000/api/cliente", values)
        .then((response) => {
          if (
            response.data.clientesEncontrados &&
            response.data.clientesEncontrados.length > 0
          ) {
            setClientesEncontrados(response.data.clientesEncontrados);
            setShowClientesModal(true);
          } else {
            addCliente(response.data);
            handleClose();
            toast.success("Cliente agregado exitosamente");
          }
        })
        .catch((error) => {
          console.error("Error creating cliente:", error);
          toast.error("Hubo un error al agregar el cliente");
        });
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    handleClose();
  };

  const handleChange = (event) => {
    const selectedTipoDocumento = parseInt(event.target.value);
    setTipoDocumento(selectedTipoDocumento);
    formik.setFieldValue("tipo_documento", selectedTipoDocumento);
  };

  const handleSelectCliente = (cliente) => {
    console.log("Cliente seleccionado:", cliente);
    setShowClientesModal(false);
  };

  const handleCreateClienteAnyway = () => {
    formik.setFieldValue("forceCreate", true, false);

    axios
      .post("http://localhost:8000/api/cliente", { ...formik.values, forceCreate: true })
      .then((response) => {
        addCliente(response.data);
        setShowClientesModal(false);
        handleClose();
        toast.success("Cliente creado exitosamente");
      })
      .catch((error) => {
        console.error("Error creando cliente:", error);
        toast.error("Hubo un error al crear el cliente");
      });
  };

  return (
    <Modal open={open} onClose={handleCancel}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          Agregar Cliente
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="tipo_documento">Tipo de Documento</InputLabel>
                <Select
                  labelId="tipo_documento"
                  name="tipo_documento"
                  id="tipo_documento"
                  value={formik.values.tipo_documento}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.tipo_documento &&
                    Boolean(formik.errors.tipo_documento)
                  }
                >
                  <MenuItem value={1}>DNI</MenuItem>
                  <MenuItem value={2}>Carnet de Extranjería</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="documento_identidad"
                label="Documento Identidad"
                name="documento_identidad"
                value={formik.values.documento_identidad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.documento_identidad &&
                  Boolean(formik.errors.documento_identidad)
                }
                helperText={
                  formik.touched.documento_identidad &&
                  formik.errors.documento_identidad
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="nombres"
                label="Nombres"
                name="nombres"
                value={formik.values.nombres}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nombres && Boolean(formik.errors.nombres)}
                helperText={formik.touched.nombres && formik.errors.nombres}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="num_telefono"
                label="Número de Teléfono"
                name="num_telefono"
                value={formik.values.num_telefono}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.num_telefono &&
                  Boolean(formik.errors.num_telefono)
                }
                helperText={
                  formik.touched.num_telefono && formik.errors.num_telefono
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="apellido_paterno"
                label="Apellido Paterno"
                name="apellido_paterno"
                value={formik.values.apellido_paterno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.apellido_paterno &&
                  Boolean(formik.errors.apellido_paterno)
                }
                helperText={
                  formik.touched.apellido_paterno &&
                  formik.errors.apellido_paterno
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="apellido_materno"
                label="Apellido Materno"
                name="apellido_materno"
                value={formik.values.apellido_materno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.apellido_materno &&
                  Boolean(formik.errors.apellido_materno)
                }
                helperText={
                  formik.touched.apellido_materno &&
                  formik.errors.apellido_materno
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="provincia"
                label="Provincia"
                name="provincia"
                value={formik.values.provincia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.provincia && Boolean(formik.errors.provincia)
                }
                helperText={formik.touched.provincia && formik.errors.provincia}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="distrito"
                label="Distrito"
                name="distrito"
                value={formik.values.distrito}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.distrito && Boolean(formik.errors.distrito)
                }
                helperText={formik.touched.distrito && formik.errors.distrito}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="direccion"
                label="Dirección"
                name="direccion"
                value={formik.values.direccion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.direccion && !formik.values.direccion}
                helperText={
                  formik.touched.direccion &&
                  !formik.values.direccion &&
                  "Dirección es requerida"
                }
                sx={{
                  "& .MuiInputBase-input": {
                    borderColor:
                      formik.touched.direccion && !formik.values.direccion
                        ? "red"
                        : "",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="referencia"
                label="Referencia"
                name="referencia"
                value={formik.values.referencia}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.referencia && Boolean(formik.errors.referencia)
                }
                helperText={
                  formik.touched.referencia && formik.errors.referencia
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="comentario"
                label="Comentario"
                name="comentario"
                value={formik.values.comentario}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.comentario && Boolean(formik.errors.comentario)
                }
                helperText={
                  formik.touched.comentario && formik.errors.comentario
                }
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Button onClick={handleCancel} variant="outlined" sx={{ mr: 1 }}>
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">
                CREAR
              </Button>
            </Grid>
          </Grid>
        </form>
        <Modal
          open={showClientesModal}
          onClose={() => setShowClientesModal(false)}
        >
          <Box sx={style}>
            <Typography variant="h6" component="h2" mb={2}>
              Clientes Encontrados
            </Typography>
            {clientesEncontrados.map((cliente) => (
              <Box key={cliente._id} mb={2} p={2} border={1} borderRadius={2}>
                <Typography><strong>Nombre:</strong> {cliente.nombres} {cliente.apellido_paterno} {cliente.apellido_materno}</Typography>
                <Typography><strong>Documento:</strong> {cliente.documento_identidad}</Typography>
                <Typography><strong>Teléfono:</strong> {cliente.num_telefono}</Typography>
                <Typography><strong>Provincia:</strong> {cliente.provincia}</Typography>
                <Typography><strong>Dirección:</strong> {cliente.direccion}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleSelectCliente(cliente)}>
                  Seleccionar Cliente
                </Button>
              </Box>
            ))}
            <Grid container justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button onClick={() => setShowClientesModal(false)} variant="outlined">
                  Cancelar
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleCreateClienteAnyway} variant="contained" color="secondary">
                  Crear de Todos Modos
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </Modal>
  );
};

export default AddClienteModal;
