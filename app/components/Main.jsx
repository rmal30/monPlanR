import React from 'react'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

function Main(props) {
    return (
        <div className='main-container'>
            <Header />
            {props.children}
            <Footer />
        </div>

    );
}

export default Main
