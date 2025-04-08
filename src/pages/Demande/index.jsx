import React, { useState, useEffect } from "react";
import { Box, useTheme, MenuItem, Select } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { getDemande } from "../../APIcons/admin/apiDemande"; // Assurez-vous que l'API fonctionne bien
import Topbar from "../global/Topbar";
import Header from "../../components/Header";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // États locaux pour gérer les données
  const [dataaff, setDataaff] = useState([]);  // Les données de demandes
  const [loading, setLoading] = useState(true);  // Pour gérer l'état de chargement
  const [error, setError] = useState(null);  // Pour gérer les erreurs
  const [roleDemande, setRoleDemande] = useState("user");  // Le rôle sélectionné pour filtrer

  // Fonction pour récupérer les données
  const fetchData = async (role) => {
    try {
      const response = await getDemande(role);

      if (!response || response.length === 0) {
        // Si la réponse est vide ou invalide
        console.error("Aucune donnée reçue de l'API");
        setDataaff([]);  // Vider les données si rien n'est récupéré
      } else {
        console.log(response);  // Afficher la réponse pour débogage
        setDataaff(response);   // Mettre à jour l'état des données
      }
      setLoading(false);  // Désactiver le chargement
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
      setError(error);  // Gérer l'erreur
      setLoading(false); // Désactiver le chargement
    }
  };

  useEffect(() => {
    fetchData(roleDemande);  // Appel initial à l'API
  }, [roleDemande]);  // L'API sera appelée chaque fois que `roleDemande` change

  // Gérer le changement de rôle (USER/BRAND)
  const handleRoleChange = (e) => {
    setRoleDemande(e.target.value);
  };

  // Colonnes pour le DataGrid
  const columns = [
    { field: "idDemand", headerName: "ID" },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "cost", headerName: "Cost", width: 100 },
    { field: "status", headerName: "Status", width: 120 },
  ];

  // Affichage des données dans le DataGrid
  return (
    <MyProSidebarProvider>
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Topbar />
          <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Header title="DEMANDES" subtitle="Welcome" />
              <Select
                sx={{
                  backgroundColor: "transparent",
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "0px 20px",
                  border: "1px solid transparent", // Rendre la bordure transparente
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent", // Supprimer la bordure du champ
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent", // Empêcher la bordure d'apparaître au survol
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent", // Empêcher la bordure d'apparaître au focus
                  },
                }}
                value={roleDemande}
                onChange={handleRoleChange}
              >
                <MenuItem value="user">USER</MenuItem>
                <MenuItem value="brand">BRAND</MenuItem>
              </Select>
            </Box>
            <Box
              m="8px 0 0 0"
              width="100%"
              height="80vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >
              <DataGrid
                rows={dataaff || []}  // Gestion de données null/undefined
                columns={columns}
                loading={loading}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.idDemand} // Assurez-vous que l'ID est unique pour chaque ligne
              />
            </Box>
          </Box>
        </main>
      </div>
    </MyProSidebarProvider>
  );
};

export default Contacts;
