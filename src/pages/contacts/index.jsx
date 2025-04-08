import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  useTheme,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Grid,
  Snackbar
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { getUser, addWorker, updateWorker, deleteWorker } from "../../APIcons/admin/apiUser";
import { MenuItem } from '@mui/material';

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newContact, setNewContact] = useState({
    full_name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    cin: "",
    joined_date: "",
    salary: "",
    role: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const refreshData = async () => {
    setLoading(true);
    try {
      const data = await getUser();
      if (data) {
        setRows(data);
        console.log("Data:", data);
        
      }
    } catch (err) {
      setError(err.message);
      showSnackbar("Erreur lors du rafraîchissement des données", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [refreshTrigger]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const columns = useMemo(() => [
    { field: "id", headerName: "ID", width: 80 },
    { field: "full_name", headerName: "Nom complet", width: 200 },
    { field: "age", headerName: "Âge", width: 80, type: "number" },
    { field: "phone", headerName: "Téléphone", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "address", headerName: "Adresse", width: 200 },
    { field: "cin", headerName: "CIN", width: 150 },
    { field: "role", headerName: "Role", width: 150 },
    { 
      field: "joined_date", 
      headerName: "Date d'adhésion", 
      width: 150,
      valueFormatter: (params) => 
        params.value ? new Date(params.value).toLocaleDateString('fr-FR') : ''
    },
    { 
      field: "salary", 
      headerName: "Salaire", 
      width: 120,
      type: "number",
      valueFormatter: (params) => 
        `${parseFloat(params.value || 0).toFixed(2)} €`
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton 
            onClick={() => handleClickOpenUpdate(params.row)} 
            color="primary"
            aria-label="modifier"
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            onClick={() => handleClickOpenDelete(params.row.id)} 
            color="error"
            aria-label="supprimer"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },    

  ], []);

  const handleClickOpenAdd = () => setOpenAdd(true);
  
  const handleClickOpenUpdate = (contact) => {
    setSelectedContact({
      ...contact,
      joined_date: contact.joined_date?.split('T')[0] || ''
    });
    setOpenUpdate(true);
  };
  
  const handleClickOpenDelete = (id) => {
    setSelectedContact(id);
    setOpenDelete(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewContact({
      full_name: "",
      email: "",
      age: "",
      phone: "",
      address: "",
      cin: "",
      joined_date: "",
      salary: "",
      role: ""
    });
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedContact(null);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedContact(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact(prev => ({ ...prev, [name]: value }));
  };

  const handleAddContact = async () => {
    try {
      if (!newContact.full_name || !newContact.email || !newContact.phone || !newContact.cin || !newContact.role) {
        showSnackbar("Veuillez remplir tous les champs obligatoires", "error");
        return;
      }

      const workerData = {
        ...newContact,
        age: newContact.age ? parseInt(newContact.age) : null,
        salary: newContact.salary ? parseFloat(newContact.salary) : null,
        joined_date: newContact.joined_date || new Date().toISOString().split('T')[0]
      };

      const response = await addWorker(workerData);
      console.log("Response ajout:", response);
      
      if (response.success) {
        setRefreshTrigger(prev => prev + 1);
        handleCloseAdd();
        showSnackbar("Employé ajouté avec succès");
      }
    } catch (e) {
      console.error("Erreur ajout:", e);
      showSnackbar(e.message || "Erreur lors de l'ajout", "error");
    }
  };

  const handleUpdateContact = async () => {
    try {
      if (!selectedContact) return;

      if (!selectedContact.full_name || !selectedContact.email || !selectedContact.phone || !selectedContact.cin) {
        showSnackbar("Veuillez remplir tous les champs obligatoires", "error");
        return;
      }

      const workerData = {
        ...selectedContact,
        age: selectedContact.age ? parseInt(selectedContact.age) : null,
        salary: selectedContact.salary ? parseFloat(selectedContact.salary) : null
      };

      const response = await updateWorker(selectedContact.id, workerData);
      
      if (response?.data) {
        setRefreshTrigger(prev => prev + 1);
        handleCloseUpdate();
        showSnackbar("Employé mis à jour avec succès");
      }
    } catch (e) {
      console.error("Erreur mise à jour:", e);
      showSnackbar(e.message || "Erreur lors de la mise à jour", "error");
    }
  };

  const handleDeleteContact = async () => {
    try {
      if (!selectedContact) return;

      const response = await deleteWorker(selectedContact);
      
      if (response?.status === 200) {
        setRefreshTrigger(prev => prev + 1);
        handleCloseDelete();
        showSnackbar("Employé supprimé avec succès");
      }
    } catch (e) {
      console.error("Erreur suppression:", e);
      showSnackbar(e.message || "Erreur lors de la suppression", "error");
    }
  };

  if (loading) {
    return (
      <MyProSidebarProvider>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      </MyProSidebarProvider>
    );
  }

  if (error) {
    return (
      <MyProSidebarProvider>
        <Box m="20px">
          <Alert severity="error">
            Erreur lors du chargement des données: {error}
          </Alert>
        </Box>
      </MyProSidebarProvider>
    );
  }

  return (
    <MyProSidebarProvider>
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Topbar />
          <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Header title="UTILISATEURS" subtitle="Gestion des employés" />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpenAdd}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  "&:hover": { backgroundColor: colors.blueAccent[800] },
                }}
              >
                Ajouter un employé
              </Button>
            </Box>
            <Box
              m="8px 0 0 0"
              width="100%"
              height="80vh"
              sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .name-column--cell": { color: colors.greenAccent[300] },
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
                rows={rows}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 20]}
                disableSelectionOnClick
                getRowId={(row) => row.id}
              />
            </Box>
          </Box>
        </main>

        {/* Dialogue Ajout */}
        <Dialog open={openAdd} onClose={handleCloseAdd} fullWidth maxWidth="md">
          <DialogTitle>Ajouter un nouvel employé</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  margin="normal"
                  name="full_name"
                  label="Nom complet *"
                  fullWidth
                  value={newContact.full_name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  name="email"
                  label="Email *"
                  type="email"
                  fullWidth
                  value={newContact.email}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  margin="normal"
                  name="age"
                  label="Âge"
                  type="number"
                  fullWidth
                  value={newContact.age}
                  onChange={handleInputChange}
                  inputProps={{ min: 18, max: 99 }}
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  margin="normal"
                  name="phone"
                  label="Téléphone *"
                  fullWidth
                  value={newContact.phone}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  name="cin"
                  label="CIN *"
                  fullWidth
                  value={newContact.cin}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  name="address"
                  label="Adresse"
                  fullWidth
                  multiline
                  rows={2}
                  value={newContact.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  name="joined_date"
                  label="Date d'adhésion"
                  type="date"
                  fullWidth
                  value={newContact.joined_date}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  margin="normal"
                  name="role"
                  label="Rôle *"
                  fullWidth
                  value={newContact.role || ''}
                  onChange={handleInputChange}
                  required
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Manager Livraison">Manager Livraison</MenuItem>
                  <MenuItem value="Manager Finance">Manager Finance</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  name="salary"
                  label="Salaire (€)"
                  type="number"
                  fullWidth
                  value={newContact.salary}
                  onChange={handleInputChange}
                  InputProps={{
                    inputProps: { min: 0, step: 0.01 },
                    endAdornment: "€"
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd} color="secondary">
              Annuler
            </Button>
            <Button 
              onClick={handleAddContact}
              color="primary"
              variant="contained"
            >
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar pour les notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
        {openDelete && (
          <Dialog open={openDelete} onClose={handleCloseDelete}>
            <DialogTitle>Supprimer l'employé</DialogTitle>
            <DialogContent>
              Êtes-vous sûr de vouloir supprimer cet employé ?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDelete} color="secondary">
                Annuler
              </Button>
              <Button 
                onClick={handleDeleteContact}
                color="error"
                variant="contained"
              >
                Supprimer
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </MyProSidebarProvider>
  );
};

export default Contacts;