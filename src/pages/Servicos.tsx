import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import Menu from "../components/Menu";

import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import NewService from "../components/NewService";
import { auth, db } from "../components/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CardTravelOutlinedIcon from "@mui/icons-material/CardTravelOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

export type Service = {
  id: string;
  name: string;
  time: number;
  price: number;
  desc: string;
  userId: string;
};

function Servicos() {
  const [service, setService] = useState<Service[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    async function fetchService() {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const q = query(
          collection(db, "services"),
          where("userId", "==", user.uid),
        );
        const querySnapshot = await getDocs(q);
        const servicesData: Service[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Service, "id">),
        }));
        setService(servicesData);
      } catch (error) {
        console.error("erro ao buscar serviços:", error);
      }
    }
    fetchService();
  }, []);

  async function addService(
    name: string,
    time: number,
    price: number,
    desc: string,
  ) {
    try {
      const user = auth.currentUser;
      if (!user) {
        return alert("usuario nao autenticado");
      }
      const docRef = await addDoc(collection(db, "services"), {
        name,
        time,
        price,
        desc,
        userId: user.uid,
      });
      const newService = {
        id: docRef.id,
        name,
        time,
        price,
        desc,
        userId: user.uid,
      };
      setService((prev) => [...prev, newService]);
      setOpenDialog(false);
    } catch (error) {
      console.error("erro ao adicionar serviço:", error);
    }
  }

  async function updateService(
    id: string,
    name: string,
    time: number,
    price: number,
    desc: string,
  ) {
    try {
      const serviceRef = doc(db, "services", id);
      await updateDoc(serviceRef, { name, time, price, desc });
      setService((prev) =>
        prev.map((service) =>
          service.id === id ? { ...service, name, time, price, desc } : service,
        ),
      );
      setEditingService(null);
    } catch (error) {
      console.error("Erro ao atualizar serviço:", error);
    }
  }

  async function deleteService(id: string) {
    const confirmDelete = window.confirm("Deseja deletar este serviço?");
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "services", id));
      setService((prev) => prev.filter((service) => service.id !== id));
    } catch (error) {
      console.log("Erro ao deletar serviço:", error);
    }
  }

  function handleEdit(service: Service) {
    setEditingService(service);
    setOpenDialog(true);
  }

  function handleOpen() {
    setOpenDialog(true);
  }

  function handleClose() {
    setOpenDialog(false);
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography sx={{ fontSize: 30, fontWeight: 550 }}>
                Serviços
              </Typography>
              <Typography>Gerencie os serviços oferecidos</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#000000",
                  gap: 1,
                  px: 1,
                  borderRadius: 3,
                  fontWeight: 550,
                }}
                onClick={() => handleOpen()}
              >
                <AddIcon />
                Novo Serviço
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Grid container spacing={2}>
            {service.map((service) => (
              <Grid key={service.id}>
                <Paper
                  elevation={3}
                  sx={{ width: 450, padding: 3, borderRadius: 5 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f3e8ff",
                        color: "#9810fa",
                      }}
                    >
                      <CardTravelOutlinedIcon />
                    </Box>
                    <Box>
                      <IconButton onClick={() => handleEdit(service)}>
                        <EditNoteOutlinedIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: "#ff0000" }}
                        onClick={() => deleteService(service.id)}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography sx={{ fontWeight: 550, fontSize: 20 }}>
                        {service.name}
                      </Typography>
                      <Typography sx={{ color: "#6b7280" }}>
                        {service.desc}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: 20, color: "#6b7280" }} />
                      <Typography>
                        <Box component="span">{service.time} minutos</Box>
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <AttachMoneyIcon
                        sx={{ fontSize: 20, color: "#6b7280" }}
                      />
                      <Typography
                        sx={{
                          fontWeight: 550,
                          display: "flex",
                          color: "#1dc01d",
                        }}
                      >
                        R$ {service.price}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <NewService
        open={openDialog}
        onClose={handleClose}
        addService={addService}
        updateService={updateService}
        editingService={editingService}
      />
    </Box>
  );
}

export default Servicos;
