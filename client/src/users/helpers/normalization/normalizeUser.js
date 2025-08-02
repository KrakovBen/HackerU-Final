const normalizeUser = (user) => ({
    name: { 
        first: user.firstName,
        last: user.lastName
    },
    email: user.email,
    password: user.password
})

export default normalizeUser