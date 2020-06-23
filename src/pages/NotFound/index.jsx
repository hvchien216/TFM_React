import React, { useEffect } from 'react'
import './style.scss';
import { Link } from 'react-router-dom';

function NotFound() {
    useEffect(() => {
        const list = document.getElementById('notfound');
        window.scroll({
            top: list.offsetTop,
            left: 0,
        });
    }, [])
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <h2>404 - Page not found</h2>
                <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                <Link to="/">Go To Homepage</Link>
            </div>
        </div>
    )
}

export default NotFound;