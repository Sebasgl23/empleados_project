
import React from "react";
import {
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const AddEmpleadosModal = ({ modalOpen, handleModalClose, handleChange, handleChangeTipoIdentificacion, handleChangeTelefonoTipo, handleSubmit, error}) => {
    return (
      <Modal open={modalOpen} onClose={handleModalClose}>
      <Container maxWidth="sm">
        <Paper>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            style={{ padding: 20 }}
          >
            <Grid item xs={12}>
              <h2>Crear nuevo empleado</h2>
            </Grid>
            <Grid item xs={12}>
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} display="flex" flexDirection="row">
              <TextField
                label="Nombre"
                id="nombre"
                fullWidth
                onChange={handleChange}
              />
              <TextField
                label="Apellidos"
                id="apellidos"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Tipo de Identificacion</InputLabel>
              <Select
                label="Tipo de identificacion"
                id="tipoIdentificacion"
                fullWidth
                onChange={handleChangeTipoIdentificacion}
              >
                <MenuItem value="Cedula">Cedula</MenuItem>
                <MenuItem value="NIT">NIT</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Identificacion"
                id="identificacion"
                fullWidth
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Fecha de Ingreso"
                id="fechaIngreso"
                type="date"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Salario Mensual"
                id="salarioMensual"
                type="number"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} display="flex" flexDirection="row">
              <TextField
                label="Cargo"
                id="cargo"
                fullWidth
                onChange={handleChange}
              />
              <TextField
                label="Departamento"
                id="departamento"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Tipo de Telefono</InputLabel>
              <Select
                label="Tipo de Telefono"
                id="telefono_tipo"
                fullWidth
                onChange={handleChangeTelefonoTipo}
              >
                <MenuItem value="Celular">Celular</MenuItem>
                <MenuItem value="Telefono">Telefono</MenuItem>
              </Select>
            </Grid>
            <Grid sx={{ display: "flex", flexDirection: "row" }} item xs={12}>
              <TextField
                label="Indicativo"
                id="telefono_indicativo"
                type="number"
                fullWidth
                onChange={handleChange}
              />
              <TextField
                label="Telefono"
                id="telefono_numero"
                type="number"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                id="email"
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Modal>
    );

}
export default AddEmpleadosModal;
