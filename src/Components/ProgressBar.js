import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ProgressBar() {
  return (
    <Box sx={{ display: 'flex' }}>
    <CircularProgress variant="determinate" value={75} />
    </Box>
  );
}