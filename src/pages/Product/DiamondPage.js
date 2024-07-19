import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { getPage, searchDiamond } from "../../api/DiamondAPI";
import { Pagination } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ImageLoading from "../../components/LoadingImg/ImageLoading"

Modal.setAppElement('#root');

const customModalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: '1000',
        transition: 'opacity 0.5s ease-in-out',
    },
};

const DiamondPage = () => {
    const [diamonds, setDiamonds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const resultsPerPage = 9;
    const [filters, setFilters] = useState({
        color: 'Tất cả',
        cut: 'Tất cả',
        clarity: 'Tất cả',
        shape: 'Tất cả',
        origin: 'Tất cả',
        minDiamondPrice: '',
        maxDiamondPrice: '',
        minCaratSize: '',
        maxCaratSize: '',
        minCaratWeight: '',
        maxCaratWeight: '',
    });
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const [filterApplied, setFilterApplied] = useState(false);
    const colors = ['Tất cả', 'E', 'J', 'F', 'D'];
    const cuts = ['Tất cả', 'Excellent'];
    const clarities = ['Tất cả', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2', 'I1', 'I2', 'I3'];
    const shapes = ['Tất cả', 'Radiant', 'Around', 'Pear'];
    const origins = ['Tất cả', 'GIA'];


    useEffect(() => {
        fetchDiamonds(currentPage);
    }, [filterApplied, currentPage]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const results = params.get('results');
        if (results) {
            setSearchResults(JSON.parse(results));
        } else {
            setSearchResults([]);
        }
    }, [location]);

    const fetchDiamonds = async (page) => {
        setLoading(true);
        try {
            if (filterApplied) {
                const filtersToUse = {};

                // Only include non-empty and non-'Tất cả' filters
                Object.entries(filters).forEach(([key, value]) => {
                    if (value !== '' && value !== 'Tất cả') {
                        filtersToUse[key] = value;
                    }
                });

                const { content, totalPages } = await searchDiamond(filtersToUse, page, resultsPerPage);
                setDiamonds(content);
                setTotalPages(totalPages);

            } else {
                const data = await getPage(page, resultsPerPage);
                setTimeout(() => {
                    setDiamonds(data.content);
                    setTotalPages(data.totalPages);
                    setLoading(false);
                    window.scrollTo(0, 0);
                }, 50); 
            }
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const filtersToUse = {};

            // Include only non-empty and non-'Tất cả' filters
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== '' && value !== 'Tất cả') {
                    filtersToUse[key] = value;
                }
            });

            const { content, totalPages } = await searchDiamond(filtersToUse, 1, resultsPerPage);
            setDiamonds(content);
            setTotalPages(totalPages);

            setLoading(false);
            window.scrollTo(0, 0);
            closeModal();
            setFilterApplied(true); // Filters are now applied
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handlePageChange = async (page) => {
        setCurrentPage(page);
    };

    function openModal(item) {
        setSelectedItem(item);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setSelectedItem(null);
    }

    if (loading) {
        return <ImageLoading />;
    }
    return (
        <div>
            <div id="wrapper" className="wrapper">
                <div className="tm-breadcrumb-area tm-padding-section bg-grey" style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fimg-banner-kien-thuc.png?alt=media&token=21c4c1fe-63d9-426a-9f56-8b5c3cc7d486)` }}>
                    <div className="container">
                        <div className="tm-breadcrumb">
                            <h2>Kim Cương</h2>
                            <ul className="add-back">
                                <li><Link to="/trangchu">Trang chủ</Link></li>
                                <li>Kim Cương</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <main className="page-content">
                    <div className="tm-products-area tm-section tm-padding-section bg-white">
                        <div className="container">
                            <div className="row">
                                <button className="btn btn-primary mb-4" onClick={openModal} style={{ backgroundColor: '#f2ba59', maxWidth: '10%', }}><FilterAltIcon />Nâng cao</button>
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={customModalStyles}
                                    contentLabel="Advanced Search Modal"
                                >
                                    <div className="col-12">
                                        <form action="#" className="tm-shop-header">
                                            <div className="container-fluid px-1 px-sm-4 py-5 mx-auto">
                                                <div className="row d-flex justify-content-center">
                                                    <div className="col-md-12">
                                                        <div className="card border-0">
                                                            <div className="card-header bg-white d-flex justify-content-between align-items-center">

                                                                <h4 className="mb-0">Tính năng tìm kiếm nâng cao</h4>
                                                                <button type="button" className="btn btn-link" onClick={closeModal}><CloseIcon /></button>
                                                            </div>
                                                            <div className="card-body px-4 px-md-5 py-4">
                                                                <h5>DANH SÁCH LỌC</h5>

                                                                <div className="row">
                                                                    <div className="col-md-2 mb-4">
                                                                        <div className="card">
                                                                            <div className="card-header">
                                                                                <h6><span className="fa fa-filter mr-3"></span>Màu</h6>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <select
                                                                                    id="colorSearch"
                                                                                    className="form-control"
                                                                                    value={filters.color}
                                                                                    onChange={(e) => setFilters({ ...filters, color: e.target.value })}
                                                                                >
                                                                                    {colors.map((color) => (
                                                                                        <option key={color} value={color}>
                                                                                            {color}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-2 mb-4">
                                                                        <div className="card">
                                                                            <div className="card-header">
                                                                                <h6><span className="fa fa-filter mr-3"></span>Vết cắt</h6>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <select
                                                                                    id="cutSearch"
                                                                                    className="form-control"
                                                                                    value={filters.cut}
                                                                                    onChange={(e) => setFilters({ ...filters, cut: e.target.value })}
                                                                                >
                                                                                    {cuts.map((cut) => (
                                                                                        <option key={cut} value={cut}>
                                                                                            {cut}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-2 mb-4">
                                                                        <div className="card">
                                                                            <div className="card-header">
                                                                                <h6><span className="fa fa-filter mr-3"></span>Độ tinh khiết</h6>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <select
                                                                                    id="claritySearch"
                                                                                    className="form-control"
                                                                                    value={filters.clarity}
                                                                                    onChange={(e) => setFilters({ ...filters, clarity: e.target.value })}
                                                                                >
                                                                                    {clarities.map((clarity) => (
                                                                                        <option key={clarity} value={clarity}>
                                                                                            {clarity}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-2 mb-4">
                                                                        <div className="card">
                                                                            <div className="card-header">
                                                                                <h6><span className="fa fa-filter mr-3"></span>Hình dạng</h6>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <select
                                                                                    id="shapeSearch"
                                                                                    className="form-control"
                                                                                    value={filters.shape}
                                                                                    onChange={(e) => setFilters({ ...filters, shape: e.target.value })}
                                                                                >
                                                                                    {shapes.map((shape) => (
                                                                                        <option key={shape} value={shape}>
                                                                                            {shape}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-2 mb-4">
                                                                        <div className="card">
                                                                            <div className="card-header">
                                                                              <h6><span className="fa fa-filter mr-3"></span>Nguồn gốc</h6>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <select
                                                                                    id="originSearch"
                                                                                    className="form-control"
                                                                                    value={filters.origin}
                                                                                    onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
                                                                                >
                                                                                    {origins.map((origin) => (
                                                                                        <option key={origin} value={origin}>
                                                                                            {origin}
                                                                                        </option>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col-md-4 mb-4">
                                                                        <div className="card">
                                                                            <div className="card-header">
                                                                                <h6><span className="fa fa-filter mr-3"></span>Giá tiền</h6>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <div className="form-row">
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="minPrice">Giá tối thiểu</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            className="form-control"
                                                                                            id="minPrice"
                                                                                            placeholder="Giá tối thiểu"
                                                                                            value={filters.minDiamondPrice}
                                                                                            onChange={(e) => setFilters({ ...filters, minDiamondPrice: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="maxPrice">Giá tối đa</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            className="form-control"
                                                                                            id="maxPrice"
                                                                                            placeholder="Giá tối đa"
                                                                                            value={filters.maxDiamondPrice}
                                                                                            onChange={(e) => setFilters({ ...filters, maxDiamondPrice: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4 mb-4">
                                                                        <div className="card">
                                                                            <div className="card-header">
                                                                                <h6><span className="fa fa-filter mr-3"></span>Kích thước</h6>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <div className="form-row">
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="minCaratSize">Tối thiểu</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            className="form-control"
                                                                                            id="minCaratSize"
                                                                                            placeholder="Kích cỡ tối thiểu"
                                                                                            value={filters.minCaratSize}
                                                                                            onChange={(e) => setFilters({ ...filters, minCaratSize: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="maxCaratSize">Tối đa</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            className="form-control"
                                                                                            id="maxCaratSize"
                                                                                            placeholder="Kích cỡ tối đa"
                                                                                            value={filters.maxCaratSize}
                                                                                            onChange={(e) => setFilters({ ...filters, maxCaratSize: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4 mb-4">
                                                                        <div className="card">
                                                                            <div className="card-header">
                                                                                <h6><span className="fa fa-filter mr-3"></span>Trọng lượng</h6>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <div className="form-row">
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="minCaratWeight">Tối thiểu</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            className="form-control"
                                                                                            id="minCaratWeight"
                                                                                            placeholder="Trọng lượng tối thiểu"
                                                                                            value={filters.minCaratWeight}
                                                                                            onChange={(e) => setFilters({ ...filters, minCaratWeight: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="form-group col-md-6">
                                                                                        <label htmlFor="maxCaratWeight">Tối đa</label>
                                                                                        <input
                                                                                            type="number"
                                                                                            className="form-control"
                                                                                            id="maxCaratWeight"
                                                                                            placeholder="Trọng lượng tối đa"
                                                                                            value={filters.maxCaratWeight}
                                                                                            onChange={(e) => setFilters({ ...filters, maxCaratWeight: e.target.value })}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-12 d-flex flex-column">
                                                                <div className="mt-auto w-100">
                                                                    <div className="card-footer bg-white d-flex justify-content-end">
                                                                        <button className="btn btn-secondary px-4 mb-2 mr-5" type="button" onClick={closeModal}>Hủy</button>
                                                                        <button className="btn  ml-5" onClick={handleSearch} style={{ backgroundColor: '#f2ba59' }}>
                                                                            <span className="fa fa-filter"></span> &nbsp;&nbsp;Tìm kiếm
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </Modal>
                                <p className="tm-shop-countview">Hiển thị sản phẩm 1 đến {diamonds.length} trong {diamonds.length} sản phẩm</p>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-lg-9">
                                            <div className="tm-shop-products">

                                                <div className="row mt-30-reverse">
                                                    {loading ? (
                                                        <ImageLoading />
                                                    ) : error ? (
                                                        <div>Lỗi: {error}</div>
                                                    ) : (
                                                        diamonds.map((item) => (
                                                            <div key={item.diamondID} className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 mt-50">
                                                                <div className="tm-product">
                                                                    <div className="tm-product-topside">
                                                                        <div className="tm-product-images">
                                                                            <img src={item.diamondImage} alt={item.diamondName} />
                                                                        </div>
                                                                        <ul className="tm-product-actions">
                                                                            {showNotification && <p>Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.</p>}
                                                                            <li><Link to={`/product-detail/diamond/${item.diamondID}`}><i className="ion-android-cart"></i> Thêm giỏ hàng</Link></li>
                                                                            <li><button onClick={() => openModal(item)} aria-label="Product Quickview"><i className="ion-eye"></i></button></li>
                                                                            <li><a href="#"><i className="ion-heart"></i></a></li>
                                                                        </ul>
                                                                        <div className="tm-product-badges">
                                                                            <span className="tm-product-badges-new">Mới</span>
                                                                            <span className="tm-product-badges-sale">Giảm giá</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tm-product-bottomside">
                                                                        <h6 className="tm-product-title"><Link to={`/product-detail/diamond/${item.diamondID}`}>{item.diamondName}</Link></h6>
                                                                        <div className="tm-rating">
                                                                            <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                                            <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                                            <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                                            <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                                                            <span><i className="ion-android-star-outline"></i></span>
                                                                        </div>
                                                                        <span className="tm-product-price">{item.diamondEntryPrice ? item.diamondEntryPrice.toLocaleString() : 'N/A'} VND</span>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                            <div className="tm-pagination mt-50">
                                                <Pagination
                                                    count={totalPages}
                                                    page={currentPage}
                                                    onChange={(event, page) => handlePageChange(page)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="widgets">
                                                <div className="single-widget widget-categories">
                                                    <h6 className="widget-title">Danh mục</h6>
                                                    <ul>
                                                        <li><Link to="/trangsuc">Trang Sức</Link></li>
                                                        <li><Link to="/kimcuong">Kim Cương</Link></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DiamondPage;