import React, { useState } from 'react';
import Select from 'react-select';
import { Box, Typography, IconButton } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CloseIcon from '@mui/icons-material/Close';

const Row1 = () => {
  const [selectedVertical, setSelectedVertical] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const verticalOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const handleVerticalChange = (selected) => {
    setSelectedVertical(selected);
  };

  const handlePeriodChange = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCalendarSelect = (range) => {
    if (Array.isArray(range) && range.length === 2) {
      setSelectedPeriod(range);
      setShowCalendar(false); // Hide the calendar after selecting the range
    }
  };

  const handlePeriodClear = () => {
    setSelectedPeriod([]);
  };

  return (
    <div>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Benchmark Concurrentiel - Facebook
      </Typography>
      <Box sx={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <Box>
          <Typography variant="subtitle1" sx={{ marginBottom: '5px' }}>
            Verticale
          </Typography>
          <Box sx={{ width: '300px' }}>
            <Select
              options={verticalOptions}
              value={selectedVertical}
              onChange={handleVerticalChange}
              placeholder="Choisir"
              isMulti
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ marginBottom: '5px' }}>
            Période
          </Typography>
          <Box sx={{ width: '300px', display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%' }}>
              <Select
                placeholder="Choisir"
                value={
                  selectedPeriod.length > 0
                    ? { label: `${selectedPeriod[0].toLocaleDateString()} - ${selectedPeriod[1] ? selectedPeriod[1].toLocaleDateString() : 'Non spécifié'}`, value: 'selectedPeriod' }
                    : null
                }
                onFocus={handlePeriodChange}
                menuIsOpen={false} // Prevents the default dropdown from opening
                components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                isClearable={false}
              />
            </Box>
            {selectedPeriod.length > 0 && (
              <IconButton onClick={handlePeriodClear} size="small" sx={{ marginLeft: '5px' }}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
      {showCalendar && (
        <Box sx={{ marginTop: '10px', position: 'relative' }}>
          <Calendar
            onChange={handleCalendarSelect}
            selectRange={true} // Allow range selection in the calendar
            value={selectedPeriod}
          />
        </Box>
      )}
      {selectedPeriod.length > 0 && (
        <Typography variant="body1" sx={{ marginTop: '20px' }}>
          Période sélectionnée : {selectedPeriod[0].toLocaleDateString()} - {selectedPeriod[1] ? selectedPeriod[1].toLocaleDateString() : 'Non spécifié'}
        </Typography>
      )}
    </div>
  );
};

export default Row1;
