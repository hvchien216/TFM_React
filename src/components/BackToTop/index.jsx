import React, { useEffect } from 'react'
import './style.scss';
function BackToTop() {

    const handleScroll = () => {
        const backToTop = document.getElementById("back-to-top");

        if (window.scrollY / document.body.scrollWidth > 0.45) {
            backToTop.style.display = "block";
        }
        else {
            backToTop.style.display = "none";
        }
    }
    const scrollToTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }

    }, [])
    return (
        <div onClick={scrollToTop} id="back-to-top">
            <i className="fa fa-arrow-circle-up"></i>
        </div>
    )
}

export default BackToTop;

