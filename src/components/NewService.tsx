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
import { useEffect, useState } from "react";
import type { Service } from "../pages/Servicos";

type addServiceProps = {
  addService: (
    name: string,
    time: number,
    price: number,
    desc: string,
  ) => Promise<void>;
  updateService: (
    id: string,
    name: string,
    time: number,
    price: number,
    desc: string,
  ) => Promise<void>;
  editingService: Service | null;
  open: boolean;
  onClose: () => void;
};

function NewService({
  open,
  onClose,
  addService,
  updateService,
  editingService,
}: addServiceProps) {
  const [name, setName] = useState("");
  const [time, setTime] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [desc, setDesc] = useState("");

  const resetFields = () => {
    setName("");
    setTime(0);
    setPrice(0);
    setDesc("");
  };

  useEffect(() => {
    if (editingService) {
      setName(editingService.name);
      setTime(editingService.time);
      setPrice(editingService.price);
      setDesc(editingService.desc);
    } else {
      resetFields();
    }
  }, [editingService]);

  async function handleSave() {
    if (!name.trim() || time <= 0 || price <= 0 || !desc.trim()) {
      return alert("Preencha todos os campos!");
    }
    try {
      if (editingService) {
        await updateService(editingService.id, name, time, price, desc);
      } else {
        await addService(name, time, price, desc);
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
      <Paper sx={{ width: 450, height: 370, p: 3 }}>
        <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontWeight: 550, fontSize: 20 }}>
              {editingService ? "Editar Serviço" : "Novo Serviço"}
            </Typography>
            <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
              {editingService
                ? "Atualize as Informações do Serviço"
                : "Cadastre um novo serviço"}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => onClose()}>
              <CloseIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        </Box>
        <Box>
          <Typography sx={inputLabel}>Nome do Serviço</Typography>
          <TextField
            sx={inputStyle}
            type="text"
            variant="outlined"
            placeholder="Ex: Corte de cabelo"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box>
              <Typography sx={inputLabel}>Duração (minutos)</Typography>
              <TextField
                sx={inputStyle}
                type="number"
                variant="outlined"
                value={time}
                onChange={(event) => setTime(Number(event.target.value))}
              />
            </Box>
            <Box>
              <Typography sx={inputLabel}>Preço (R$)</Typography>
              <TextField
                sx={inputStyle}
                type="number"
                variant="outlined"
                value={price}
                onChange={(event) => setPrice(Number(event.target.value))}
              />
            </Box>
          </Box>
          <Typography sx={inputLabel}>Descrição</Typography>
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
            placeholder="Descreva o serviço..."
            multiline
            rows={2}
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
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
            {editingService ? "Salvar Alterações" : "Salvar"}
          </Button>
        </Box>
      </Paper>
    </Dialog>
  );
}

export default NewService;
