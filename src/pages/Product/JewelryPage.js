import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { getPage, searchJewelry } from "../../api/JewelryAPI";
import { Pagination } from "@mui/material";
import ImageLoading from "../../components/LoadingImg/ImageLoading";

Modal.setAppElement("#root");

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

function JewelryPage() {
  const location = useLocation();
  const [jewelry, setJewelry] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [gender, setGender] = useState("Tất cả");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const resultsPerPage = 9;
  const genders = ["Tất cả", "Nam", "Nữ"];

  const fetchJewelryPage = async (page = 1, filtersToUse = {}) => {
    try {
      setLoading(true);
      setTimeout(async () => {
        try {
          let data;
          if (Object.keys(filtersToUse).length > 0) {
            data = await searchJewelry(page, filtersToUse);
          } else {
            data = await getPage(page);
          }
          setJewelry(data.content);
          setTotalPages(data.totalPages);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }, 50);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJewelryPage(currentPage, filters);
  }, [currentPage, filters]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const results = params.get("results");
    if (results) {
      const parsedResults = JSON.parse(results);
      const resultsWithImages = parsedResults.map((item) => ({
        ...item,
        jewelryImage: item.jewelryImage,
      }));
      setSearchResults(resultsWithImages);
    } else {
      setSearchResults([]);
    }
  }, [location]);

  function openModal(item) {
    setSelectedItem(item);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedItem(null);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setLoading(true);
    try {
      const newFilters = {};
      if (gender !== "Tất cả") {
        newFilters.gender = gender;
      }
      if (minPrice) {
        newFilters.minjewelryEntryPrice = parseInt(minPrice, 10);
      }
      if (maxPrice) {
        newFilters.maxjewelryEntryPrice = parseInt(maxPrice, 10);
      }
      setFilters(newFilters);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const jwt = localStorage.getItem("jwt");
      setIsLoggedIn(!!jwt);
    };
    checkLoginStatus();
  }, []);

  if (loading) {
    return <ImageLoading />;
  }

  return (
    <div>
      <div className="wrapper">
        <div
          className="tm-breadcrumb-area tm-padding-section bg-grey"
          style={{
            backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fimg-banner-nhan4.png?alt=media&token=74c4526e-782b-49f5-bce9-f2f399a675ed)`,
          }}
        >
          <div className="container">
            <div className="tm-breadcrumb">
              <h2>Trang Sức</h2>
              <ul className="add-back">
                <li>
                  <Link to="/trangchu">Trang chủ</Link>
                </li>
                <li>Trang Sức</li>
              </ul>
            </div>
          </div>
        </div>
        <main className="page-content">
          <div className="tm-products-area tm-section tm-padding-section bg-white">
            <div className="container">
              <div className="row">
                <div className="col-lg-9 col-12">
                  <form className="tm-shop-header" onSubmit={handleSearch}>
                    <p className="tm-shop-countview">
                      Hiển thị sản phẩm 1 đến {resultsPerPage} trong {jewelry.length} sản phẩm{" "}
                    </p>
                  </form>
                  <div className="tm-shop-products">
                    <div className="row mt-30-reverse">
                      {loading ? (
                        <ImageLoading />
                      ) : error ? (
                        <div>Error: {error}</div>
                      ) : (
                        jewelry.map((item) => (
                          <div
                            key={item.jewelryID}
                            className="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12 mt-50"
                          >
                            <div className="tm-product">
                              <div className="tm-product-topside">
                                <div className="tm-product-images">
                                  <img
                                    src={item.jewelryImage}
                                    alt={item.jewelryName}
                                  />
                                </div>
                                <ul className="tm-product-actions">
                                  {isLoggedIn ? null : (
                                    <p>
                                      Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.
                                    </p>
                                  )}
                                  <li>
                                    <Link
                                      to={`/product-detail/jewelry/${item.jewelryID}`}
                                    >
                                      <i className="ion-android-cart"></i> Thêm giỏ hàng
                                    </Link>
                                  </li>
                                  <li>
                                    <button disabled>
                                      <i className="ion-eye"></i>
                                    </button>
                                  </li>
                                  <li>
                                    <a href="#" onClick={(e) => e.preventDefault()}>
                                      <i className="ion-heart"></i>
                                    </a>
                                  </li>

                                </ul>
                                <div className="tm-product-badges">
                                  <span className="tm-product-badges-new">
                                    Mới
                                  </span>
                                  <span className="tm-product-badges-sale">
                                    Hot
                                  </span>
                                </div>
                              </div>
                              <div className="tm-product-bottomside">
                                <h6 className="tm-product-title">
                                  <Link
                                    to={`/product-detail/jewelry/${item.jewelryID}`}
                                  >
                                    {item.jewelryName}
                                  </Link>
                                </h6>
                                <div className="tm-rating">
                                  <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                  <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                  <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                  <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                  <span><i className="ion-android-star-outline"></i></span>
                                </div>
                                <div className="tm-product-price-quantity-row" style={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',

                                }}>
                                  <span className="tm-product-price">
                                    {item.jewelryEntryPrice ? item.jewelryEntryPrice.toLocaleString() : 'N/A'} VND
                                  </span>
                                  <span className="tm-product-quantity">Số lượng: {item.quantity}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="tm-pagination mt-50">
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-12">
                  <div className="widgets">
                    <div className="single-widget widget-categories">
                      <h6 className="widget-title">Danh mục</h6>
                      <ul>
                        <li>
                          <Link to="/trangsuc">Trang Sức</Link>
                        </li>
                        <li>
                          <Link to="/kimcuong">Kim Cương</Link>
                        </li>
                      </ul>
                    </div>
                    <form onSubmit={handleSearch}>
                      <div className="single-widget widget-colorfilter">
                        <h6 className="widget-title">Lọc theo giới tính</h6>
                        <select
                          id="colorSearch"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                        >
                          {genders.map((gender) => (
                            <option key={gender} value={gender}>
                              {gender}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="single-widget widget-pricefilter">
                        <h6 className="widget-title">Lọc Theo Giá</h6>
                        <div>
                          <label>Giá tối thiểu: </label>
                          <input
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                          />
                        </div>
                        <div>
                          <label>Giá tối đa:</label>
                          <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <button type="submit" style={{ backgroundColor: '#f2ba59', marginTop: '10px' }} className="btn btn-primary mb-4">Tìm kiếm</button>
                    </form>
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

export default JewelryPage;
