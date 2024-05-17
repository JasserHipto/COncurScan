import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
const Header = ({ title, subTitle }) => {
    const theme = useTheme();
    return (
        <Box mb={3} >
                <Typography sx={{ color: theme.palette.info.light, fontWeight:"bold",}}variant="h5"> {title}</Typography>
                <Typography variant="body1"> {subTitle}</Typography>
            </Box>
    )
}

export default Header; 