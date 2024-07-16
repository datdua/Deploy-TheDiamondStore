import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "fancybox/dist/css/jquery.fancybox.css";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import "./HomePage.css";
import { toast } from "react-toastify";
import { getAllProduct } from "../../api/ProductAPI"; // Updated import
import { Modal } from "@mui/material";
import ImageLoading from "../../components/LoadingImg/ImageLoading"

const customModalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1000",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: "1000",
    },
};

function HomePage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await getAllProduct();
                const filteredProducts = productsData.filter((product) => {
                    // Check if it's a diamond based on structure
                    if (product.caratSize !== undefined && product.cut !== undefined) {
                        return true; 
                    }
                    // Check if it's jewelry based on structure
                    if (product.gender !== undefined && product.grossJewelryPrice !== undefined) {
                        return true; 
                    }
                    return false;
                });

                const diamonds = filteredProducts
                    .filter((product) => product.caratSize !== undefined && product.cut !== undefined)
                    .slice(0, 4);
                const jewelries = filteredProducts
                    .filter((product) => product.gender !== undefined && product.grossJewelryPrice !== undefined)
                    .slice(0, 4);

                setProducts([...diamonds, ...jewelries]);

                setTimeout(() => {
                    setLoading(false);
                }, 50); 

                console.log("Filtered Products:", filteredProducts);
                console.log("Diamonds:", diamonds); 
                console.log("Jewelries:", jewelries); 
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to fetch products");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to open the modal
    const openModal = (item) => {
        setSelectedItem(item);
        setIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsOpen(false);
        setSelectedItem(null);
    };

    return (
        <div>
            <div id="wrapper" className="wrapper">
                <HeroSlider />
                <main className="page-content">
                    <div className="tm-section tm-banners-area tm-padding-section1">
                        <div className="container">
                            <div className="row mt-30-reverse">
                                {[
                                    {
                                        src:
                                            "https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fbanner-home-3.png?alt=media&token=5e4cf140-24e0-4a76-a5df-d63541a60412",
                                        alt: "banner image 1",
                                    },
                                    {
                                        src:
                                            "https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fbanner-home-1.png?alt=media&token=46c190d2-838e-43ef-9a9e-d5ed09e9e037",
                                        alt: "banner image 2",
                                    },
                                    {
                                        src:
                                            "https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fbanner-home-2.png?alt=media&token=a2cc4d47-102b-43e5-9ce8-a4ecee01705c",
                                        alt: "banner image 3",
                                    },
                                ].map((banner, index) => (
                                    <div className="col-lg-4 col-md-6 col-sm-6 col-12 mt-30" key={`banner-${index}`}>
                                        <a href="/sanpham" className="tm-banner">
                                            <img src={banner.src} alt={banner.alt} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div id="tm-latest-products-area" className="tm-section tm-latest-products-area tm-padding-section bg-white">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6 col-12">
                                    <div className="tm-sectiontitle text-center">
                                        <h3>SẢN PHẨM NỔI BẬT</h3>
                                        <p>Các sản phẩm được đánh giá cao và đạt top số lượt mua trong các tháng qua</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-50-reverse">
                                {loading ? (
                                    <ImageLoading />
                                ) : error ? (
                                    <div>Error: {error}</div>
                                ) : products.length === 0 ? (
                                    <div>No products available</div>
                                ) : (
                                    products.map((item) => (
                                        <div className="col-lg-3 col-md-6 col-12" key={item.id}>
                                            <div className="tm-product">
                                                <div className="tm-product-topside">
                                                    <div className="tm-product-images">
                                                        <img src={item.diamondImage || item.jewelryImage} alt={item.name} />
                                                    </div>
                                                    <ul className="tm-product-actions">
                                                        <li>
                                                            <button onClick={() => openModal(item)} aria-label="Product Quickview">
                                                                <i className="ion-eye"></i>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <a>
                                                                <i className="ion-heart" style={{color:'white'}}></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div className="tm-product-badges">
                                                        <span className="tm-product-badges-new">Mới</span>
                                                        <span className="tm-product-badges-sale">Giảm giá</span>
                                                    </div>
                                                </div>
                                                <div className="tm-product-bottomside">
                                                    <h6 className="tm-product-title">
                                                        <Link
                                                            to={
                                                                item.gender !== undefined
                                                                    ? `/product-detail/jewelry/${item.jewelryID}`
                                                                    : `/product-detail/diamond/${item.diamondID}`
                                                            }
                                                        >
                                                            {item.jewelryName || item.diamondName}
                                                        </Link>
                                                    </h6>
                                                    <div className="tm-ratingbox">
                                                        <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                        <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                        <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                        <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                        <span><i className="ion-android-star-outline"></i></span>
                                                    </div>
                                                    <span className="tm-product-price">
                                                        {item.gender !== undefined
                                                            ? (item.grossJewelryPrice || "N/A").toLocaleString()
                                                            : (item.grossDiamondPrice || "N/A").toLocaleString()} VND
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="tm-product-loadmore text-center mt-50">
                                <a href="/sanpham" className="tm-button">
                                    Tất Cả Sản Phẩm
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="tm-section tm-offer-area tm-padding-section bg-grey">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-12 order-2 order-lg-1">
                                    <div className="tm-offer-content">
                                        <h6>Siêu đại tiệc voucher</h6>
                                        <h1>
                                            Nhanh tay mua hàng để nhận được <span>Voucher</span> siêu to khổng lồ
                                        </h1>
                                        <div className="tm-countdown" data-countdown="2020/10/12"></div>
                                        <a href="/sanpham" className="tm-button">
                                            Mua ngay
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12 order-1 order-lg-2">
                                    <div className="tm-offer-image">
                                        <img className="tm-offer" src="assets/images/voucher.png" alt="voucher" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <div id="tm-product-quickview">
                    {selectedItem && (
                        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customModalStyles} contentLabel="Product Quickview">
                            <div className="modal-content">
                                <div className="img-container">
                                    <img src={selectedItem.imageUrl} alt={selectedItem.name} />
                                </div>
                                <button className="close-button" onClick={closeModal}>
                                    Close
                                </button>
                                <div className="content-container">
                                    <h2>{selectedItem.name}</h2>
                                    <p>{selectedItem.description}</p>
                                    <p>Product ID: {selectedItem.id}</p>
                                    <p>Category: {selectedItem.gender ? "Jewelry" : "Diamond"}</p>
                                    <span>{selectedItem.price ? selectedItem.price.toLocaleString() : "N/A"} VND</span>
                                </div>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;