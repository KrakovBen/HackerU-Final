import React from 'react'
import { Box, FormControl, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useSearchParams } from 'react-router-dom'

const SearchBar = () => {
    const [ searchParams, setSearch ] = useSearchParams()
    const handleChange = ({target}) => setSearch({q: target.value})

    return (
        <Box>
            <FormControl variant="standard">
                <OutlinedInput placeholder="חיפוש" size="small" value={searchParams.get('q') ?? ''} onChange={ handleChange } endAdornment={
                    <InputAdornment position="end">
                        <IconButton edge="end">
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                } />
            </FormControl>
        </Box>
    )
}

export default SearchBar
