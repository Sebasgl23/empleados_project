import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

const EmpleadosTable = ({ empleados, selectedEmpleadoIndex, handleCheckboxChange }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Id</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellidos</TableCell>
            <TableCell>Fecha de Ingreso</TableCell>
            <TableCell>Tipo Identificacion</TableCell>
            <TableCell>Identificacion</TableCell>
            <TableCell>Salario</TableCell>
            <TableCell>Cargo</TableCell>
            <TableCell>Departamento</TableCell>
            <TableCell>Telefono</TableCell>
            <TableCell>Correo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empleados.map((empleado, index) => (
            <TableRow key={empleado.id}>
              <TableCell>
                <Checkbox
                  checked={index === selectedEmpleadoIndex}
                  onChange={() => handleCheckboxChange(index)}
                />
              </TableCell>
              <TableCell>{empleado.id}</TableCell>
              <TableCell>{empleado.nombre}</TableCell>
              <TableCell>{empleado.apellidos}</TableCell>
              <TableCell>{empleado.fechaIngreso}</TableCell>
              <TableCell>{empleado.tipoIdentificacion}</TableCell>
              <TableCell>{empleado.identificacion}</TableCell>
              <TableCell>{empleado.salarioMensual}</TableCell>
              <TableCell>{empleado.cargo}</TableCell>
              <TableCell>{empleado.departamento}</TableCell>
              <TableCell>
                {"+" + empleado.empleado_telefono.indicativo + empleado.empleado_telefono.numero}
              </TableCell>
              <TableCell>{empleado.empleado_email.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmpleadosTable;
