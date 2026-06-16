import { Box, Button, IconButton, Paper, Typography } from "@mui/material";
import Menu from "../components/Menu";

import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { MessageSquare } from "lucide-react";

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

function Dashboard() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

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
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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
          marginLeft: 0,
          marginRight: 0,
          paddingTop: 4,
          paddingLeft: 3,
          paddingRight: 3,
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
            <Typography></Typography>
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
            <Typography></Typography>
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
            <Typography></Typography>
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
            <Typography></Typography>
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
            <Paper>
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
                          borderRadius: 4,
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "right",
                      gap: 1,
                    }}
                  >
                    <IconButton
                      sx={{
                        color: "#000000c0",
                        border: "1px solid #e5e5e5",
                        borderRadius: 2,
                        height: 35,
                        gap: 1,
                        fontSize: 15,
                        fontWeight: 550,
                      }}
                    >
                      <MessageSquare />
                      Whatsapp
                    </IconButton>
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
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;
