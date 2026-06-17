import { Box, Button, Paper, Typography } from "@mui/material";
import Menu from "../components/Menu";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  type Timestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";

type Request = {
  id: string;
  customer: string;
  phone: string;
  service: string;
  desiredDate: string;
  desiredTime: string;
  message: string;
  type: "agendamento" | "remarcacao";
  status: "pendente" | "aprovada" | "recusada";
  createdAt: Timestamp;
  userId: string;
};

function Solicitacoes() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    async function fetchRequests() {
      const user = auth.currentUser;

      if (!user) return;

      const q = query(
        collection(db, "requests"),
        where("userId", "==", user.uid),
        where("status", "==", "pendente"),
      );

      const snapshot = await getDocs(q);

      const data: Request[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Request, "id">),
      }));

      setRequests(data);
    }

    fetchRequests();
  }, []);

  async function approveRequest(request: Request) {
    await addDoc(collection(db, "schedules"), {
      customer: request.customer,
      service: request.service,
      date: request.desiredDate,
      time: request.desiredTime,
      notes: request.message,
      method: "whatsapp",
      status: "aguardando",
      userId: request.userId,
    });

    await updateDoc(doc(db, "requests", request.id), {
      status: "aprovada",
    });
  }

  async function rejectRequest(requestId: string) {
    await updateDoc(doc(db, "requests", requestId), {
      status: "recusada",
    });
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Menu />
      </Box>
      <Box
        sx={{
          marginLeft: 0,
          marginRight: 0,
          paddingTop: 4,
          paddingLeft: 3,
          paddingRight: 3,
          width: "100%",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Box>
            <Typography sx={{ fontSize: 30, fontWeight: 550 }}>
              Solicitações Pendentes
            </Typography>
            <Typography sx={{ color: "#6b7280" }}>
              Gerencie as solicitações de agendamento e remarcação dos clientes
            </Typography>
          </Box>
        </Box>
        <Box>
          {requests.length === 0 ? (
            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: "1px solid #e5e5e5",
                borderRadius: 3,
              }}
            >
              <Typography>Nenhuma solicitação pendente.</Typography>
            </Paper>
          ) : (
            requests.map((request) => (
              <Paper
                key={request.id}
                elevation={0}
                sx={{
                  p: 2,
                  mb: 2,
                  border: "1px solid #bedbff",
                  borderRadius: 3,
                }}
              >
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Box sx={{ color: "#155dfc" }}>
                    <ErrorOutlineOutlinedIcon sx={{ fontSize: 30, mt: 0.2 }} />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography sx={{ fontWeight: 550, fontSize: 20 }}>
                      Nova Solicitação de Agendamento
                    </Typography>
                    <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                      Recebido em 20/03/2026 às 14:30
                    </Typography>
                  </Box>
                </Box>
                <Paper
                  elevation={0}
                  sx={{
                    padding: 2,
                    mb: 2,
                    border: "1px solid #e5e5e5",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontWeight: 550, fontSize: 20 }}>
                      Informações do Cliente
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ width: "50%" }}>
                      <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                        Cliente:
                      </Typography>
                    </Box>
                    <Box sx={{ width: "50%" }}>
                      <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                        Telefone:
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
                <Paper
                  elevation={0}
                  sx={{
                    padding: 2,
                    mb: 2,
                    border: "1px solid #e5e5e5",
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ mb: 1 }}>
                    <Typography sx={{ fontWeight: 550, fontSize: 20 }}>
                      Detalhes da Solicitação
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", mb: 3 }}>
                    <Box sx={{ width: "33%" }}>
                      <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                        Serviço:
                      </Typography>
                    </Box>
                    <Box sx={{ width: "33%" }}>
                      <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                        Data desejada:
                      </Typography>
                    </Box>
                    <Box sx={{ width: "33%" }}>
                      <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                        Horário desejado:
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                      Mensagem do cliente:
                    </Typography>
                  </Box>
                </Paper>
                <Box sx={{ gap: 1, display: "flex" }}>
                  <Button
                    sx={{
                      backgroundColor: "#00a63e",
                      color: "#fff",
                      fontWeight: 550,
                      gap: 1,
                      fontSize: 15,
                      borderRadius: 2,
                      textTransform: "none",
                    }}
                    onClick={() => approveRequest(request)}
                  >
                    <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 24 }} />
                    Aprovar Solicitação
                  </Button>
                  <Button
                    sx={{
                      color: "#000",
                      fontWeight: 550,
                      border: "1px solid #e5e5e5",
                      borderRadius: 2,
                      fontSize: 15,
                      gap: 1,
                      textTransform: "none",
                    }}
                    onClick={() => rejectRequest(request.id)}
                  >
                    <CancelOutlinedIcon sx={{ fontSize: 24 }} />
                    Recusar
                  </Button>
                  <Button
                    sx={{
                      color: "#000",
                      fontWeight: 550,
                      border: "1px solid #e5e5e5",
                      borderRadius: 2,
                      fontSize: 15,
                      gap: 1,
                      textTransform: "none",
                    }}
                    onClick={() =>
                      window.open(`https://wa.me/${request.phone}`, "_blank")
                    }
                  >
                    <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 24 }} />
                    Abrir WhatsApp
                  </Button>
                </Box>
              </Paper>
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Solicitacoes;
