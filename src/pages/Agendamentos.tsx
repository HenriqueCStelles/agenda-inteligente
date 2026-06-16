import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Menu from "../components/Menu";

import AddIcon from "@mui/icons-material/Add";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import NewSchedule from "../components/NewSchedule";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../components/firebase";
import { MessageSquare, SquarePen, Trash2 } from "lucide-react";

export type Schedule = {
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

function Agendamentos() {
  const [status, setStatus] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [search, setSearch] = useState("");

  const inputStyle = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      backgroundColor: "#f3f4f6",
      height: 40,

      "& fieldset": {
        border: "1px solid #e5e7eb",
      },

      "&:hover fieldset": {
        borderColor: "#d1d5db",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#3b82f6",
      },
    },

    "& input": {
      padding: "4px 12px",
    },
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

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const q = query(
          collection(db, "schedules"),
          where("userId", "==", user.uid),
        );
        const querySnapshot = await getDocs(q);
        const scheduleData: Schedule[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Schedule, "id">),
        }));
        setSchedule(scheduleData);
      } catch (error) {
        console.error("erro ao buscar clientes:", error);
      }
    }
    fetchSchedule();
  }, []);

  async function addSchedule(
    customer: string,
    service: string,
    date: string,
    time: string,
    notes: string,
    method: "manual" | "whatsapp",
    status:
      | "confirmado"
      | "pendente"
      | "semResposta"
      | "aguardando"
      | "cancelado",
  ) {
    try {
      const user = auth.currentUser;
      if (!user) {
        return alert("usuario nao autenticado");
      }
      const docRef = await addDoc(collection(db, "schedules"), {
        customer,
        service,
        date,
        time,
        notes,
        method,
        status,
        userId: user.uid,
      });
      const newSchedule = {
        id: docRef.id,
        customer,
        service,
        date,
        time,
        notes,
        method,
        status,
        userId: user.uid,
      };
      setSchedule((prev) => [...prev, newSchedule]);
      setOpenDialog(false);
    } catch (error) {
      console.error("erro ao adicionar agendamento:", error);
    }
  }

  async function updateSchedule(
    id: string,
    customer: string,
    service: string,
    date: string,
    time: string,
    notes: string,
    method: "manual" | "whatsapp",
    status:
      | "confirmado"
      | "pendente"
      | "semResposta"
      | "aguardando"
      | "cancelado",
  ) {
    try {
      const scheduleRef = doc(db, "schedules", id);
      await updateDoc(scheduleRef, {
        customer,
        service,
        date,
        time,
        notes,
        method,
        status,
      });
      setSchedule((prev) =>
        prev.map((schedule) =>
          schedule.id === id
            ? {
                ...schedule,
                customer,
                service,
                date,
                time,
                notes,
                method,
                status,
              }
            : schedule,
        ),
      );
      setEditingSchedule(null);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  }

  async function deleteSchedule(id: string) {
    const confirmDelete = window.confirm("Deseja deletar este agendamento?");
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "schedules", id));
      setSchedule((prev) => prev.filter((schedule) => schedule.id !== id));
    } catch (error) {
      console.log("Erro ao deletar agendamento:", error);
    }
  }

  function handleEdit(schedule: Schedule) {
    setEditingSchedule(schedule);
    setOpenDialog(true);
  }

  function handleOpen() {
    setEditingSchedule(null);
    setOpenDialog(true);
  }

  function handleClose() {
    setEditingSchedule(null);
    setOpenDialog(false);
  }

  const filteredSchedules = schedule.filter((schedule) => {
    const term = search.toLowerCase().trim();

    return (
      schedule.customer.toLowerCase().includes(term) ||
      schedule.service.includes(term)
    );
  });

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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontSize: 30, fontWeight: 550 }}>
                Agendamentos
              </Typography>
              <Typography sx={{ color: "#6b7280" }}>
                Gerencie todos os agendamentos
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000000",
                  gap: 1,
                  px: 1,
                  borderRadius: 3,
                  fontWeight: 550,
                  textTransform: "none",
                }}
                onClick={() => handleOpen()}
              >
                <AddIcon />
                Novo Agendamento
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Paper
            elevation={0}
            sx={{ border: "1px solid #e5e5e5", borderRadius: 2 }}
          >
            <Box sx={{ padding: 2, paddingBottom: 0, display: "flex", gap: 1 }}>
              <TextField
                sx={{ ...inputStyle, width: "80%" }}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon sx={{ color: "#abafb4" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Buscar por cliente ou horário..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select
                defaultValue=""
                displayEmpty
                sx={{
                  ...inputStyle,
                  width: "20%",
                  "& .MuiSelect-select": {
                    padding: "14px",
                    backgroundColor: "#f3f4f6",
                  },
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  height: 40,
                }}
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <MenuItem value="">Todos os status</MenuItem>
                <MenuItem value="confirmado">Confirmado</MenuItem>
                <MenuItem value="pendente">Pendente</MenuItem>
                <MenuItem value="semResposta">Sem Resposta</MenuItem>
                <MenuItem value="aguardando">Aguardando</MenuItem>
                <MenuItem value="cancelado">Cancelado</MenuItem>
              </Select>
            </Box>
            <Box sx={{ paddingBottom: 1 }}>
              <Grid>
                {filteredSchedules.map((schedule) => (
                  <Grid key={schedule.id}>
                    <Paper
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
                              <Typography
                                sx={{ fontSize: 14, fontWeight: 600 }}
                              >
                                {schedule.status === "semResposta"
                                  ? "Sem Resposta"
                                  : schedule.status.charAt(0).toUpperCase() +
                                    schedule.status.slice(1)}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography
                            sx={{ color: "#6b7280", fontSize: 15, mb: "4px" }}
                          >
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
                          <IconButton
                            sx={{
                              color: "#000000c0",
                              border: "1px solid #e5e5e5",
                              borderRadius: 2,
                              height: 35,
                              width: 40,
                            }}
                            onClick={() => handleEdit(schedule)}
                          >
                            <SquarePen />
                          </IconButton>
                          <IconButton
                            sx={{
                              color: "#ff0000c0",
                              border: "1px solid #e5e5e5",
                              borderRadius: 2,
                              height: 35,
                              width: 40,
                            }}
                            onClick={() => deleteSchedule(schedule.id)}
                          >
                            <Trash2 />
                          </IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Box>
      <NewSchedule
        open={openDialog}
        onClose={handleClose}
        addSchedule={addSchedule}
        updateSchedule={updateSchedule}
        editingSchedule={editingSchedule}
      />
    </Box>
  );
}

export default Agendamentos;
