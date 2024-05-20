import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Visibility } from '@mui/icons-material';

const Row2 = () => {
  const [selectedConcurrent, setSelectedConcurrent] = useState(null);

  const list1 = [
    { concurrent: 'Concurrent 1', page: 'Page 1', converture: 'Converture 1' },
    { concurrent: 'Concurrent 2', page: 'Page 2', converture: 'Converture 2' },
    { concurrent: 'Concurrent 3', page: 'Page 3', converture: 'Converture 3' },
  ];
  const list2 = ['Item 2-1', 'Item 2-2', 'Item 2-3'];
  const list3 = ['Item 3-1', 'Item 3-2', 'Item 3-3'];

  const handleConcurrentClick = (concurrent) => {
    setSelectedConcurrent(concurrent);
  };

  const renderList = (items) => (
    <List>
      {items.map((item, index) => (
        <ListItem key={index} sx={{ padding: '10px', backgroundColor: '#f7f9fc', borderRadius: '8px', marginBottom: '8px' }}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
      <Box sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>Classement Concurrent</Typography>
        <Typography variant="subtitle1" sx={{ marginBottom: '20px', color: '#555' }}>Par nombre d'ouverture</Typography>
        <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f7f9fc' }}>
                <TableCell>Concurrent</TableCell>
                <TableCell>Page</TableCell>
                <TableCell>Converture</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list1.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleConcurrentClick(row.concurrent)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: selectedConcurrent === row.concurrent ? '#e0f7fa' : 'inherit',
                    '&:hover': { backgroundColor: '#f1f1f1' },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {row.concurrent}
                      <Box sx={{ marginLeft: 'auto', padding: '4px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)' }}>
                        <Visibility sx={{ fontSize: '16px' }} />
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{row.page}</TableCell>
                  <TableCell>{row.converture}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>Liste 2</Typography>
        {renderList(list2)}
      </Box>
      <Box sx={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#ffffff' }}>
        <Typography variant="h6" sx={{ marginBottom: '10px', fontWeight: 'bold' }}>Liste 3</Typography>
        {renderList(list3)}
      </Box>
    </Box>
  );
};

export default Row2;
