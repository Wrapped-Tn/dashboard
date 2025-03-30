import {
  Box,
  Button,
  Select,
  MenuItem,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions, mockTransactionBrand } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CategoryIcon from '@mui/icons-material/Category';
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import ProgressCircle2 from "../../components/ProgressCircle2";
import { MyProSidebarProvider } from "../global/sidebar/sidebarContext";
import { getTotalUser } from "../../APIcons/admin/apisAdmin";
import { getTotalSels } from "../../APIcons/admin/apisAdmin";
import { getTotalBrand } from "../../APIcons/admin/apisAdmin";
import { statLine } from "../../APIcons/admin/apisAdmin";
import { statRadar } from "../../APIcons/admin/apisAdmin"
import Topbar from "../global/Topbar";
import { useState, useEffect } from "react";


const Dashboard = () => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [dataaff, setDataaff] = useState(mockTransactions);
  const [totalUser, setTotalUser] = useState({ totalUsers: 0, percentageChange: 0 });
  const [totalSel, setTotalsel ] = useState({ totalSales: 0, percentageChange: 0 });
  const [brand, setBrand ] = useState({ totalBrands: 0, percentageChange: 0 });
  const[periode , setPeriode]=useState('day')
  const [statLin,setStatLin ] = useState (() => {
    const savedData = localStorage.getItem('deliveryStats');
    return savedData ? JSON.parse(savedData) : { 
      totalDelivered: 0, 
      message: "Loading delivery data...",
      timestamp: null
    };
  })
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getTotalUser();
        const data2 = await getTotalSels();
        const data3 =await getTotalBrand()
        const dataLine = await statRadar()

        
        
        if (data !== undefined) setTotalUser(data);
        if (data2 !== undefined) setTotalsel(data2);
        if (data3 !== undefined) setBrand(data3);
        if (dataLine) {
          const newDeliveryData = {
            totalDelivered: dataLine.totalSum || 0,
            message: dataLine.message || `Updated: ${new Date().toLocaleTimeString()}`,
            timestamp: Date.now()
          };
          setStatLin(newDeliveryData);
          localStorage.setItem('deliveryStats', JSON.stringify(newDeliveryData));
        }
        
        if (data === undefined && data2 === undefined && data3 === undefined && dataLine== undefined) {
          setError("Aucune donnée  reçue");
        } else if (data === undefined) {
          setError("Aucune donnée user reçue");
        } else if (data2 === undefined) {
          setError("Aucune donnée sels reçue");
        } else if (data3 === undefined) {
          setError("Aucune donnée brand reçue");
        } else if (dataLine === undefined) {
          setError("Aucune donnée stat reçue");
        }
      } catch (e) {
        setError("Erreur lors de la récupération des données");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const changeDat = (data) => {
    if (data === "brand") {
      setDataaff(mockTransactionBrand);
    } else if (data === "user") {
      setDataaff(mockTransactions);
    } else {
      setDataaff([]);
    }
  };

  const chnageData2 = (data) => {
    setPeriode(data)
    console.log(periode)
  };

  const getValueFormatter = (value) => {
    // Define your logic here
    return value / 100; // Example: Convert percentage to a decimal
  };

  return (
    <MyProSidebarProvider>
      <div style={{ height: "100%", width: "100%" }}>
        <main>
          <Topbar />
          <Box m="20px">
            {/* HEADER */}
            <Box
              display={smScreen ? "flex" : "block"}
              flexDirection={smScreen ? "row" : "column"}
              justifyContent={smScreen ? "space-between" : "start"}
              alignItems={smScreen ? "center" : "start"}
              m="10px 0"
            >
              <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
            </Box>

            {/* GRID & CHARTS */}
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                <Box
                  width="100%"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title="12,361"
                    subtitle="Emails Sent"
                    progress="0.14"
                    increase="+14%"
                    icon={
                      <EmailIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                <Box
                  width="100%"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={totalSel.totalSales}
                    subtitle="Sales Obtained"
                    progress={ parseFloat(totalSel.percentageChange).toFixed(2)}
                    increase={totalSel.percentageChange}
                    icon={
                      <PointOfSaleIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                <Box
                  width="100%"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={totalUser.totalUsers}
                    subtitle="New Clients"
                    progress={ parseFloat(totalUser.percentageChange).toFixed(2)}
                     
                    increase={totalUser.percentageChange}
                    icon={
                      <PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                    }
                  />
                </Box>
              </Grid>
              <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
                <Box
                  width="100%"
                  backgroundColor={colors.primary[400]}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <StatBox
                    title={brand.totalBrands}
                    subtitle="Brand"
                    progress={ parseFloat(brand.percentageChange).toFixed(2)}
                    increase={brand.percentageChange}
                    icon={
                      <CategoryIcon sx={{ color: colors.greenAccent[600], fontSize: "26px" }} />
                    }
                  />
                </Box>
              </Grid>

              <Grid xs={12} sm={12} md={8} lg={8} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={12}>
                  <Box backgroundColor={colors.primary[400]}>
                    <Box mt="25px" p="0 30px" display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                          Revenue Generated
                        </Typography>
                        <Typography variant="h5" fontWeight="600" color={colors.greenAccent[500]}>
                          
                        </Typography>
                      </Box>
                      <Box>
                        <Select
                          sx={{
                            backgroundColor: "transparent",
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "0px 20px",
                            border: "1px solid transparent",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                          }}
                          defaultValue="day"
                          onChange={(e) => chnageData2(e.target.value)}
                        >
                          <MenuItem value="month">par jour</MenuItem>
                          <MenuItem value="day">par mois</MenuItem>
                        </Select>
                      </Box>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                      <LineChart isDashboard={true} periode={periode}/>
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <Box backgroundColor={colors.primary[400]} p="30px">
                    <Typography variant="h5" fontWeight="600">
                      Delivery Progress
                    </Typography>
                    <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
                      {loading ? (
                        <CircularProgress size={125} thickness={4} sx={{ my: 3 }} />
                      ) : (
                        <>
                          <ProgressCircle2 
                            size="125" 
                            progressValue={statLin.totalDelivered / 100} 
                          />
                          <Typography variant="h5" color={colors.greenAccent[500]} sx={{ mt: "15px" }}>
                            {statLin.totalDelivered.toLocaleString()} delivered
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.grey[300], textAlign: 'center' }}>
                            {statLin.message}
                          </Typography>
                        </>
                      )}
                      {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                          {error}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid xs={12} sm={12} md={6}>
                  <Box backgroundColor={colors.primary[400]}>
                    <Typography variant="h5" fontWeight="600" sx={{ padding: "30px 30px 0 30px" }}>
                      Sales Quantity
                    </Typography>
                    <Box height="250px" mt="-20px">
                      <BarChart isDashboard={true} />
                    </Box>
                  </Box>
                </Grid>
                {/* <Grid xs={12}>
                  <Box backgroundColor={colors.primary[400]} padding="30px">
                    <Typography variant="h5" fontWeight="600" sx={{ marginBottom: "15px" }}>
                      Geography Based Traffic
                    </Typography>
                    <Box height="200px">
                      <GeographyChart isDashboard={true} />
                    </Box>
                  </Box>
                </Grid> */}
              </Grid>
              <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
                <Box backgroundColor={colors.primary[400]} maxHeight="100vh" overflow="auto" m="25px 0 0 0">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    color={colors.grey[100]}
                    p="15px"
                  >
                    <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                      <Box>
                        Recent Transaction
                        <Select
                          sx={{
                            backgroundColor: "transparent",
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "0px 20px",
                            border: "1px solid transparent",
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                            },
                          }}
                          defaultValue="brand"
                          onChange={(e) => changeDat(e.target.value)}
                        >
                          <MenuItem value="brand">brand</MenuItem>
                          <MenuItem value="user">user</MenuItem>
                        </Select>
                      </Box>
                    </Typography>
                  </Box>
                  {dataaff.map((transaction, i) => (
                    <Box
                      key={`${transaction.txId}-${i}`}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      borderBottom={`4px solid ${colors.primary[500]}`}
                      p="15px"
                    >
                      <Box>
                        <Typography variant="h5" fontWeight="600" color={colors.greenAccent[100]}>
                          {transaction.txId}
                        </Typography>
                        <Typography color={colors.grey[100]}>{transaction.user}</Typography>
                      </Box>
                      <Box color={colors.grey[100]}>{transaction.date}</Box>
                      <Box color={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                        ${transaction.cost}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </main>
      </div>
    </MyProSidebarProvider>
  );
};

export default Dashboard;