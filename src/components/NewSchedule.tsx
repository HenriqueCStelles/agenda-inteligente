import {
  Dialog,
  IconButton,
  Paper,
  TextField,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import type { Schedule } from "../pages/Agendamentos";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

type addScheduleProps = {
  addSchedule: (
    customer: string,
    service: string,
    date: string,
    time: string,
    notes: string,
  ) => Promise<void>;
  updateSchedule: (
    id: string,
    customer: string,
    service: string,
    date: string,
    time: string,
    notes: string,
  ) => Promise<void>;
  editingSchedule: Schedule | null;
  open: boolean;
  onClose: () => void;
};

type Customer = {
  id: string;
  name: string;
};

type Service = {
  id: string;
  name: string;
  time: number;
};

function NewSchedule({
  open,
  onClose,
  addSchedule,
  updateSchedule,
  editingSchedule,
}: addScheduleProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const customersSnapshot = await getDocs(collection(db, "customers"));
        const customersList: Customer[] = customersSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
          };
        });
        setCustomers(customersList);

        const servicesSnapshot = await getDocs(collection(db, "services"));
        const servicesList: Service[] = servicesSnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            name: data.name || "",
            time: data.time || 0,
          };
        });

        setServices(servicesList);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      }
    }

    fetchData();
  }, []);

  const resetFields = () => {
    setSelectedCustomer("");
    setSelectedService("");
    setDate("");
    setTime("");
    setNotes("");
  };

  useEffect(() => {
    if (editingSchedule) {
      setSelectedCustomer(editingSchedule.customer);
      setSelectedService(editingSchedule.service);
      setDate(editingSchedule.date);
      setTime(editingSchedule.time);
      setNotes(editingSchedule.notes);
    } else {
      resetFields();
    }
  }, [editingSchedule]);

  async function handleSave() {
    if (!selectedService.trim() || !date.trim() || !time.trim()) {
      return alert("Preencha todos os campos!");
    }
    try {
      if (editingSchedule) {
        await updateSchedule(
          editingSchedule.id,
          selectedCustomer,
          selectedService,
          date,
          time,
          notes,
        );
      } else {
        await addSchedule(selectedCustomer, selectedService, date, time, notes);
      }
      resetFields();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar agendamento:", error);
    }
  }

  const inputStyle = {
    mb: 2,
    width: "100%",
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
  const inputLabel = {
    fontWeight: 550,
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper sx={{ width: 450, p: 3 }}>
        <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontWeight: 550, fontSize: 20 }}>
              {editingSchedule ? "Editar Agendamento" : "Novo Agendamento"}
            </Typography>
            <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
              {editingSchedule
                ? "Atualize as Informações do Agendamento"
                : "Cadastre um novo agendamento manualmente"}
            </Typography>
          </Box>
          <Box>
            <IconButton
              onClick={() => {
                onClose();
                resetFields();
              }}
            >
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Typography sx={inputLabel}>Cliente</Typography>
          <Select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            displayEmpty
            sx={{
              ...inputStyle,
              "& .MuiSelect-select": {
                padding: "14px",
                backgroundColor: "#f3f4f6",
              },
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              height: 40,
            }}
          >
            <MenuItem disabled value="">
              Selecione o cliente
            </MenuItem>
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.name}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
          <Typography sx={inputLabel}>Serviço</Typography>
          <Select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            displayEmpty
            sx={{
              ...inputStyle,
              "& .MuiSelect-select": {
                padding: "14px",
                backgroundColor: "#f3f4f6",
              },
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              height: 40,
            }}
          >
            <MenuItem disabled value="">
              Selecione o serviço
            </MenuItem>
            {services.map((serviceItem) => (
              <MenuItem key={serviceItem.id} value={serviceItem.name}>
                {serviceItem.name} ({serviceItem.time}min)
              </MenuItem>
            ))}
          </Select>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box sx={{ width: "50%" }}>
              <Typography sx={inputLabel}>Data</Typography>
              <TextField
                sx={inputStyle}
                type="date"
                variant="outlined"
                required
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography sx={inputLabel}>Horário</Typography>
              <TextField
                sx={inputStyle}
                type="time"
                variant="outlined"
                required
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </Box>
          </Box>
          <Typography sx={inputLabel}>Observações</Typography>
          <TextField
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                height: 80,
                borderRadius: "10px",
                backgroundColor: "#f3f4f6",
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
            }}
            type="text"
            variant="outlined"
            placeholder="Observações do agendamento..."
            multiline
            rows={2}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </Box>
        <Box sx={{ gap: 2, mt: 2, display: "flex", justifyContent: "right" }}>
          <Button
            variant="outlined"
            sx={{
              borderColor: "#d1d5db",
              color: "#000000",
              borderRadius: 2,
              textTransform: "none",
            }}
            onClick={() => {
              onClose();
              resetFields();
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000000",
              borderRadius: 2,
              textTransform: "none",
            }}
            onClick={handleSave}
          >
            {editingSchedule ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}

export default NewSchedule;
