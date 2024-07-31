import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJewelryById } from "../../api/JewelryAPI";
import "./ProductDetailPage.css";
import { addJewelryToCart } from "../../api/addToCart";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SizeInstructionModal from "../../components/SizeInstructionModal/SizeInstructionModal";
import { getAccountIDByEmail } from "../../api/accountCrud";
import Button from "react-bootstrap/esm/Button";
import ImageLoading from "../../components/LoadingImg/ImageLoading"
import Badge from 'react-bootstrap/Badge';

function JewelryDetailPage() {
  const navigate = useNavigate();
  const { jewelryId } = useParams();
  const [jewelry, setJewelry] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [sizeJewelry, setSize] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [maxQuantityReached, setMaxQuantityReached] = useState(false);

  useEffect(() => {
    const fetchJewelry = async () => {
      try {
        setLoading(true);
        const jewelryData = await getJewelryById(jewelryId);
        setJewelry(jewelryData);
        setSize(jewelryData.size || "");
        setMaxQuantity(jewelryData.quantity);
        setTimeout(() => {
          setLoading(false);
        }, 50);
      } catch (error) {
        console.error("Error fetching jewelry details:", error);
        setLoading(false);
      }
    };
    fetchJewelry();
  }, [jewelryId]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity + 1 > maxQuantity) {
        toast.error("Đã đến số lượng tối đa");
        setMaxQuantityReached(true);
        return prevQuantity;
      }
      const newQuantity = Math.min(prevQuantity + 1, maxQuantity);
      setMaxQuantityReached(newQuantity === maxQuantity);
      return newQuantity;
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleSizeChange = (event) => {
    const selectedSize = event.target.value || null;
    setSize(selectedSize);
    console.log("Selected size:", selectedSize);
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const jwt = localStorage.getItem("jwt");
      setIsLoggedIn(!!jwt);
    };
    checkLoginStatus();
  }, []);

  const handleAddToCart = async (item) => {
    console.log("Add to Cart clicked");
    console.log("Item to be added:", item);

    if (!sizeJewelry) {
      console.log("Size not selected");
      toast.warning("Vui lòng chọn kích thước trước khi thêm sản phẩm vào giỏ hàng");
      return;
    }

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
        if (error.response && error.response.data && error.response.data.message) {
          const errorMessage = error.message;
          toast.error(errorMessage);
        } else {
          toast.warning("Sản phẩm hiện đang hết hàng hoặc đang tạm ngưng, vui lòng chọn sản phẩm khác! " );
        }
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <ImageLoading />;
  }

  return (
    <>
      <div>
        <div id="wrapper" className="wrapper">
          <div
            className="tm-breadcrumb-area tm-padding-section bg-grey"
            style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fimg-banner-nhan2.png?alt=media&token=5dba9bcc-dfe4-466e-be5a-d9a7c9f1c0b3)` }}
          >
            <div className="container">
              <div className="tm-breadcrumb">
                <h2>Thông tin chi tiết</h2>
                <ul className="add-back">
                  <li>
                    <Link to="/trangchu">Trang chủ</Link>
                  </li>
                  <li>
                    <Link to="/sanpham">Sản phẩm</Link>
                  </li>
                  <li>{jewelry ? jewelry.jewelryName : "Đang tải..."}</li>
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
                              <img src={jewelry.jewelryImage} alt="jewelry"/>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="tm-prodetails-content" style={{ fontSize: 'larger' }}>
                              <h2 className="tm-prodetails-title" style={{ fontSize: '25px' }}>
                                {jewelry.jewelryName}
                              </h2>
                              <div style={{ display: 'flex' }}>
                                <span style={{ fontSize: '22px' }} className="tm-prodetails-price">{jewelry.jewelryEntryPrice.toLocaleString()} VND</span>
                                {jewelry.status === 'Còn hàng' ? ( 
                                <Badge style={{ fontSize: '17px' }} pill bg="success">
                                  Còn hàng
                                </Badge>
                                ) : (
                                <Badge style={{ fontSize: '17px' }} pill bg="warning">
                                  Hàng tạm ngừng
                                </Badge>
                                )}
                              </div>
                              <span className="tm-prodetails-singleinfo" style={{marginTop:'8px', marginBottom:'8px'}}>Sản phẩm còn lại: {jewelry.quantity}</span>
                              <hr/>
                              <div className="tm-prodetails-infos">
                                <div className="tm-prodetails-singleinfo" style={{marginTop: '15px' }}>
                                  <b>Mã Sản Phẩm: </b>
                                  {jewelry.jewelryID}
                                </div>
                                <div className="tm-prodetails-singleinfo" style={{marginTop: '15px' }}>
                                  <b>Giới tính: </b>
                                  {jewelry.gender}
                                </div>
                                <div className="tm-prodetails-singleinfo" style={{marginTop: '15px' }}>
                                  <b>Chọn Kích Cỡ: </b>
                                  <select
                                    value={sizeJewelry}
                                    onChange={handleSizeChange}
                                    style={{ maxWidth: "150px", fontSize:'15px' }}
                                  >
                                    {[
                                      'Chọn kích cỡ ', 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                                      18, 19, 20,
                                    ].map((sizeOption) => (
                                      <option key={sizeOption} value={sizeOption}>
                                        {sizeOption}
                                      </option>
                                    ))}
                                  </select>
                                  <Button
                                    onClick={() => setModalShow(true)}
                                    style={{ marginLeft: "10px", background: "#f2ba59", borderRadius: "5px", textAlign: "center" }}
                                  >Cách đo ni
                                  </Button>
                                </div>
                              </div>
                              <div className="tm-prodetails-quantitycart">
                                <div className="input-group">
                                  <button
                                    className="decrease-button"
                                    onClick={decreaseQuantity}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    -
                                  </button>
                                  <input
                                    type="text"
                                    value={`${quantity} / ${maxQuantity}`}
                                    readOnly
                                    style={{ maxWidth: "100px", textAlign: "center", fontSize:'15px' }}
                                  />
                                  <button
                                    className="increase-button"
                                    onClick={increaseQuantity}
                                    style={{ fontWeight: "bold" }}
                                  >
                                    +
                                  </button>
                                  <Button
                                    onClick={() => handleAddToCart(jewelry)}
                                    style={{ background: "#f2ba59", borderRadius: "5px", textAlign: "center", marginLeft: '30px' }}
                                  >
                                    Thêm vào giỏ hàng
                                  </Button>
                                </div>
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
          <SizeInstructionModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      </div>
    </>
  );
}

export default JewelryDetailPage;
