import React from "react"
import NavBar from "./TopNavBar/NavBar"
import ROUTES from "../../routes/routesModel"

const Header = () => {
    const menuItems = [
        {text: 'חדשים', link: ROUTES.NEWS},
        {text: 'אהובים', link: ROUTES.FAVORITES},
        {text: 'הרשמה', link: ROUTES.SIGNUP},
        {text: 'קטגוריות', link: ROUTES.CATEGORIES}
    ]

    return(
        <NavBar menuItems={menuItems}/>
    )
}

export default Header