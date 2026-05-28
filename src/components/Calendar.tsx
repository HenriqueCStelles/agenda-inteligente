import { Box, Paper, Typography } from "@mui/material";

function Calendar() {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e5e5",
          padding: 3,
          borderRadius: 3,
          width: "50%",
        }}
      >
        <Typography sx={{ fontWeight: 550 }}>Selecione uma data</Typography>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e5e5",
          padding: 3,
          borderRadius: 3,
          width: "50%",
        }}
      ></Paper>
    </Box>
  );
}

export default Calendar;
