import Menu from "../components/Menu";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { doc, getDoc, setDoc } from "firebase/firestore";

import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { auth, db } from "../components/firebase";
import { useEffect, useState } from "react";

function Personalizacao() {
  const [appName, setAppName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "users", user.uid, "settings", "branding");

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          setAppName(data.appName || "");
          setLogoUrl(data.logoUrl || "");
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadSettings();
  }, []);

  async function saveAppName() {
    try {
      const user = auth.currentUser;
      if (!user) return;

      setLoading(true);

      await setDoc(
        doc(db, "users", user.uid, "settings", "branding"),
        {
          appName,
        },
        { merge: true },
      );

      alert("Nome salvo com sucesso!");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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
              Personalização
            </Typography>
            <Typography sx={{ color: "#6b7280" }}>
              Customize a aparência do sistema com a identidade visual da sua
              empresa
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              mb: 2,
              border: "1px solid #e5e5e5",
              borderRadius: 3,
              width: "50%",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 550 }}>Logo da Empresa</Typography>
              <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                Adicione o logo da sua empresa que aparecerá no painel
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}
            >
              <Box>
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: "#f9fafb",
                    border: "3px dotted #d1d5dc",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <InsertPhotoOutlinedIcon
                        sx={{ fontSize: 60, color: "#6b7280" }}
                      />
                    </Box>
                    <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                      Nenhum logo enviado
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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
                  >
                    Upload Logo
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box>
              <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                • Formatos aceitos: PNG, JPG, SVG
              </Typography>
              <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                • Tamanho recomendado: 500x500px
              </Typography>
              <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                • Tamanho máximo: 2MB
              </Typography>
            </Box>
          </Paper>
          <Paper
            elevation={0}
            sx={{
              padding: 2,
              mb: 2,
              border: "1px solid #e5e5e5",
              borderRadius: 3,
              width: "50%",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 550 }}>Nome da Empresa</Typography>
              <Typography sx={{ fontSize: 15, color: "#6b7280" }}>
                Nome que aparecerá na barra lateral e no cabeçalho
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: 550, fontSize: 15 }}>
                  Nome da empresa
                </Typography>
                <TextField
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  sx={{
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
                  }}
                />
              </Box>
            </Box>
            <Button
              onClick={saveAppName}
              disabled={loading}
              sx={{
                color: "#ffffff",
                backgroundColor: "#000",
                fontWeight: 550,
                borderRadius: 2,
                fontSize: 15,
                gap: 1,
                textTransform: "none",
              }}
            >
              Salvar Nome
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default Personalizacao;
