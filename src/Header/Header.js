import React from 'react'
import './_header.scss'
const Header = props => (
    <header className="app-header">
        <h1>{props.nombreProyecto.toUpperCase()}</h1>
        <p>Por <a href="https://github.com/alejandrollanganate" target="_blank" rel="noopener noreferrer">Alejandro Llanganate</a></p>
    </header>
)

export default Header