import React from "react";
import { Box, Typography, Button, Grid, Modal } from "@mui/material";

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

export default function SimilarSearchModal ({ showSimilarModal, setSimilarModal, tecnicosEncontrados, handleCreateTecnicoAnyway, handleSelectTecnico}) {
    return(
        <Modal
          open={showSimilarModal}
          onClose={() => setSimilarModal(false)}
        >
            <Box sx={style}>
                <Typography variant="h6" component="h2" mb={2}>
                Técnicos Encontrados
                </Typography>
                {tecnicosEncontrados && tecnicosEncontrados.map((tecnico) => (
                <Box key={tecnico._id} mb={2} p={2} border={1} borderRadius={2}>
                    <Typography><strong>Nombre:</strong> {tecnico.nombres} {tecnico.apellido_paterno} {tecnico.apellido_materno}</Typography>
                    <Typography><strong>Documento:</strong> {tecnico.documento_identidad}</Typography>
                    <Typography><strong>Teléfono:</strong> {tecnico.num_telefono.join(', ')} </Typography>
                    <Typography><strong>Especialidades:</strong> {tecnico.especialidad.map(especialidad => especialidad.nombre_especialidad).join(', ')} </Typography>

                    <Button variant="contained" color="primary" onClick={() => handleSelectTecnico(tecnico)}>
                        Seleccionar Tecnico
                    </Button>
                </Box>
                ))}
                <Grid container justifyContent="flex-end" spacing={2}>
                <Grid item>
                    <Button onClick={() => setSimilarModal(false)} variant="outlined">
                        Cancelar
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={handleCreateTecnicoAnyway} variant="contained" color="secondary">
                        Crear de Todos Modos
                    </Button>
                </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}