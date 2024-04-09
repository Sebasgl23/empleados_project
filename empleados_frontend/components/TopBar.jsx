import React from "react";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

const TopBar = ({ handleModalOpen, handleEditModalOpen, selectedEmpleadoIndex, logOut, handleDeleteEmpleado }) => {
  return (
    <Grid container alignItems="center" spacing={2} sx={{ marginTop: "20px", marginBottom: "20px", position: "sticky", top: "0", zIndex: "1" }}>
      <Grid item xs>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleModalOpen}>
          Agregar empleado
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEditModalOpen}
          disabled={selectedEmpleadoIndex === null}
        >
          Editar empleado
        </Button>
        <Button
          variant="contained"
          onClick={handleDeleteEmpleado}
          color="error"
          disabled={selectedEmpleadoIndex === null}
        >
          Eliminar empleado
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={logOut}
        >
          Cerrar sesion
        </Button>
      </Grid>
    </Grid>
  );
};

export default TopBar;
