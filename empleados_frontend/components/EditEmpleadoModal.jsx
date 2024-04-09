
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


const EditEmpleadosModal = ({editModalOpen, handleEditModalClose, error, editEmpleadoData, handleChange, handleChangeTipoIdentificacion, handleChangeTelefonoTipo, handleEditEmpleado}) => {

  return(
    <Modal open={editModalOpen} onClose={handleEditModalClose}>
    <Container maxWidth="sm">
      <Paper>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          style={{ padding: 20 }}
        >
          <Grid item xs={12} la>
            <h2>Editar empleado</h2>
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
              value={editEmpleadoData ? editEmpleadoData.nombre : ""}
            />
            <TextField
              label="Apellidos"
              id="apellidos"
              fullWidth
              onChange={handleChange}
              value={editEmpleadoData ? editEmpleadoData.apellidos : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Tipo de Identificacion</InputLabel>
            <Select
              label="Tipo de identificacion"
              id="tipoIdentificacion"
              fullWidth
              onChange={handleChangeTipoIdentificacion}
              value={
                editEmpleadoData ? editEmpleadoData.tipoIdentificacion : ""
              }
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
              value={
                editEmpleadoData ? editEmpleadoData.identificacion : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Fecha de Ingreso"
              id="fechaIngreso"
              type="date"
              fullWidth
              onChange={handleChange}
              value={editEmpleadoData ? editEmpleadoData.fechaIngreso : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Salario Mensual"
              id="salarioMensual"
              type="number"
              fullWidth
              onChange={handleChange}
              value={
                editEmpleadoData ? editEmpleadoData.salarioMensual : ""
              }
            />
          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row">
            <TextField
              label="Cargo"
              id="cargo"
              fullWidth
              onChange={handleChange}
              value={editEmpleadoData ? editEmpleadoData.cargo : ""}
            />
            <TextField
              label="Departamento"
              id="departamento"
              fullWidth
              onChange={handleChange}
              value={editEmpleadoData ? editEmpleadoData.departamento : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Tipo de Telefono</InputLabel>
            <Select
              label="Tipo de Telefono"
              id="telefono_tipo"
              fullWidth
              onChange={handleChangeTelefonoTipo}
              value={
                editEmpleadoData
                  ? editEmpleadoData.empleado_telefono.tipo
                  : ""
              }
            >
              <MenuItem value="Celular">Celular</MenuItem>
              <MenuItem value="Telefono">Telefono</MenuItem>
            </Select>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "row" }} item xs={12}>
            <TextField
              label="Indicativo"
              id="empleado_telefono.indicativo"
              type="number"
              fullWidth
              onChange={handleChange}
              value={editEmpleadoData?.empleado_telefono?.indicativo || ""}
            />
            <TextField
              label="Telefono"
              id="empleado_telefono.numero"
              type="number"
              fullWidth
              onChange={handleChange}
              value={editEmpleadoData?.empleado_telefono?.numero || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              id="empleado_email.email"
              fullWidth
              onChange={handleChange}
              value={editEmpleadoData?.empleado_email?.email || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditEmpleado}
            >
              Editar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  </Modal>

  )

}

export default EditEmpleadosModal;
