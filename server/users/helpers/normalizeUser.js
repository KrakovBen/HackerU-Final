const normalizeUser = rawUser => {
    let address = undefined
    let name = undefined

    if(!!rawUser.name) {
        name = { 
            ...rawUser.name,
            middle: rawUser.name?.middle || "",
            last: rawUser.name?.last || "" }
    }

    const image = {
        ...rawUser.image,
        url: rawUser.image?.url || "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png",
        alt: rawUser.image?.alt || "User image",
    }

    if(!!rawUser.address) {
        address = {
            ...rawUser.address,
            state: rawUser.address?.state || "not defined",
        }
    }

    const user = {
        ...rawUser,
        name,
        image,
        address
    }

    return user
}

module.exports = normalizeUser