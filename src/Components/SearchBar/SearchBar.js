import SearchIcon from '@mui/icons-material/Search'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'

function SearchBar ({ setSearchQuery }) {
  return (
    <>
      <TextField
        onInput={e => setSearchQuery(e.target.value)}
        label=''
        variant='outlined'
        placeholder='Search for Product Names'
        size='small'
        style={{
          backgroundColor: 'white',
          padding: '0px',
          border: '0.1vw solid rgb(21, 42, 47)',
          marginTop: '0.5vw',
          borderRadius: '0.2vw solid rgb(21, 42, 47)'
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton type='submit' aria-label='search'>
                <SearchIcon style={{ fill: 'green' }}></SearchIcon>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </>
  )
}

export default SearchBar