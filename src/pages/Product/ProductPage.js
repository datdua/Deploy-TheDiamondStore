import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-modal";
import ImageLoading from "../../components/LoadingImg/ImageLoading";
import { getProductPage, searchProductionByName } from "../../api/ProductAPI";
import { Pagination } from "@mui/material";

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

function ProductPage() {
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setIsSearching(searchTerm.trim() !== '');
        let data;

        if (searchTerm.trim() === '') {
          // Fetch all products if no search term
          data = await getProductPage(currentPage, itemsPerPage);
          console.log("Fetched data:", data); // Debug log

          if (data) {
            const combinedProducts = [
              ...(data.diamonds || []),
              ...(data.jewelry || []),
            ].map((item) => ({
              id: item.jewelryID || item.diamondID,
              name: item.jewelryName || item.diamondName,
              imageUrl: item.jewelryImage || item.diamondImage,
              price: item.jewelryEntryPrice || item.diamondEntryPrice,
              type: item.jewelryID ? "jewelry" : "diamond",
            }));

            setProducts(combinedProducts);
            setTotalItems(data.diamondsTotalElements + data.jewelryTotalElements);
            setTotalPages(Math.ceil((data.diamondsTotalElements + data.jewelryTotalElements) / itemsPerPage));
          }
        } else {
          // Fetch products based on search term
          data = await searchProductionByName(searchTerm, currentPage, itemsPerPage);
          console.log("Search results:", data); // Debug log

          if (data) {
            const searchResults = [
              ...(data.jewelry || []).map((item) => ({
                id: item.jewelryID,
                name: item.jewelryName,
                imageUrl: item.jewelryImage,
                price: item.jewelryEntryPrice,
                type: "jewelry",
              })),
              ...(data.diamonds || []).map((item) => ({
                id: item.diamondID,
                name: item.diamondName,
                imageUrl: item.diamondImage,
                price: item.diamondEntryPrice,
                type: "diamond",
              }))
            ];
            setSearchResults(searchResults);
            setTotalItems(data.jewelryTotalElements + data.diamondsTotalElements);
            setTotalPages(Math.max(data.jewelryTotalPages, data.diamondsTotalPages));
          } else {
            setSearchResults([]);
            setTotalItems(0);
            setTotalPages(1);
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm]);

  function openModal(item) {
    setSelectedItem(item);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setSelectedItem(null);
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const displayedProducts = isSearching ? searchResults : products;

  return (
    <div>
      <div id="wrapper" className="wrapper">
        <div className="tm-breadcrumb-area tm-padding-section bg-grey" style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fimg-banner-gioithieu.png?alt=media&token=9e0e9255-48ba-41ec-9df8-3b87e95ea53e)` }}>
          <div className="container">
            <div className="tm-breadcrumb">
              <h2>Sản Phẩm</h2>
              <ul className="add-back">
                <li><Link to="/trangchu">Trang chủ</Link></li>
                <li>Sản Phẩm</li>
              </ul>
            </div>
          </div>
        </div>
        <main className="page-content">
          <div className="tm-products-area tm-section tm-padding-section bg-white">
            <div className="container">
              <div className="row">
                <div className="col-lg-9 col-12">
                  <form action="#" className="tm-shop-header">
                    <p className="tm-shop-countview">
                      Hiển thị sản phẩm {((currentPage - 1) * itemsPerPage*2) + 1} đến {Math.min(currentPage  * itemsPerPage * 2, totalItems)} trong {totalItems} sản phẩm
                    </p>
                  </form>
                  <div className="tm-shop-products">
                    <div className="row mt-30-reverse">
                      {loading ? (
                        <ImageLoading />
                      ) : error ? (
                        <div>Lỗi: {error}</div>
                      ) : displayedProducts.length === 0 ? (
                        <div>Không có sản phẩm</div>
                      ) : (
                        displayedProducts.map((item) => (
                          <div className="col-lg-4 col-md-6 col-12" key={item.id}>
                            <div className="tm-product">
                              <div className="tm-product-topside">
                                <div className="tm-product-images">
                                  <img src={item.imageUrl} alt={item.name} />
                                </div>
                                <ul className="tm-product-actions">
                                  <li><button onClick={() => openModal(item)} aria-label="Product Quickview"><i className="ion-eye"></i></button></li>
                                  <li><a><i className="ion-heart" style={{ color: 'white' }}></i></a></li>
                                </ul>
                                <div className="tm-product-badges">
                                  <span className="tm-product-badges-new">Mới</span>
                                  <span className="tm-product-badges-sale">Hot</span>
                                </div>
                              </div>
                              <div className="tm-product-bottomside">
                                <h6 className="tm-product-title">
                                  <Link
                                    to={
                                      item.type === 'jewelry'
                                        ? `/product-detail/jewelry/${item.id}`
                                        : `/product-detail/diamond/${item.id}`
                                    }
                                  >
                                    {item.name}
                                  </Link>
                                </h6>
                                <div className="tm-ratingbox">
                                  <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                  <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                  <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                  <span className="is-active"><i className="ion-android-star-outline"></i></span>
                                  <span><i className="ion-android-star-outline"></i></span>
                                </div>
                                <span className="tm-product-price">{item.price ? item.price.toLocaleString() : 'N/A'} VND</span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    {/* Pagination */}
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

export default ProductPage;
