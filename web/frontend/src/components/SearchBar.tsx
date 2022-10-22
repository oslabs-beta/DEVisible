import React from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { GetUserInfo } from '../types';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiFormControl-root': {
    borderRadius: '100px',
  },
  '& .MuiAutocomplete-inputRoot': {
    color: theme.palette.primary.main,
    borderRadius: '100px',
    backgroundColor: theme.palette.secondary.main,
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
}));
const shadow = '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0.19)';
interface SearchBarProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({
  setSearchValue,
}: SearchBarProps): JSX.Element {
  setTimeout(() => {
    const close = document.getElementsByClassName(
      'MuiAutocomplete-clearIndicator'
    )[0];
    if (close) {
      close.addEventListener('click', () => {
        setSearchValue('');
      });
    }
  }, 100);

  return (
    <Box className="search-bar-container">
      <StyledAutocomplete
        freeSolo
        options={[]}
        style={{ width: 300 }}
        renderInput={(params) => {
          return (
            <TextField
              onChange={(event) => setSearchValue(event.target.value)}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              label="Search for Repository..."
              size="small"
              sx={{ boxShadow: `${shadow}` }}
            />
          );
        }}
      />
    </Box>
  );
}
