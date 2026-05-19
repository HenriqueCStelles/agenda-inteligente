import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";

import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ColorLensOutlinedIcon from "@mui/icons-material/ColorLensOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function App() {
  const [selected, setSelected] = useState("Dasboard");
  const menus = [
    {
      label: "Dashboard",
      icon: <DashboardOutlinedIcon />,
    },
    {
      label: "Agenda",
      icon: <CalendarTodayOutlinedIcon />,
    },
    {
      label: "Clientes",
      icon: <GroupOutlinedIcon />,
    },
    {
      label: "Serviços",
      icon: <CardTravelOutlinedIcon />,
    },
    {
      label: "Agendamentos",
      icon: <EventAvailableOutlinedIcon />,
    },
    {
      label: "Solicitações",
      icon: <NotificationsOutlinedIcon />,
    },
    {
      label: "Configurações",
      icon: <SettingsOutlinedIcon />,
    },
    {
      label: "Personalização",
      icon: <ColorLensOutlinedIcon />,
    },
  ];
  return (
    <Box
      sx={{
        width: "255px",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", padding: "15px" }}>
          <Box
            sx={{
              backgroundColor: "#3b82f6",
              borderRadius: "14px",
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CalendarTodayOutlinedIcon sx={{ color: "#ffff" }} />
          </Box>
          <Box sx={{ paddingLeft: "10px" }}>
            <Typography>Agenda</Typography>
            <Typography>Inteligente</Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ flex: 1 }}>
          <List>
            {menus.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => setSelected(item.label)}
                  sx={{
                    mx: 1,
                    mb: 1,
                    borderRadius: "12px",

                    background:
                      selected === item.label
                        ? "linear-gradient(90deg, #4f8cff, #3b6eea)"
                        : "transparent",

                    color: selected === item.label ? "#fff" : "#111827",

                    "&:hover": {
                      backgroundColor:
                        selected === item.label ? "#2563eb" : "#e5e7eb",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: selected === item.label ? "#fff" : "#4b5563",

                      minWidth: "40px",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button fullWidth sx={{ color: "#000000" }}>
            <LogoutOutlinedIcon />
            Sair
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default App;
