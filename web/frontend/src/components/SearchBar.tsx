import React from 'react';
import { Box, Autocomplete, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: theme.palette.primary.main,
  '& .MuiFormControl-root': {
    borderRadius: '100px',
  },
  '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
    // transform: 'translate(34px, 20px) scale(1);',
  },
  '& .MuiAutocomplete-inputRoot': {
    color: theme.palette.primary.main,
    borderRadius: '100px',
    backgroundColor: theme.palette.secondary.main,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.secondary.main,
    },
  },
}));
const shadow = '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0.19)';

/**
 * @typeParam setSearchValue - method to change search value state
 */
interface SearchBarProps {
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * function to render search bar and update it according to user input
 * @param props - takes in {@link SearchBarProps}
 * @returns JSX.Element
 */
export default function SearchBar({
  setSearchValue,
}: SearchBarProps): JSX.Element {
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
