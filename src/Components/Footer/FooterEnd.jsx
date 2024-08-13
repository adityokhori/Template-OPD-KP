import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import ScrollToTopButton from '../ScrollToTop';

const FooterEnd = () => {
  return (
    
    <Box
      sx={{
        width: '100%',
        bgcolor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 'auto',
      }}
    >
      <ScrollToTopButton/>

      <Typography variant="body1">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </Typography>
      <Typography variant="body2">
        Built with{' '}
        <Link href="#" color="inherit" underline="always">
          Diskominfo_Tanjungpinang@2024
        </Link>
      </Typography>
    </Box>
  );
};

export default FooterEnd;
