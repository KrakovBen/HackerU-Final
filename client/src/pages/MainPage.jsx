import React, { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import { Box, Container, Typography } from '@mui/material'
import PageHeader from '../components/PageHeader'
import { useSearchParams } from 'react-router-dom'
import useRecipes from '../recipes/hooks/useRecipes'
import useUsers from '../users/hooks/useUsers'
import { useUser } from '../users/providers/UserProvider'
import RecipesFeedback from '../recipes/components/RecipesFeedback'
import UsersGrid from './components/UsersGrid'

const MainPage = () => {
    const [ searchParams, setSearchParams ] = useSearchParams()
    const q = searchParams.get('q') ?? ''
    const { value, handleGetAllRecipes, handleDeleteRecipe } = useRecipes()
    const { isLoading, error, filteredRecipes } = value
    const { user } = useUser()
    const { value: { filteredUsers, isLoading: isLoadingUsers }, handleGetAllUsersWithRecipes } = useUsers()

    const onDeleteRecipe = (recipeID) => {
        handleDeleteRecipe(recipeID)
        handleGetAllRecipes()
    }

    useEffect(() => {
        document.title = 'BisBook'
        handleGetAllRecipes()
        handleGetAllUsersWithRecipes()
    }, [handleGetAllRecipes, handleGetAllUsersWithRecipes])

    return (
        <Container maxWidth={false} sx={{ mx: 'auto', maxWidth: '1600px', mb: 2 }}>
            <PageHeader title='אתר המתכונים שלכם' subtitle='גלו עולם חדש של טעמים' />
            <SearchBar q={q} setSearchParams={setSearchParams} />

            <Box my={5}>
                {q ? <UsersGrid users={filteredUsers} isLoading={isLoadingUsers}/> : null}
            </Box>
            
            {q ? <RecipesFeedback user={user} isLoading={isLoading} error={error} recipes={filteredRecipes} onDelete={onDeleteRecipe}/> : <Box>
                <Typography variant='h5' component='h2' sx={{ mt: 5, fontWeight: 400, textAlign: 'center', color: 'primary' }}>כל מסע קולינרי גדול מתחיל בחיפוש קטן – הקלידו והתחילו לגלות.</Typography>
            </Box>}
        </Container>
    )
}

export default MainPage
