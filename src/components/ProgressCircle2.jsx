import React from "react";
import { Box, Tooltip, CircularProgress, Typography } from "@mui/material";
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import { statRadar } from "../APIcons/admin/apisAdmin";
import { useState, useEffect } from "react";

const ProgressCircle2 = ({ size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [stats, setStats] = useState({ totalDelivered: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await statRadar();
        
        if (data && typeof data.totalDelivered !== 'undefined') {
          setStats(data);
          
        } else {
          setError("No data received");
        }
      } catch (e) {
        setError("Error fetching data");
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width={size} height={size}>
        <CircularProgress size={Number(size) / 2} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" width={size} height={size}>
        <Typography variant="caption" color="error">
          Error
        </Typography>
      </Box>
    );
  }

  const progress = stats.totalDelivered;
  const angle = progress * 360;
  const completionPercentage = (progress ).toFixed(0);
//   const remainingPercentage = ((1 - progress)).toFixed(0);

  return (
    <Tooltip 
      title={
        <Box>
          <div>Delivered: {completionPercentage}</div>
        </Box>
      } 
      arrow
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: "50%",
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
                      conic-gradient(transparent 0deg ${angle}deg, ${colors.redAccent[500]} ${angle}deg 360deg),
                      ${colors.greenAccent[500]}`,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: colors.grey[100],
            fontWeight: 'bold',
            fontSize: size > 60 ? '0.8rem' : '0.6rem'
          }}
        >
          {completionPercentage}%
        </Typography>
   
      </Box>

    </Tooltip>
  );
};

export default ProgressCircle2;