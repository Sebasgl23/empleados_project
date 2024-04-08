import { Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import Login from "./Login";

function Router() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default Router;
