import React from "react";
import logo from '../../img/logo.svg'

function Header() {
    return (
        <header className="header theme_grey">
            <div className="container">
                <a className="header__logo" href="/">
                    <img className="header__logo-img" src={logo} alt="logo" />
                    SearchPackages
                </a>
            </div>
        </header>
    )
}

export default Header;