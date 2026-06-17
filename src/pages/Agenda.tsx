import { Box, Tab, Tabs, Typography } from "@mui/material";
import Menu from "../components/Menu";
import { useState } from "react";
import DailyList from "../components/DailyList";
import Calendar from "../components/Calendar";

function Agenda() {
  const [tab, setTab] = useState(0);

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <DailyList />;

      case 1:
        return <Calendar />;

      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Menu />
      </Box>
      <Box
        sx={{
          ml: "255px",
          pt: 4,
          px: 3,
          width: "100%",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Box>
            <Typography sx={{ fontSize: 30, fontWeight: 550 }}>
              Agenda
            </Typography>
            <Typography sx={{ color: "#6b7280" }}>
              Visualize e gerencie seus agendamentos
            </Typography>
          </Box>
        </Box>
        <Box>
          <Tabs
            value={tab}
            onChange={(e, value) => setTab(value)}
            sx={{
              mb: 4,
              backgroundColor: "#ececf0",
              borderRadius: 3,
              color: "#000",
              width: "fit-content",
              p: 0.5,
              height: 40,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Tab
              sx={{ fontSize: 12, fontWeight: 550, color: "#6b7280" }}
              label="Lista Diária"
            />
            <Tab
              sx={{ fontSize: 12, fontWeight: 550, color: "#6b7280" }}
              label="Calendário"
            />
          </Tabs>
          <Box>{renderTabContent()}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Agenda;
