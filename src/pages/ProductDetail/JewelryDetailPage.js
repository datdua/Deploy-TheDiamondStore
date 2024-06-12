import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJewelryById } from "../../api/JewelryAPI";
import "./ProductDetailPage.css";
import { addJewelryToCart, getAccountIDByEmail } from "../../api/addToCart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JewelryDetailPage() {
  const navigate = useNavigate();
  const [jewelry, setJewelry] = useState(null);
  const { jewelryId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [sizeJewelry, setSize] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        const jewelryData = await getJewelryById(jewelryId);
        setJewelry(jewelryData);
        setSize(jewelryData.size || ""); // Set the initial size
      } catch (error) {
        console.error("Error fetching jewelry details:", error);
      }
    };
    fetchJewelry();
  }, [jewelryId]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSizeChange = (event) => {
    const selectedSize = event.target.value || null; // Ensure that selectedSize is null if no size is selected
    setSize(selectedSize);
    console.log("Selected size:", selectedSize);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  const handleAddToCart = async (item) => {
    console.log("Add to Cart clicked");
    console.log("Item to be added:", item);

    if (!isLoggedIn) {
      console.log("Người dùng chưa đăng nhập");
      toast.error("Vui lòng đăng nhập trước khi thêm sản phẩm vào giỏ hàng");
    } else {
      try {
        const email = localStorage.getItem("email");
        const token = localStorage.getItem("jwt");
        console.log("User email:", email);
        console.log("JWT Token:", token);

        const accountID = await getAccountIDByEmail(email);
        console.log("Account ID:", accountID);

        console.log("Size:", sizeJewelry);
        const response = await addJewelryToCart(
          accountID,
          item.jewelryID || item.diamondID,
          quantity,
          sizeJewelry
        );
        console.log("Add to Cart response:", response);

        toast.success("Thêm vào giỏ hàng thành công!");
        navigate("/cart/" + accountID);
      } catch (error) {
        console.error("Failed to add item to cart:", error.message);
        toast.error("Thêm vào giỏ hàng không thành công: " + error.message);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div id="wrapper" className="wrapper">
        <div
          className="tm-breadcrumb-area tm-padding-section bg-grey"
          style={{ backgroundImage: `url(assets/images/breadcrumb-bg.jpg)` }}
        >
          <div className="container">
            <div className="tm-breadcrumb">
              <h2>Product Details</h2>
              <ul>
                <li>
                  <Link to="/trangchu">Home</Link>
                </li>
                <li>
                  <Link to="/sanpham">Products</Link>
                </li>
                <li>{jewelry ? jewelry.jewelryName : "Loading..."}</li>
              </ul>
            </div>
          </div>
        </div>
        <main className="page-content">
          {jewelry && (
            <div className="tm-product-details-area tm-section tm-padding-section bg-white">
              <div className="container">
                <div className="row">
                  <div className="col-lg-9 col-12">
                    <div className="tm-prodetails">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-10 col-12">
                          <div className="tm-prodetails-images">
                            <div className="tm-prodetails-largeimages">
                              <div className="tm-prodetails-largeimage">
                                <img
                                  src={jewelry.jewelryImage}
                                  alt="product image"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                          <div className="tm-prodetails-content">
                            <h4 className="tm-prodetails-title">
                              {jewelry.jewelryName}
                            </h4>
                            <span className="tm-prodetails-price">
                              {jewelry.jewelryEntryPrice.toLocaleString()} VND
                            </span>
                            <div className="tm-prodetails-infos">
                              <div className="tm-prodetails-singleinfo">
                                <b>Product ID : </b>
                                {jewelry.jewelryID}
                              </div>
                              <div className="tm-prodetails-singleinfo">
                                <b>Size : </b>
                                <select
                                  value={sizeJewelry}
                                  onChange={handleSizeChange}
                                >
                                  {[
                                    6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                                    18, 19, 20,
                                  ].map((sizeOption) => (
                                    <option key={sizeOption} value={sizeOption}>
                                      {sizeOption}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="tm-prodetails-singleinfo">
                                <b>Gender : </b>
                                <span className="color-theme">
                                  {jewelry.gender}
                                </span>
                              </div>
                            </div>
                            <p>{jewelry.description}</p>
                            <div className="tm-prodetails-quantitycart">
                              <h6>Quantity :</h6>
                              <div className="tm-quantitybox">
                                <input type="text" value={quantity} readOnly />
                                <div className="quantity-buttons">
                                  <button
                                    className="increase-button"
                                    onClick={increaseQuantity}
                                  >
                                    +
                                  </button>
                                  <button
                                    className="decrease-button"
                                    onClick={decreaseQuantity}
                                  >
                                    -
                                  </button>
                                </div>
                              </div>
                              <button
                                onClick={() => handleAddToCart(jewelry)}
                                href="/cart"
                              >
                                Add to cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
        {/* <!--// Page Content --> */}
        {/* <!-- Footer --> */}

        {/* <!--// Footer --> */}
      </div>
      {/* <!--// Wrapper --> */}
    </div>
  );
}
export default JewelryDetailPage;
