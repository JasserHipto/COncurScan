import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, IconButton } from '@mui/material';
import Header from '../../components/Header';
import EditIcon from '@mui/icons-material/Edit';

const initialRows = [
    { id: 1, name: 'La fibre au meilleur prix', vertical: 'vertical 1', competitor: 'competitor 1' },
    { id: 2, name: 'Offres internet Fibre', vertical: 'vertical 2', competitor: 'competitor 3' },
    { id: 3, name: 'Ma Box Internet', vertical: 'vertical 3', competitor: 'competitor 3' },
];

const Pages = () => {
    const [rows, setRows] = useState(initialRows);
    const [openDialog, setOpenDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [newRowData, setNewRowData] = useState({
        name: '',
        external_id: '',
        vertical: '',
        competitor: '',
        added_by: '',
    });
    const [selectedRowData, setSelectedRowData] = useState({
        id: '',
        name: '',
        external_id: '',
        vertical: '',
        competitor: '',
        added_by: '',
    });

    const handleAddRow = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        resetForm();
        setOpenDialog(false);
    }

    const handleSaveNewRow = () => {
        setRows([...rows, { id: rows.length + 1, ...newRowData }]);
        resetForm();
        setOpenDialog(false);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRowData({ ...newRowData, [name]: value });
    }

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setNewRowData({ ...newRowData, [name]: value });
    }

    const resetForm = () => {
        setNewRowData({
            name: '',
            external_id: '',
            vertical: '',
            competitor: '',
            added_by: '',
        });
    }

    const handleEditRow = (row) => {
        setSelectedRowData(row);
        setOpenEditDialog(true);
    }

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    }

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedRowData({ ...selectedRowData, [name]: value });
    }

    const handleEditSelectChange = (e) => {
        const { name, value } = e.target;
        setSelectedRowData({ ...selectedRowData, [name]: value });
    }

    const handleSaveEditedRow = () => {
        setRows(rows.map(row => (row.id === selectedRowData.id ? selectedRowData : row)));
        setOpenEditDialog(false);
    }

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1, align: "center", headerAlign: "center" },
        { field: 'name', headerName: 'Name', flex: 1, align: "center", headerAlign: "center" },
        { field: 'vertical', headerName: 'Vertical', flex: 1, align: "center", headerAlign: "center" },
        { field: 'competitor', headerName: 'Competitor', flex: 1, align: "center", headerAlign: "center" },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
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
        <Box sx={{ height: 600, width: '98%', mx: "auto" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <Header title={"PAGES"} subTitle={"Welcome To Pages"} />
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
                    <TextField name="name" label="Name" fullWidth onChange={handleInputChange} sx={{ marginTop: '10px', marginBottom: '10px' }} />
                    <TextField name="external_id" label="External ID" fullWidth onChange={handleInputChange} sx={{ marginBottom: '10px' }} />
                    <Select
                        name="vertical"
                        value={newRowData.vertical}
                        onChange={handleSelectChange}
                        fullWidth
                        displayEmpty
                        renderValue={(selected) => {
                            if (!selected) {
                                return <span style={{ color: '#9e9e9e' }}>Choisir une verticale</span>;
                            }
                            return selected;
                        }}
                        sx={{ marginBottom: '10px' }}
                    >
                        <MenuItem value="" disabled>
                            Choisir une verticale
                        </MenuItem>
                        <MenuItem value="Vertical1">Vertical1</MenuItem>
                        <MenuItem value="Vertical2">Vertical2</MenuItem>
                        <MenuItem value="Vertical3">Vertical3</MenuItem>
                    </Select>
                    <Select
                        name="competitor"
                        value={newRowData.competitor}
                        onChange={handleSelectChange}
                        fullWidth
                        displayEmpty
                        renderValue={(selected) => {
                            if (!selected) {
                                return <span style={{ color: '#9e9e9e' }}>Choisir un concurrent</span>;
                            }
                            return selected;
                        }}
                        sx={{ marginBottom: '10px' }}
                    >
                        <MenuItem value="" disabled>
                            Choisir un concurrent
                        </MenuItem>
                        <MenuItem value="Competitor1">Competitor1</MenuItem>
                        <MenuItem value="Competitor2">Competitor2</MenuItem>
                        <MenuItem value="Competitor3">Competitor3</MenuItem>
                    </Select>
                    <TextField name="added_by" label="Added By" fullWidth onChange={handleInputChange} sx={{ marginBottom: '10px' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Annuler</Button>
                    <Button onClick={handleSaveNewRow} color="primary">Enregistrer</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Modifier la ligne</DialogTitle>
                <DialogContent>
                    <TextField name="name" label="Name" fullWidth value={selectedRowData.name} onChange={handleEditInputChange} sx={{ marginTop: '10px', marginBottom: '10px' }} />
                    <TextField name="external_id" label="External ID" fullWidth value={selectedRowData.external_id} disabled sx={{ marginBottom: '10px' }} />
                    <Select
                        name="vertical"
                        value={selectedRowData.vertical}
                        fullWidth
                        displayEmpty
                        disabled
                        renderValue={(selected) => {
                            if (!selected) {
                                return <span style={{ color: '#9e9e9e' }}>Choisir une verticale</span>;
                            }
                            return selected;
                        }}
                        sx={{ marginBottom: '10px' }}
                    >
                        <MenuItem value="" disabled>
                            Choisir une verticale
                        </MenuItem>
                        <MenuItem value="Vertical1">Vertical1</MenuItem>
                        <MenuItem value="Vertical2">Vertical2</MenuItem>
                        <MenuItem value="Vertical3">Vertical3</MenuItem>
                    </Select>
                    <Select
                        name="competitor"
                        value={selectedRowData.competitor}
                        onChange={handleEditSelectChange}
                        fullWidth
                        displayEmpty
                        renderValue={(selected) => {
                            if (!selected) {
                                return <span style={{ color: '#9e9e9e' }}>Choisir un concurrent</span>;
                            }
                            return selected;
                        }}
                        sx={{ marginBottom: '10px' }}
                    >
                        <MenuItem value="" disabled>
                            Choisir un concurrent
                        </MenuItem>
                        <MenuItem value="Competitor1">Competitor1</MenuItem>
                        <MenuItem value="Competitor2">Competitor2</MenuItem>
                        <MenuItem value="Competitor3">Competitor3</MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog}>Annuler</Button>
                    <Button onClick={handleSaveEditedRow} color="primary">Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Pages;
