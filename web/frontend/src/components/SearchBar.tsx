import React from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
    // transform: 'translate(34px, 20px) scale(1);',
  },
  '& .MuiAutocomplete-inputRoot': {
    color: theme.palette.primary.main,
    borderRadius: '100px',
    backgroundColor: theme.palette.secondary.main,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

interface SearchBarProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  setSearchValue,
}: SearchBarProps): JSX.Element {
  return (
    <Box className="search-bar-container">
      <StyledAutocomplete
        freeSolo
        options={['Tanner', 'Eden', 'Justin', 'Michael']}
        style={{ width: 300 }}
        renderInput={(params) => {
          return (
            <TextField
              onChange={(event) => setSearchValue(event.target.value)}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Search for Repository..."
              variant="outlined"
              fullWidth
            />
          );
        }}
      />
    </Box>
  );
}
