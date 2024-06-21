import React, { useEffect, useState } from 'react';
import "./HeroSlider.css"

const slidesData = [
    {
        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fbanner-silde1.png?alt=media&token=668c2ca6-0045-4b88-b096-a96a4ea6c6c5)',
        title: "Woman’s Jewellery Collection",
        description: "Jewellery may be made from a wide range of materials. Jewellery has been made to adorn nearly every body part from hairpins to toe.",
        link: "/sanpham",
    },
    {
        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fbanner-silde2.png?alt=media&token=fc348cb0-f807-4121-8ffb-b44ef6d51861)',
        title: "Men’s Jewellery Collection",
        description: "Discover the unique range of men's jewellery. From rings to bracelets, find the perfect accessory.",
        link: "/sanpham",
    }
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
        }, 9000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="tm-heroslider-area">
            <div className="tm-heroslider-slider">
                {slidesData.map((slide, index) => (
                    <a href='/sanpham' key={index}>
                        <div
                            className={`tm-heroslider ${currentSlide === index ? 'active' : ''}`}
                            style={{
                                backgroundImage: slide.backgroundImage,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'absolute',
                                top: 0,
                                left: `${(index - currentSlide) * 100}%`,
                                width: '100%',
                                height: '100%',
                                transition: 'left 1s ease-in-out',
                                color: 'white'
                            }}
                        >
                            {/* <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-7 col-md-8 col-12">
                                        <div className="tm-heroslider-contentwrapper">
                                            <div className="tm-heroslider-content">
                                                <h1 className="tm-heroslider-title">{slide.title}</h1>
                                                <p className="tm-heroslider-description">{slide.description}</p>
                                                <a href={slide.link} className="tm-button">Shop Now</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default HeroSlider;
