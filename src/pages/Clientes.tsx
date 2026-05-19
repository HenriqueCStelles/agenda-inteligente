import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Menu from "../components/Menu";

import AddIcon from "@mui/icons-material/Add";
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
          <Paper elevation={3}>
            <Box sx={{ padding: 2 }}>
              <TextField
                fullWidth
                placeholder="Buscar por nome ou telefone..."
              />
            </Box>
            <Box>
              <Grid>
                {customer.map((customer) => (
                  <Grid key={customer.id}>
                    <Paper sx={{ padding: 3, borderRadius: 2, mb: 2, mx: 2 }}>
                      <Box sx={{ display: "flex" }}>
                        <Box></Box>
                        <Box>
                          <Typography>{customer.name}</Typography>
                          <Typography>{customer.number}</Typography>
                          <Typography>{customer.email}</Typography>
                        </Box>
                        <Box>
                          <IconButton></IconButton>
                          <IconButton
                            onClick={() => handleEdit(customer)}
                          ></IconButton>
                          <IconButton
                            onClick={() => deleteCustomer(customer.id)}
                          ></IconButton>
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
