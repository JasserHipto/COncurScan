import React, { useState } from "react";
import Header from "../../components/Header";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const Keywords = () => {
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [selectedverticale, setSelectedverticale] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [keywords, setKeywords] = useState([
    "Keyword 1",
    "Keyword 2",
    "Keyword 3",
    "Keyword 4",
    "Keyword 5",
  ]);

  const toggleKeyword = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter((kw) => kw !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const removeKeyword = (keyword) => {
    setSelectedKeywords(selectedKeywords.filter((kw) => kw !== keyword));
  };

  const handleValidation = () => {
    console.log("Selected verticale:", selectedverticale);
    console.log("Selected Keywords:", selectedKeywords);
    setSelectedverticale("");
    setSelectedKeywords([]);
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
      setOpenDialog(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'keyword', headerName: 'Keyword', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => toggleKeyword(params.row.keyword)}
        >
          <AddIcon />
        </IconButton>
      ),
    },
  ];

  const rows = keywords.map((keyword, index) => ({
    id: index + 1,
    keyword,
  }));

  return (
    <Box sx={{ height: 600, width: "98%", mx: "auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Header title={"KEYWORDS"} subTitle={"Welcome To Keywords"} />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={3} style={{ padding: 20, height: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              verticaleSize={5}
              rowsPerverticaleOptions={[5]}
              autoHeight
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ marginTop: 20 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenDialog(true)}
              >
                Ajouter
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Container>
            <Paper elevation={3} style={{ padding: 20 }}>
              <FormControl fullWidth>
                <InputLabel>Select verticale</InputLabel>
                <Select
                  value={selectedverticale}
                  onChange={(e) => setSelectedverticale(e.target.value)}
                >
                  <MenuItem value="">Select a verticale</MenuItem>
                  {["verticale 1", "verticale 2", "verticale 3", "verticale 4", "verticale 5"].map(
                    (verticale, index) => (
                      <MenuItem key={index} value={verticale}>
                        {verticale}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              <div style={{ marginTop: 20 }}>
                <Typography variant="h6">Selected Keywords:</Typography>
                <Grid container spacing={2}>
                  {selectedKeywords.map((keyword, index) => (
                    <Grid item key={index}>
                      <Paper
                        style={{
                          padding: 10,
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "lightgreen",
                        }}
                      >
                        <Typography>{keyword}</Typography>
                        <ClearIcon
                          style={{ marginLeft: "5px", cursor: "pointer" }}
                          onClick={() => removeKeyword(keyword)}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </div>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
                onClick={handleValidation}
              >
                Valider
              </Button>
            </Paper>
          </Container>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Ajouter un nouveau keyword</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nouveau Keyword"
            fullWidth
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={handleAddKeyword} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Keywords;
