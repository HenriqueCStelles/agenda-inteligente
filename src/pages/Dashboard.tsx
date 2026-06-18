import { Box, Button, Paper, Typography } from "@mui/material";
import Menu from "../components/Menu";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../components/firebase";

type Schedule = {
  id: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  method: "manual" | "whatsapp";
  status:
    | "confirmado"
    | "pendente"
    | "semResposta"
    | "aguardando"
    | "cancelado";
};

type Request = {
  id: string;
  customer: string;
  type: "agendamento" | "remarcacao";
  status: "pendente" | "aprovada" | "recusada";
  createdAt: Timestamp;
};

function Dashboard() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [allSchedules, setAllSchedules] = useState<Schedule[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    async function fetchTodaySchedules() {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const today = new Date().toLocaleDateString("en-CA");

        const q = query(
          collection(db, "schedules"),
          where("userId", "==", user.uid),
          where("date", "==", today),
        );

        const querySnapshot = await getDocs(q);

        const scheduleData: Schedule[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Schedule, "id">),
        }));

        scheduleData.sort((a, b) => a.time.localeCompare(b.time));

        setSchedule(scheduleData);
      } catch (error) {
        console.error("Erro ao buscar agenda:", error);
      }
    }

    fetchTodaySchedules();
  }, []);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const user = auth.currentUser;

        if (!user) return;

        const q = query(
          collection(db, "requests"),
          where("userId", "==", user.uid),
          where("status", "==", "pendente"),
        );

        const snapshot = await getDocs(q);

        const data: Request[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Request, "id">),
        }));

        setRequests(data);
      } catch (error) {
        console.error("Erro ao buscar solicitações:", error);
      }
    }

    fetchRequests();
  }, []);

  useEffect(() => {
    async function fetchAllSchedules() {
      const user = auth.currentUser;

      if (!user) return;

      const q = query(
        collection(db, "schedules"),
        where("userId", "==", user.uid),
      );

      const snapshot = await getDocs(q);

      const data: Schedule[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Schedule, "id">),
      }));

      setAllSchedules(data);
    }

    fetchAllSchedules();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const totalHoje = schedule.length;

  const totalConfirmados = allSchedules.filter(
    (s) => s.status === "confirmado",
  ).length;

  const totalSemResposta = allSchedules.filter(
    (s) => s.status === "semResposta",
  ).length;

  const totalPendentes = allSchedules.filter(
    (s) => s.status === "pendente" || s.status === "aguardando",
  ).length;

  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const paperStyle = {
    padding: 2,
    mb: 2,
    border: "1px solid #e5e5e5",
    borderRadius: 3,
    width: "25%",
  };
  const titleBox = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const statusStyles = {
    confirmado: {
      backgroundColor: "#dcfce7",
      color: "#166534",
    },

    pendente: {
      backgroundColor: "#fef3c7",
      color: "#92400e",
    },

    semResposta: {
      backgroundColor: "#e5e7eb",
      color: "#374151",
    },

    aguardando: {
      backgroundColor: "#dbeafe",
      color: "#1d4ed8",
    },

    cancelado: {
      backgroundColor: "#fee2e2",
      color: "#b91c1c",
    },
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Menu />
      </Box>
      <Box
        sx={{
          ml: "255px",
          pt: 4,
          px: 3,
          width: "100%",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Box>
            <Typography sx={{ fontSize: 30, fontWeight: 550 }}>
              Dashboard
            </Typography>
            <Typography sx={{ color: "#6b7280" }}>{formattedDate}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Paper elevation={0} sx={paperStyle}>
            <Box sx={titleBox}>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Agendamentos Hoje
              </Typography>
              <Box>
                <CalendarTodayOutlinedIcon sx={{ color: "#6b7280" }} />
              </Box>
            </Box>
            <Typography
              sx={{
                mt: 1,
                fontSize: 32,
                fontWeight: 600,
              }}
            >
              {totalHoje}
            </Typography>
          </Paper>
          <Paper elevation={0} sx={paperStyle}>
            <Box sx={titleBox}>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Confirmados
              </Typography>
              <Box>
                <CheckCircleOutlineOutlinedIcon sx={{ color: "#00a63e" }} />
              </Box>
            </Box>
            <Typography
              sx={{
                mt: 1,
                fontSize: 32,
                fontWeight: 600,
              }}
            >
              {totalConfirmados}
            </Typography>
          </Paper>
          <Paper elevation={0} sx={paperStyle}>
            <Box sx={titleBox}>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Sem Resposta
              </Typography>
              <Box>
                <QueryBuilderIcon sx={{ color: "#f54a00" }} />
              </Box>
            </Box>
            <Typography
              sx={{
                mt: 1,
                fontSize: 32,
                fontWeight: 600,
              }}
            >
              {totalSemResposta}
            </Typography>
          </Paper>
          <Paper elevation={0} sx={paperStyle}>
            <Box sx={titleBox}>
              <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                Solicitações Pendentes
              </Typography>
              <Box>
                <ErrorOutlineOutlinedIcon
                  sx={{ fontSize: 25, color: "#155dfc" }}
                />
              </Box>
            </Box>
            <Typography
              sx={{
                mt: 1,
                fontSize: 32,
                fontWeight: 600,
              }}
            >
              {totalPendentes}
            </Typography>
          </Paper>
        </Box>
        <Paper
          elevation={0}
          sx={{
            padding: 2,
            mb: 2,
            border: "1px solid #e5e5e5",
            borderRadius: 2,
          }}
        >
          <Typography sx={{ fontWeight: 550, mb: 2 }}>Agenda do Dia</Typography>
          {schedule.length === 0 ? (
            <Paper
              sx={{
                padding: 2,
                borderRadius: 2,
                mb: 2,
                mx: 2,
                border: "1px solid #e5e5e5",
              }}
            >
              <Typography>Nenhum agendamento hoje</Typography>
            </Paper>
          ) : (
            schedule.map((schedule) => (
              <Paper
                elevation={0}
                key={schedule.id}
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  mb: 2,
                  mx: 2,
                  border: "1px solid #e5e5e5",
                }}
              >
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      width: "6%",
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          color: "#000000",
                          fontSize: 20,
                          fontWeight: 550,
                        }}
                      >
                        {schedule.time}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: 1200 }}>
                    <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography
                          sx={{
                            fontSize: 20,
                            fontWeight: 550,
                          }}
                        >
                          {schedule.customer}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          px: 1,
                          borderRadius: 2,
                          ...statusStyles[schedule.status],
                        }}
                      >
                        <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
                          {schedule.status === "semResposta"
                            ? "Sem Resposta"
                            : schedule.status.charAt(0).toUpperCase() +
                              schedule.status.slice(1)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            ))
          )}
        </Paper>

        <Paper
          elevation={0}
          sx={{
            padding: 2,
            mb: 2,
            border: "1px solid #bedbff",
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", mb: 3, justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Box>
                <ErrorOutlineOutlinedIcon
                  sx={{ fontSize: 20, mt: 0.2, color: "#155dfc" }}
                />
              </Box>
              <Typography sx={{ fontWeight: 550 }}>
                Solicitações Pendentes
              </Typography>
            </Box>
            <Box>
              <Button
                sx={{
                  color: "#000",
                  fontWeight: 550,
                  border: "1px solid #e5e5e5",
                  borderRadius: 2,
                  textTransform: "none",
                }}
                onClick={() => navigate("/solicitacoes")}
              >
                Ver todas
              </Button>
            </Box>
          </Box>
          {requests.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid #e5e5e5",
                borderRadius: 2,
              }}
            >
              <Typography color="#6b7280">
                Nenhuma solicitação pendente.
              </Typography>
            </Paper>
          ) : (
            requests.slice(0, 3).map((request) => (
              <Paper
                key={request.id}
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  border: "1px solid #bedbff",
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 550 }}>
                    {request.type === "agendamento"
                      ? "Novo agendamento"
                      : "Remarcação"}{" "}
                    - {request.customer}
                  </Typography>
                  <Typography sx={{ color: "#6b7280", fontSize: 14 }}>
                    {request.createdAt?.toDate().toLocaleDateString("pt-BR")} às{" "}
                    {request.createdAt?.toDate().toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
              </Paper>
            ))
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;
