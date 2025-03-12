import React, { useState } from "react";
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
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";
import Header from "../../components/Header";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState(mockDataContacts);
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    date: "",
    salaire: "",
  });

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewContact({
      name: "",
      email: "",
      age: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      date: "",
      salaire: "",
    });
  };

  const handleClickOpenUpdate = (contact) => {
    setSelectedContact(contact);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedContact(null);
  };

  const handleClickOpenDelete = (id) => {
    setSelectedContact(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedContact(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddContact = () => {
    const id = rows.length + 1;
    setRows([...rows, { id, ...newContact }]);
    handleCloseAdd();
  };
// fonction permer de supp et mise a jour les donnés 
  const handleUpdateContact = () => {
   
    handleCloseUpdate();
  };

  const handleDeleteContact = () => {
   
    handleCloseDelete();
  };

  const columns = [
    { field: "registrarId", headerName: "Registrar Id", width: 100 },
    {
      field: "name",
      headerName: "Name",
      cellClassName: "name-column--cell",
      width: 200,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 100,
    },
    { field: "phone", headerName: "Phone Number", width: 100 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "address", headerName: "Addresse", width: 250 },
    { field: "city", headerName: "City", width: 100 },
    { field: "date", headerName: "Date d'athésion", width: 100 },
    { field: "zipCode", headerName: "carte CIN", width: 100 },
    { field: "salaire", headerName: "salaire", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleClickOpenUpdate(params.row)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleClickOpenDelete(params.row.id)}
            color="secondary"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <MyProSidebarProvider>
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Topbar />
          <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Header title="USER" subtitle="Welcome " />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpenAdd}
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  "&:hover": { backgroundColor: colors.blueAccent[800] },
                }}
              >
                Ajouter un nouveau personne
              </Button>
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
                rows={rows}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </main>

        {/* Popup pour ajouter un nouveau contact */}
        <Dialog open={openAdd} onClose={handleCloseAdd}>
          <DialogTitle>Ajouter un nouveau personne</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Nom"
              fullWidth
              value={newContact.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              fullWidth
              value={newContact.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="age"
              label="Âge"
              type="number"
              fullWidth
              value={newContact.age}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="phone"
              label="Téléphone"
              fullWidth
              value={newContact.phone}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="address"
              label="Adresse"
              fullWidth
              value={newContact.address}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="city"
              label="Ville"
              fullWidth
              value={newContact.city}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="zipCode"
              label="carte CIN"
              fullWidth
              value={newContact.zipCode}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="date"
              label="Date d'athésion"
              fullWidth
              value={newContact.date}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="salaire"
              label="Salaire"
              fullWidth
              value={newContact.salaire}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd} color="secondary">
              Annuler
            </Button>
            <Button onClick={handleAddContact} color="primary">
              Ajouter
            </Button>
          </DialogActions>
        </Dialog>

        {/* Popup pour mettre à jour un contact */}
        <Dialog open={openUpdate} onClose={handleCloseUpdate}>
          <DialogTitle>Mettre à jour le contact</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Nom"
              fullWidth
              value={selectedContact ? selectedContact.name : ""}
              onChange={(e) => setSelectedContact({ ...selectedContact, name: e.target.value })}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              fullWidth
              value={selectedContact ? selectedContact.email : ""}
              onChange={(e) => setSelectedContact({ ...selectedContact, email: e.target.value })}
            />
            <TextField
              margin="dense"
              name="age"
              label="Âge"
              type="number"
              fullWidth
              value={selectedContact ? selectedContact.age : ""}
              onChange={(e) => setSelectedContact({ ...selectedContact, age: e.target.value })}
            />
            <TextField
              margin="dense"
              name="phone"
              label="Téléphone"
              fullWidth
              value={selectedContact ? selectedContact.phone : ""}
              onChange={(e) => setSelectedContact({ ...selectedContact, phone: e.target.value })}
            />
            <TextField
              margin="dense"
              name="address"
              label="Adresse"
              fullWidth
              value={selectedContact ? selectedContact.address : ""}
              onChange={(e) => setSelectedContact({ ...selectedContact, address: e.target.value })}
            />
            <TextField
              margin="dense"
              name="city"
              label="Ville"
              fullWidth
              value={selectedContact ? selectedContact.city : ""}
              onChange={(e) => setSelectedContact({ ...selectedContact, city: e.target.value })}
            />
            <TextField
              margin="dense"
              name="zipCode"
              label="carte CIN"
              fullWidth
              value={selectedContact ? selectedContact.zipCode : ""}
              onChange={(e) => setSelectedContact({ ...selectedContact, zipCode: e.target.value })}
            />
            <TextField
              margin="dense"
              name="date"
              label="Date d'athésion"
              fullWidth
              value={selectedContact ? selectedContact.date : ""}
              onChange={(e) => setSelectedContact({ ...selectedContact, date: e.target.value })}
            />
            <TextField
              margin="dense"
              name="salaire"
              label="Salaire"
              fullWidth
              value={selectedContact ? selectedContact.salaire : ""}
              onChange={(e) => setSelectedContact({ ...selectedContact, salaire: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdate} color="secondary">
              Annuler
            </Button>
            <Button onClick={handleUpdateContact} color="primary">
              Mettre à jour
            </Button>
          </DialogActions>
        </Dialog>

        {/* Popup de confirmation pour la suppression */}
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            Êtes-vous sûr de vouloir supprimer ce contact ?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDelete} color="primary">
              Annuler
            </Button>
            <Button onClick={handleDeleteContact} color="secondary">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </MyProSidebarProvider>
  );
};

export default Contacts;