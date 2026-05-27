import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Automation() {
  const [dailyScheduleTime, setDailyScheduleTime] = useState("");
  const [dailyCustomerRemind, setDailyCustomerRemind] = useState("");
  const inputStyle = {
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

  async function saveConfig() {
    try {
      const user = auth.currentUser;
      if (!user) {
        return alert("usuario nao autenticado");
      }
      const remindsTime = {
        dailyScheduleTime,
        dailyCustomerRemind,
        updatedAt: new Date(),
      };
      await setDoc(
        doc(db, "users", user.uid),
        {
          remindsTime,
        },
        { merge: true },
      );
      console.log("Horários salvos com sucesso");
    } catch (error) {
      console.error("Erro ao salvar horários:", error);
    }
  }

  useEffect(() => {
    async function loadConfig() {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) return;
        const data = docSnap.data();
        const remindsTime = data.remindsTime;
        if (!remindsTime) return;
        setDailyScheduleTime(remindsTime.dailyScheduleTime || "");
        setDailyCustomerRemind(remindsTime.dailyCustomerRemind || "");
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    }
    loadConfig();
  }, []);

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e5e5",
          padding: 3,
          borderRadius: 3,
          width: "60%",
          mb: 3,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 550 }}>
            Configurações de Automação
          </Typography>
          <Typography sx={{ color: "#6b7280" }}>
            Configure quando as mensagens automáticas devem ser enviadas
          </Typography>
        </Box>
        <Box sx={{ mb: 2, display: "flex", gap: 3 }}>
          <Box sx={{ width: "50%" }}>
            <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
              Horário de envio da adenda diária
            </Typography>
            <TextField
              sx={inputStyle}
              type="time"
              value={dailyScheduleTime}
              onChange={(event) => setDailyScheduleTime(event.target.value)}
            />
            <Typography sx={{ color: "#6b7280", fontSize: 13 }}>
              Agenda será enviada ao profissional neste horário
            </Typography>
          </Box>
          <Box sx={{ width: "50%" }}>
            <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
              Horário de envio dos lembretes aos clientes
            </Typography>
            <TextField
              sx={inputStyle}
              type="time"
              value={dailyCustomerRemind}
              onChange={(event) => setDailyCustomerRemind(event.target.value)}
            />
            <Typography sx={{ color: "#6b7280", fontSize: 13 }}>
              Lembretes serão enviados após confirmação da agenda
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ paddingTop: 2, mb: 2 }}>
          <Typography sx={{ fontWeight: 550 }}>
            Configurações do WhatsApp
          </Typography>
          <Paper
            elevation={0}
            sx={{
              border: "1px solid #e5e5e5",
              padding: 3,
              borderRadius: 3,
              width: "95%",
              mt: 2,
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 550 }}>
                Integração com WhatsApp
              </Typography>
              <Typography sx={{ color: "#6b7280", fontSize: 14 }}>
                Status da conexão com a plataforma WhatsApp
              </Typography>
            </Box>
          </Paper>
        </Box>
        <Button
          sx={{
            fontWeight: 550,
            color: "#fff",
            backgroundColor: "#000",
            borderRadius: 2,
            textTransform: "none",
          }}
          onClick={saveConfig}
        >
          Salvar Configurações
        </Button>
      </Paper>
    </Box>
  );
}

export default Automation;
