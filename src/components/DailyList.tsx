import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

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

function DailyList() {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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

  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid #e5e5e5",
        padding: 3,
        borderRadius: 3,
      }}
    >
      <Typography sx={{ fontWeight: 550, mb: 2 }}>
        Agendamentos - {formattedDate}
      </Typography>
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
                      color: "#6b7280",
                      fontSize: 15,
                    }}
                  >
                    {schedule.date}
                  </Typography>

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
                <Typography sx={{ color: "#6b7280", fontSize: 15, mb: "4px" }}>
                  {schedule.service}
                </Typography>

                {schedule.notes?.trim() && (
                  <Typography
                    sx={{
                      fontStyle: "italic",
                      color: "#6b7280",
                      fontSize: 15,
                    }}
                  >
                    📌 {schedule.notes}
                  </Typography>
                )}
                <Box
                  sx={{
                    mt: 1,
                    backgroundColor: "#f3f4f6",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 1,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  <Typography sx={{ color: "#6b7280", fontSize: 14 }}>
                    {schedule.method === "whatsapp"
                      ? "📱 WhatsApp"
                      : "✍️ Manual"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        ))
      )}
    </Paper>
  );
}

export default DailyList;
