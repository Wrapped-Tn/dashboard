import React from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme, Box, Typography } from "@mui/material";
import { tokens } from "../theme";
import { statLine } from "../APIcons/admin/apisAdmin";
import { useState, useEffect } from "react";

const LineChart = ({ isDashboard = false , periode }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [statLin, setStatLin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const dataLine = await statLine(periode); // ou 'month'
        
        if (dataLine !== undefined) {
          // Transformer les données dans le format attendu par nivo
          const formattedData = [
            {
              id: "revenue",
              color: colors.greenAccent[500],
              data: dataLine.salesData.map(item => ({
                x: item.date,
                y: item.totalRevenue || 0
              }))
            },
            {
              id: "sales",
              color: colors.blueAccent[500],
              data: dataLine.salesData.map(item => ({
                x: item.date,
                y: item.totalSales || 0
              }))
            }
          ];
          
          setStatLin(formattedData);
        } else {
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
  }, [periode]);

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100%"
      >
        <Typography>Chargement des données...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100%"
        color={colors.redAccent[500]}
      >
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!statLin) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        height="100%"
      >
        <Typography>Aucune donnée disponible</Typography>
      </Box>
    );
  }

  return (
    <ResponsiveLine
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            background: colors.primary[400],
            color: colors.grey[100],
          },
        },
      }}
      curve="catmullRom"
      data={statLin}
      colors={{ datum: "color" }} // Utilise les couleurs définies dans les données
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: isDashboard ? -45 : 0,
        legend: isDashboard ? undefined : "Date",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickValues: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Valeur",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={!isDashboard}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;