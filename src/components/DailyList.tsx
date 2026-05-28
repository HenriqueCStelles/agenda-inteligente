import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function DailyList() {
  const [currentDate, setCurrentDate] = useState(new Date());

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
      <Typography sx={{ fontWeight: 550 }}>
        Agendamentos - {formattedDate}
      </Typography>
    </Paper>
  );
}

export default DailyList;
