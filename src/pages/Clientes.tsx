import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Menu from "../components/Menu";
import AddIcon from "@mui/icons-material/Add";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { useEffect, useState } from "react";
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
import NewCustomer from "../components/NewCustomer";
import { MessageSquare, SquarePen, Trash2 } from "lucide-react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export type Customer = {
  id: string;
  name: string;
  number: string;
  email: string;
  notes: string;
};

function Clientes() {
  const [customer, setCustomer] = useState<Customer[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const q = query(
          collection(db, "customers"),
          where("userId", "==", user.uid),
        );
        const querySnapshot = await getDocs(q);
        const customersData: Customer[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Customer, "id">),
        }));
        setCustomer(customersData);
      } catch (error) {
        console.error("erro ao buscar clientes:", error);
      }
    }
    fetchCustomer();
  }, []);

  async function addCustomer(
    name: string,
    number: string,
    email: string,
    notes: string,
  ) {
    try {
      const user = auth.currentUser;
      if (!user) {
        return alert("usuario nao autenticado");
      }
      const docRef = await addDoc(collection(db, "customers"), {
        name,
        number,
        email,
        notes,
        userId: user.uid,
      });
      const newCustomer = {
        id: docRef.id,
        name,
        number,
        email,
        notes,
        userId: user.uid,
      };
      setCustomer((prev) => [...prev, newCustomer]);
      setOpenDialog(false);
    } catch (error) {
      console.error("erro ao adicionar serviço:", error);
    }
  }

  async function updateCustomer(
    id: string,
    name: string,
    number: string,
    email: string,
    notes: string,
  ) {
    try {
      const customerRef = doc(db, "customers", id);
      await updateDoc(customerRef, { name, number, email, notes });
      setCustomer((prev) =>
        prev.map((customer) =>
          customer.id === id
            ? { ...customer, name, number, email, notes }
            : customer,
        ),
      );
      setEditingCustomer(null);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  }

  async function deleteCustomer(id: string) {
    const confirmDelete = window.confirm("Deseja deletar este cliente?");
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, "customers", id));
      setCustomer((prev) => prev.filter((customer) => customer.id !== id));
    } catch (error) {
      console.log("Erro ao deletar cliente:", error);
    }
  }

  function handleEdit(customer: Customer) {
    setEditingCustomer(customer);
    setOpenDialog(true);
  }

  function handleOpen() {
    setOpenDialog(true);
  }

  function handleClose() {
    setOpenDialog(false);
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
        borderColor: "#5c5b5baf",
      },
    },

    "& input": {
      padding: "4px 12px",
    },
  };

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
                Clientes
              </Typography>
              <Typography>Gerencie seus clientes cadastrados</Typography>
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
                Novo Cliente
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Paper
            elevation={0}
            sx={{ border: "1px solid #e5e5e5", borderRadius: 2 }}
          >
            <Box sx={{ padding: 2, paddingBottom: 0 }}>
              <TextField
                sx={inputStyle}
                fullWidth
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlinedIcon sx={{ color: "#abafb4" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                placeholder="Buscar por nome ou telefone..."
              />
            </Box>
            <Box sx={{ paddingBottom: 1 }}>
              <Grid>
                {customer.map((customer) => (
                  <Grid key={customer.id}>
                    <Paper
                      sx={{
                        padding: 2,
                        borderRadius: 2,
                        mb: 2,
                        mx: 2,
                        border: "1px solid #e5e5e5",
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Box
                          sx={{
                            color: "#155dfc",
                            backgroundColor: "#dbeafe",
                            height: 48,
                            width: 48,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                          }}
                        >
                          <PersonOutlinedIcon sx={{ fontSize: 30 }} />
                        </Box>
                        <Box sx={{ width: 1200 }}>
                          <Typography
                            sx={{ fontSize: 20, fontWeight: 550, mb: "4px" }}
                          >
                            {customer.name}
                          </Typography>
                          <Typography
                            sx={{ color: "#6b7280", fontSize: 15, mb: "4px" }}
                          >
                            📞 {customer.number}
                          </Typography>
                          <Typography sx={{ color: "#6b7280", fontSize: 15 }}>
                            ✉️ {customer.email}
                          </Typography>
                          {customer.notes?.trim() && (
                            <Typography
                              sx={{
                                backgroundColor: "#fffbeb",
                                border: "1px solid #fee685",
                                borderRadius: 1,
                                padding: 1,
                                mt: 1,
                                display: "flex",
                                fontSize: 15,
                              }}
                            >
                              <Box sx={{ fontWeight: 550 }}>Observações:</Box>{" "}
                              {customer.notes}
                            </Typography>
                          )}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "right",
                            gap: 1,
                          }}
                        >
                          <IconButton
                            sx={{
                              color: "#000000c0",
                              border: "1px solid #e5e5e5",
                              borderRadius: 2,
                              height: 35,
                              gap: 1,
                              fontSize: 15,
                              fontWeight: 550,
                            }}
                          >
                            <MessageSquare />
                            Whatsapp
                          </IconButton>
                          <IconButton
                            sx={{
                              color: "#000000c0",
                              border: "1px solid #e5e5e5",
                              borderRadius: 2,
                              height: 35,
                              width: 40,
                            }}
                            onClick={() => handleEdit(customer)}
                          >
                            <SquarePen />
                          </IconButton>
                          <IconButton
                            sx={{
                              color: "#ff0000c0",
                              border: "1px solid #e5e5e5",
                              borderRadius: 2,
                              height: 35,
                              width: 40,
                            }}
                            onClick={() => deleteCustomer(customer.id)}
                          >
                            <Trash2 />
                          </IconButton>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Box>
      <NewCustomer
        open={openDialog}
        onClose={handleClose}
        addCustomer={addCustomer}
        updateCustomer={updateCustomer}
        editingCustomer={editingCustomer}
      />
    </Box>
  );
}

export default Clientes;
