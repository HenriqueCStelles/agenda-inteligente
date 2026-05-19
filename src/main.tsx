import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import Agenda from "./pages/Agenda.tsx";
import Servicos from "./pages/Servicos.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import Clientes from "./pages/Clientes.tsx";
import Agendamentos from "./pages/Agendamentos.tsx";
import Solicitacoes from "./pages/Solicitacoes.tsx";
import Configuracoes from "./pages/Configuracoes.tsx";
import Personalizacao from "./pages/Personalizacao.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/agenda",
    element: (
      <PrivateRoute>
        <Agenda />
      </PrivateRoute>
    ),
  },
  {
    path: "/clientes",
    element: (
      <PrivateRoute>
        <Clientes />
      </PrivateRoute>
    ),
  },
  {
    path: "/servicos",
    element: (
      <PrivateRoute>
        <Servicos />
      </PrivateRoute>
    ),
  },
  {
    path: "/agendamentos",
    element: (
      <PrivateRoute>
        <Agendamentos />
      </PrivateRoute>
    ),
  },
  {
    path: "/solicitacoes",
    element: (
      <PrivateRoute>
        <Solicitacoes />
      </PrivateRoute>
    ),
  },
  {
    path: "/configuracoes",
    element: (
      <PrivateRoute>
        <Configuracoes />
      </PrivateRoute>
    ),
  },
  {
    path: "/personalizacao",
    element: (
      <PrivateRoute>
        <Personalizacao />
      </PrivateRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/changepassword",
    element: <ForgotPassword />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
