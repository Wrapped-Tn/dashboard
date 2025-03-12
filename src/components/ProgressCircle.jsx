import React from "react";
import { Box, Tooltip } from "@mui/material";
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

const ProgressCircle = ({ progress = "0.70", size = "40" }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;

  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
                    conic-gradient(transparent 0deg ${angle}deg, ${colors.redAccent[500]} ${angle}deg 360deg),
                    ${colors.greenAccent[500]}`,
        '&:hover::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '0',
          height: '0',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: `10px solid ${colors.primary[400]}`,
          transform: 'translate(-50%, -50%) rotate(90deg)',
        }
      }}
    >
      <Tooltip title={`${(progress * 100).toFixed(0)}%`} arrow>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        />
      </Tooltip>
      <Tooltip title={`${((1 - progress) * 100).toFixed(0)}%`} arrow>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            '&:hover': {
              opacity: 0.8,
            },
          }}
        />
      </Tooltip>
    </Box>
  );
};

export default ProgressCircle;