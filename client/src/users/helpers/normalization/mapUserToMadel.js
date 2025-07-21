const mapUserToMadel = (user) => {
    return {
        firstName: user.name?.first || '',
        middleName: user.name?.middle || '',
        lastName: user.name?.last || '',
        phoneNumber: user.phoneNumber || '',
        password: user.password || ''
    }
}

export default mapUserToMadel
