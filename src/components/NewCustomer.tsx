import { useEffect, useState } from "react";
import type { Customer } from "../pages/Clientes";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

type addCustomerProps = {
  addCustomer: (
    name: string,
    number: string,
    email: string,
    notes: string,
  ) => Promise<void>;
  updateCustomer: (
    id: string,
    name: string,
    number: string,
    email: string,
    notes: string,
  ) => Promise<void>;
  editingCustomer: Customer | null;
  open: boolean;
  onClose: () => void;
};

function NewCustomer({
  open,
  onClose,
  addCustomer,
  updateCustomer,
  editingCustomer,
}: addCustomerProps) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const resetFields = () => {
    setName("");
    setNumber("");
    setEmail("");
    setNotes("");
  };

  useEffect(() => {
    if (editingCustomer) {
      setName(editingCustomer.name);
      setNumber(editingCustomer.number);
      setEmail(editingCustomer.email);
      setNotes(editingCustomer.notes);
    } else {
      resetFields();
    }
  }, [editingCustomer]);

  async function handleSave() {
    if (!name.trim() || !number.trim() || !email.trim() || !notes.trim()) {
      return alert("Preencha todos os campos!");
    }
    try {
      if (editingCustomer) {
        await updateCustomer(editingCustomer.id, name, number, email, notes);
      } else {
        await addCustomer(name, number, email, notes);
      }
      resetFields();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar serviço:", error);
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
              {editingCustomer ? "Editar Cliente" : "Novo Cliente"}
            </Typography>
            <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
              {editingCustomer
                ? "Atualize as Informações do Cliente"
                : "Cadastre um novo cliente"}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => onClose()}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Typography sx={inputLabel}>Nome do Cliente</Typography>
          <TextField
            sx={inputStyle}
            type="text"
            variant="outlined"
            placeholder="Nome do cliente"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Typography sx={inputLabel}>Telefone</Typography>
          <TextField
            sx={inputStyle}
            variant="outlined"
            placeholder="(00)00000-0000"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
          <Typography sx={inputLabel}>Email</Typography>
          <TextField
            sx={inputStyle}
            type="email"
            variant="outlined"
            placeholder="cliente@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
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
            placeholder="Preferencias, alergias, histórico..."
            multiline
            rows={2}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </Box>
        <Box sx={{ gap: 2, mt: 2, display: "flex", justifyContent: "right" }}>
          <Button
            variant="outlined"
            sx={{ borderColor: "#d1d5db", color: "#000000", borderRadius: 2 }}
            onClick={() => {
              onClose();
              resetFields();
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#000000", borderRadius: 2 }}
            onClick={handleSave}
          >
            {editingCustomer ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}

export default NewCustomer;
