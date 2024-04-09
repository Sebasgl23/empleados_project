import { useState, useEffect } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import TopBar from "../components/TopBar";
import EmpleadosTable from "../components/EmpleadosTable";
import AddEmpleadosModal from "../components/AddEmpleadoModal";
import EditEmpleadoModal from "../components/EditEmpleadoModal";
import EditEmpleadosModal from "../components/EditEmpleadoModal";

export default function Dashboard() {
  const [empleados, setEmpleados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedEmpleadoIndex, setSelectedEmpleadoIndex] = useState(null);
  const [editEmpleadoData, setEditEmpleadoData] = useState({
    nombre: "",
    apellidos: "",
    tipoIdentificacion: "",
    identificacion: "",
    fechaIngreso: "",
    salarioMensual: "",
    cargo: "",
    departamento: "",
    empleado_telefono: {
      tipo: "", 
      indicativo: "",
      numero: "",
    },
    empleado_email: {
      email: "",
    },
  });
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    tipoIdentificacion: "",
    identificacion: "",
    fechaIngreso: "",
    salarioMensual: "",
    cargo: "",
    departamento: "",
    telefono_tipo: "",
    telefono_indicativo: "",
    email: "",
  });
  const navigate = useNavigate();

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const newToken = await axios.post(
      "http://localhost:8000/api/token/refresh/",
      {
        refresh: refreshToken,
      }
    );
    localStorage.setItem("token", newToken.data.access);
    localStorage.setItem("refreshToken", newToken.data.refresh);
  };

  const checkTokenExpiration = async () => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
    await refreshToken();
    if (currentTime >= expirationTime) {
      await refreshToken();
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    checkTokenExpiration();
    getEmpleados();
  }, [navigate]);

  const getEmpleados = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8000/api/empleados/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const empleadosOrdenados = response.data.sort((a, b) => a.id - b.id);
    setEmpleados(response.data);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const handleSubmit = async () => {
    if (
      !formData.nombre ||
      !formData.apellidos ||
      !formData.tipoIdentificacion ||
      !formData.identificacion ||
      !formData.fechaIngreso ||
      !formData.salarioMensual ||
      !formData.cargo ||
      !formData.departamento ||
      !formData.telefono_tipo ||
      !formData.telefono_indicativo ||
      !formData.telefono_numero ||
      !formData.email
    ) {
      setError("Todos los campos son requeridos");
      return;
    }

    if (formData.telefono_indicativo.length > 4) {
      setError("Indicativo invalido");
      return;
    }

    if (formData.telefono_numero.length > 10) {
      setError("Numero invalido");
      return;
    }

    if ((await validateEmail(formData.email)) === false) {
      setError("Correo invalido");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:8000/api/empleados/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error al guardar empleado:", error);
    }
  };

  const handleModalOpen = () => {
    setError("");
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEditModalOpen = () => {
    setError("");
    const empleadoData = empleados[selectedEmpleadoIndex];
    console.log(empleadoData);
    setEditEmpleadoData(empleadoData);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleChange = (e) => {
    setError("");
    const { id, value } = e.target;
    if (id.includes(".")) {
      const [parentId, childId] = id.split(".");
      setEditEmpleadoData((prevData) => ({
        ...prevData,
        [parentId]: {
          ...prevData[parentId],
          [childId]: value,
        },
      }));
    } else {
      setEditEmpleadoData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
    setFormData({ ...formData, [id]: value });
  };

  const handleChangeTipoIdentificacion = (e) => {
    setError("");
    setEditEmpleadoData((prevData) => ({
      ...prevData,
      tipoIdentificacion: e.target.value,
    }));
    setFormData({ ...formData, tipoIdentificacion: e.target.value });
  };

  const handleChangeTelefonoTipo = (e) => {
    setError("");
    setEditEmpleadoData((prevData) => ({
      ...prevData,
      empleado_telefono: {
        ...prevData.empleado_telefono,
        tipo: e.target.value,
      },
    }));
    setFormData({ ...formData, telefono_tipo: e.target.value });
  };
  const handleEditEmpleado = async () => {
    console.log(editEmpleadoData);
    if (
      !editEmpleadoData.nombre ||
      !editEmpleadoData.apellidos ||
      !editEmpleadoData.tipoIdentificacion ||
      !editEmpleadoData.identificacion ||
      !editEmpleadoData.fechaIngreso ||
      !editEmpleadoData.salarioMensual ||
      !editEmpleadoData.cargo ||
      !editEmpleadoData.departamento ||
      !editEmpleadoData.empleado_telefono.indicativo ||
      !editEmpleadoData.empleado_telefono.tipo ||
      !editEmpleadoData.empleado_telefono.numero ||
      !editEmpleadoData.empleado_email.email
    ) {
      setError("Todos los campos son requeridos");
      return;
    }
    if (editEmpleadoData.empleado_telefono.indicativo.length > 4) {
      setError("Indicativo invalido");
      return;
    }
    if (editEmpleadoData.empleado_telefono.numero.length > 10) {
      setError("Numero invalido");
      return;
    }
    if (
      (await validateEmail(editEmpleadoData.empleado_email.email)) === false
    ) {
      setError("Correo invalido");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:8000/api/empleados/${editEmpleadoData.id}/`,
        {
          ...editEmpleadoData,
          telefono_numero: editEmpleadoData.empleado_telefono.numero,
          telefono_indicativo: editEmpleadoData.empleado_telefono.indicativo,
          telefono_tipo: editEmpleadoData.empleado_telefono.tipo,
          email: editEmpleadoData.empleado_email.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error al editar empleado:", error);
    }
  };

  const handleDeleteEmpleado = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/api/empleados/${empleados[selectedEmpleadoIndex].id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error al borrar empleado:", error);
    }
  };

  const handleCheckboxChange = (index) => {
    setSelectedEmpleadoIndex(index === selectedEmpleadoIndex ? null : index);
  };

  const validateEmail = async (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <Container component="main" maxWidth="100%">
      <CssBaseline />
      <TopBar
        handleModalOpen={handleModalOpen}
        handleEditModalOpen={handleEditModalOpen}
        selectedEmpleadoIndex={selectedEmpleadoIndex}
        handleDeleteEmpleado={handleDeleteEmpleado}
        logOut={logOut}
      />

      <AddEmpleadosModal
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        handleChange={handleChange}
        handleChangeTipoIdentificacion={handleChangeTipoIdentificacion}
        handleChangeTelefonoTipo={handleChangeTelefonoTipo}
        handleSubmit={handleSubmit}
        
      />

      <EditEmpleadosModal
        editModalOpen={editModalOpen}
        handleEditModalClose={handleEditModalClose}
        error={error}
        editEmpleadoData={editEmpleadoData}
        handleChange={handleChange}
        handleChangeTipoIdentificacion={handleChangeTipoIdentificacion}
        handleChangeTelefonoTipo={handleChangeTelefonoTipo}
        handleEditEmpleado={handleEditEmpleado}
      />

      <EmpleadosTable
        empleados={empleados}
        selectedEmpleadoIndex={selectedEmpleadoIndex}
        handleCheckboxChange={handleCheckboxChange}
      />
    </Container>
  );
}
