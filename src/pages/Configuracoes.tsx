import { Box, Tab, Tabs, Typography } from "@mui/material";
import Menu from "../components/Menu";
import { useState } from "react";
import Hours from "../components/Hours";
import Messages from "../components/Messages";
import Automation from "../components/Automation";
import { Clock, MessageSquare, Settings } from "lucide-react";

function Configuracoes() {
  const [tab, setTab] = useState(0);

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return <Hours />;

      case 1:
        return <Messages />;

      case 2:
        return <Automation />;

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
              Configurações
            </Typography>
            <Typography sx={{ color: "#6b7280" }}>
              Configure os parâmetros do sistema
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
              icon={<Clock />}
              iconPosition="start"
              label="Horários"
            />
            <Tab
              sx={{ fontSize: 12, fontWeight: 550, color: "#6b7280" }}
              icon={<MessageSquare />}
              iconPosition="start"
              label="Mensagens"
            />
            <Tab
              sx={{ fontSize: 12, fontWeight: 550, color: "#6b7280" }}
              icon={<Settings />}
              iconPosition="start"
              label="Automação"
            />
          </Tabs>
          <Box>{renderTabContent()}</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Configuracoes;
