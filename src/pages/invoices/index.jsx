import React, { useState } from "react";
import { Box, useTheme,Typography, IconButton,MenuItem, Select } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import { mockDataInvoicesBrand } from "../../data/mockData";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import Topbar from "../global/Topbar";
import Header from "../../components/Header";


const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
  const [dataaff , setDataaff] = useState (mockDataInvoices)


  const changeDat = (data) =>{
    console.log(data);
    
    if (data === "USER") {
      setDataaff(mockDataInvoices);
    } else if (data === "BRAND") {
      setDataaff(mockDataInvoicesBrand);
    } else {
      setDataaff([]); // Optionnel: vider les données si aucune option valide n'est sélectionnée
    }
  }



  const columns = [
    { field: "id", headerName: "Id" },
    {
      field: "name",
      headerName: "Name",
      width: 200,
      cellClassName: "name-column--cell",
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 100 },

    {
      field: "cost",
      headerName: "Cost",
      width: 100,
  
    },
    { field: "date", headerName: "Date", width: 100 },
    { field: "Status", headerName: "Status", width: 100 }

  ];

  return (
    <MyProSidebarProvider>
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Topbar />
          <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Header title="LIVRAISON" subtitle="Welcome" />
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
  defaultValue="USER"
  onChange={(e)=>{changeDat(e.target.value)}}
 
>
  <MenuItem value="USER">USER</MenuItem>
  <MenuItem value="BRAND">BRAND</MenuItem>
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
                rows={dataaff}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </main>
      </div>
    </MyProSidebarProvider>
  );
};

export default Contacts;