import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";

type Day =
  | "Segunda"
  | "Terça"
  | "Quarta"
  | "Quinta"
  | "Sexta"
  | "Sábado"
  | "Domingo";

const diasSemana: Day[] = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
const initialDays = {
  Segunda: false,
  Terça: false,
  Quarta: false,
  Quinta: false,
  Sexta: false,
  Sábado: false,
  Domingo: false,
};

function Hours() {
  const [days, setDays] = useState<Record<Day, boolean>>(initialDays);
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [breakTime, setBreakTime] = useState<number>(0);

  const handleChange =
    (day: Day) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setDays((prev) => ({
        ...prev,
        [day]: event.target.checked,
      }));
    };

  async function saveConfig() {
    try {
      const user = auth.currentUser;
      if (!user) {
        return alert("usuario nao autenticado");
      }
      const activeDays = (Object.keys(days) as Day[]).filter(
        (day) => days[day],
      );
      const workingHours = {
        days: activeDays,
        openTime,
        closeTime,
        breakTime,
        updatedAt: new Date(),
      };
      await setDoc(
        doc(db, "users", user.uid),
        {
          workingHours,
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
        const workingHours = data.workingHours;
        if (!workingHours) return;
        const loadedDays = { ...initialDays };
        workingHours.days.forEach((day: Day) => {
          loadedDays[day] = true;
        });
        setDays(loadedDays);
        setOpenTime(workingHours.openTime || "");
        setCloseTime(workingHours.closeTime || "");
        setBreakTime(workingHours.breakTime || 0);
      } catch (error) {
        console.error("Erro ao carregar configurações:", error);
      }
    }
    loadConfig();
  }, []);

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
  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e5e5",
          padding: 3,
          borderRadius: 3,
          width: "60%",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 550 }}>
            Horários de Atendimento
          </Typography>
          <Typography sx={{ color: "#6b7280" }}>
            Configure os dias e horários de funcionamento do seu estabelecimento
          </Typography>
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 550 }}>Dias de atendimento</Typography>
          <Grid container spacing={2}>
            {diasSemana.map((day) => (
              <Grid key={day}>
                <FormControlLabel
                  control={
                    <Switch
                      sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                          color: "#000",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                          {
                            backgroundColor: "#000000",
                          },
                      }}
                      checked={days[day]}
                      onChange={handleChange(day)}
                    />
                  }
                  label={day}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
              Horário de início
            </Typography>
            <TextField
              sx={inputStyle}
              type="time"
              value={openTime}
              onChange={(event) => setOpenTime(event.target.value)}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
              Horário de término
            </Typography>
            <TextField
              sx={inputStyle}
              type="time"
              value={closeTime}
              onChange={(event) => setCloseTime(event.target.value)}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 550, fontSize: 14 }}>
              Intervalo (minutos)
            </Typography>
            <TextField
              sx={inputStyle}
              type="number"
              value={breakTime}
              slotProps={{ htmlInput: { maxLength: 2 } }}
              onChange={(event) => setBreakTime(Number(event.target.value))}
            />
          </Box>
        </Box>
        <Button
          sx={{
            fontWeight: 550,
            color: "#fff",
            backgroundColor: "#000",
            borderRadius: 2,
          }}
          onClick={saveConfig}
        >
          Salvar Horários
        </Button>
      </Paper>
    </Box>
  );
}

export default Hours;
