import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import Header from '../../components/Header';
import EditIcon from '@mui/icons-material/Edit';

const initialRows = [
    { id: 1, name: 'Competitor 1' },
    { id: 2, name: 'Competitor 2' },
    { id: 3, name: 'Competitor 3' },
];

const Concurents = () => {
    const [rows, setRows] = useState(initialRows);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [newRowData, setNewRowData] = useState({ name: '' });
    const [selectedRowData, setSelectedRowData] = useState({ id: '', name: '' });

    const handleAddRow = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        resetForm();
        setOpenDialog(false);
    };

    const handleSaveNewRow = () => {
        setRows([...rows, { id: rows.length + 1, name: newRowData.name }]);
        resetForm();
        setOpenDialog(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRowData({ ...newRowData, [name]: value });
    };

    const resetForm = () => {
        setNewRowData({ name: '' });
    };

    const handleEditRow = (row) => {
        setSelectedRowData(row);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedRowData({ ...selectedRowData, [name]: value });
    };

    const handleSaveEditedRow = () => {
        setRows(rows.map(row => (row.id === selectedRowData.id ? selectedRowData : row)));
        setOpenEditDialog(false);
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, align: 'center', headerAlign: 'center' },
        { field: 'name', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center' },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1, align: 'center', headerAlign: 'center',
            renderCell: (params) => (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <IconButton size="small" color="primary" onClick={() => handleEditRow(params.row)}>
                        <EditIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    return (
        <Box sx={{ height: 600, width: '98%', mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Header title={"CONCURENTS"} subTitle={"Welcome To Concurents"} />
                <Button variant="contained" color="primary" onClick={handleAddRow}>Ajouter</Button>
            </Box>
            <DataGrid
                slots={{
                    toolbar: GridToolbar,
                }}
                rows={rows}
                columns={columns}
                components={{
                    Toolbar: () => null, // Supprimer la barre d'outils
                }}
            />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Ajouter une nouvelle ligne</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Name"
                        fullWidth
                        onChange={handleInputChange}
                        sx={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Annuler</Button>
                    <Button onClick={handleSaveNewRow} color="primary">Enregistrer</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Modifier la ligne</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Name"
                        fullWidth
                        value={selectedRowData.name}
                        onChange={handleEditInputChange}
                        sx={{ marginTop: '10px', marginBottom: '10px' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Annuler</Button>
                    <Button onClick={handleSaveEditedRow} color="primary">Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Concurents;
