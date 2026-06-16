import { Box, Chip, Paper, Typography } from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/pt-br";
import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";

dayjs.locale("pt-br");

interface Schedule {
  id: string;
  customer: string;
  service: string;
  notes?: string;
  status: string;
  date: string;
  time: string;
  userId: string;
}

function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [appointments, setAppointments] = useState<Schedule[]>([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return;

    const formattedDate = selectedDate.format("YYYY-MM-DD");

    const q = query(
      collection(db, "schedules"),
      where("userId", "==", user.uid),
      where("date", "==", formattedDate),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAppointments(data);
    });

    return unsubscribe;
  }, [selectedDate]);

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr",
          },
          gap: 3,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 3,
            minHeight: 450,
          }}
        >
          <Typography variant="h6">Selecione uma data</Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={selectedDate}
                onChange={(newDate) => {
                  if (newDate) {
                    setSelectedDate(newDate);
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
        </Paper>
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: 3,
            minHeight: 450,
          }}
        >
          <Typography variant="h6">
            {selectedDate.format("DD [de] MMMM [de] YYYY")}
          </Typography>
          {appointments.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "80%",
              }}
            >
              <Typography color="text.secondary">Nenhum agendamento</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {appointments.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 700,
                          lineHeight: 1,
                          mb: 2,
                        }}
                      >
                        {item.time}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: 700,
                          mb: 0.5,
                        }}
                      >
                        {item.customer}
                      </Typography>
                      <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                        {item.service}
                      </Typography>
                    </Box>
                    <Chip
                      label={item.status}
                      sx={{
                        fontWeight: 500,
                        borderRadius: 2,
                        ...(item.status === "confirmado" && {
                          bgcolor: "#DCFCE7",
                          color: "#166534",
                        }),
                        ...(item.status === "pendente" && {
                          bgcolor: "#FEF3C7",
                          color: "#92400E",
                        }),
                        ...(item.status === "sem resposta" && {
                          bgcolor: "#F3F4F6",
                          color: "#374151",
                        }),
                      }}
                    />
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default Calendar;
