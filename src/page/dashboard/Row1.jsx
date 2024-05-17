import React, { useState } from 'react';
import Select from 'react-select';
import { Box, Typography } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Row1 = () => {
  const [selectedVertical, setSelectedVertical] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date());
  
  const verticalOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const handleVerticalChange = (selected) => {
    setSelectedVertical(selected);
  };

  const handlePeriodChange = () => {
    setShowCalendar(!showCalendar); // Afficher ou masquer le calendrier au clic sur le bouton de période
  };

  const handleCalendarClick = (date) => {
    if (selectedPeriod.length === 0) {
      setSelectedPeriod([date]); // Définir le début de la période
    } else if (selectedPeriod.length === 1 && date > selectedPeriod[0]) {
      const periodEnd = date;
      setSelectedPeriod([selectedPeriod[0], periodEnd]); // Définir la fin de la période
      setShowCalendar(false); // Masquer le calendrier après la sélection de la période
    } else {
      // Gérer le cas où le deuxième clic est antérieur au premier clic
      setSelectedPeriod([date]); // Redéfinir le début de la période
    }
  };

  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Sélection Verticale et Période
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Select
          options={verticalOptions}
          value={selectedVertical}
          onChange={handleVerticalChange}
          placeholder="Sélectionnez une option verticale"
          isMulti={true}
        />
        <button onClick={handlePeriodChange} style={{ cursor: 'pointer' }}>Sélectionner une période</button>
      </Box>
      {showCalendar && (
        <Box sx={{ marginTop: '10px' }}>
          <Calendar
            onChange={handleCalendarClick}
            value={calendarDate}
            selectRange={true} // Permettre la sélection d'une période dans le calendrier
          />
        </Box>
      )}
      {selectedPeriod.length > 0 && (
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          Période sélectionnée : {selectedPeriod[0] instanceof Date ? selectedPeriod[0].toLocaleDateString() : 'Non spécifié'} - {selectedPeriod[1] instanceof Date ? selectedPeriod[1].toLocaleDateString() : 'Non spécifié'}
        </Typography>
      )}
    </div>
  );
};

export default Row1;
