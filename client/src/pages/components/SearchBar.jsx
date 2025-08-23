import React from 'react'
import { string, func } from 'prop-types'
import { Box, FormControl, OutlinedInput, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const SearchBar = ({ q, setSearchParams }) => {
    return (
        <>
            <Box maxWidth={false} sx={{ mt: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1600px', mx: 'auto' }}>
                <FormControl variant="standard">
                    <OutlinedInput placeholder="חיפוש" size="small" value={q} onChange={ ({target}) => setSearchParams({q: target.value}) } endAdornment={
                        <InputAdornment position="end">
                            <IconButton edge="end">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    } />
                </FormControl>
            </Box>
        </>
    )
}

SearchBar.propTypes = {
    q: string,
    setSearchParams: func
}

export default SearchBar
