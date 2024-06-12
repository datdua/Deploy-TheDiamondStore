import React, { useState, useEffect } from 'react';

function BackToTop (){
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <div>
            <button id="back-top-top" aria-label="Back to Top" onClick={handleBackToTop}>
                <i className="ion-arrow-up-c"></i>
            </button>
        </div>
    );
}

export default BackToTop;