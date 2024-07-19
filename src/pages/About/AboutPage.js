import React from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css";
import { Icon } from "@iconify-icon/react";

function AboutPage() {
  return (
    <div>
      <div id="wrapper" className="wrapper">
        <div
          className="tm-breadcrumb-area tm-padding-section bg-grey"
          style={{
            backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fimg-banner-gioithieu.png?alt=media&token=9e0e9255-48ba-41ec-9df8-3b87e95ea53e)`,
          }}
        >
          <div className="container">
            <div className="tm-breadcrumb">
              <h2>Giới Thiệu</h2>
              <ul className="add-back">
                <li>
                  <Link to="/trangchu">Trang chủ</Link>
                </li>
                <li>Giới Thiệu</li>
              </ul>
            </div>
          </div>
        </div>
        <main className="page-content">
          <div className="tm-section tm-feature-area bg-grey">
            <div className="container">
              <div className="row mt-30-reverse">
                <div className="col-lg-4 mt-30">
                  <div className="tm-feature">
                    <span className="tm-feature-icon">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-other%2Fic-shipping.png?alt=media&token=7a032e55-c76e-4891-b0fe-822b7828a0b7"
                        alt="free shipping"
                      />
                    </span>
                    <div className="tm-feature-content">
                      <h6>Giao Hàng Miễn Phí</h6>
                      <p>Áp dụng cho các đơn hàng trên 100 triệu.</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mt-30">
                  <div className="tm-feature">
                    <span className="tm-feature-icon">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-other%2Fic-deliverye.png?alt=media&token=4f6402c2-1683-4e62-8099-73a6b0177ef4"
                        alt="fast delivery"
                      />
                    </span>
                    <div className="tm-feature-content">
                      <h6>Giao Hàng Nhanh</h6>
                      <p>
                        Chúng tôi luôn giao hàng cho khách hàng rất nhanh chóng.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mt-30">
                  <div className="tm-feature">
                    <span className="tm-feature-icon">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-other%2Fic-twotone-support-agent.png?alt=media&token=2efee1af-1d78-43da-9b8a-727bbf7cce75"
                        alt="24/7 Support"
                      />
                    </span>
                    <div className="tm-feature-content">
                      <h6>Hỗ Trợ 24/7</h6>
                      <p>
                        Chúng tôi cung cấp hỗ trợ cho khách hàng trong vòng 24
                        giờ.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tm-about-area tm-padding-section bg-white">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="tm-about-image">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fimg-banner-gioithieu-1.png?alt=media&token=01a32c3d-4bf4-4b4b-836e-db04d85f1e1f"
                      alt="about image"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="tm-about-content">
                    <h4>WELCOME TO THE DIAMOND STORE</h4>
                    <h6>
                      Chào mừng bạn đến với The Diamond Store – thiên đường của
                      kim cương và trang sức đẳng cấp. Tại đây, chúng tôi tự hào
                      mang đến cho khách hàng những sản phẩm tinh tế, sang trọng
                      và đậm chất nghệ thuật, được chế tác từ những viên kim
                      cương quý giá và các loại đá quý hàng đầu thế giới.
                    </h6>
                    <p>
                      The Diamond Store không chỉ là một cửa hàng trang sức, mà
                      còn là nơi gửi gắm những giá trị tình cảm và phong cách
                      sống. Mỗi món trang sức tại cửa hàng chúng tôi đều được
                      thiết kế tỉ mỉ, nhằm tôn vinh vẻ đẹp và đẳng cấp của người
                      sở hữu.
                    </p>
                    <p>
                      Chúng tôi cam kết mang đến cho quý khách hàng trải nghiệm
                      mua sắm tuyệt vời nhất, chuyên nghiệp và chính sách hậu
                      mãi chu đáo.
                    </p>
                    <p>
                      Hãy đến với The Diamond Store để khám phá và lựa chọn cho
                      mình những món trang sức hoàn hảo, làm tôn vinh vẻ đẹp
                      rạng ngời của bạn và ghi dấu những khoảnh khắc đáng nhớ
                      trong cuộc đời. Chúng tôi rất hân hạnh được phục vụ bạn!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tm-team-members tm-padding-section bg-grey">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-12">
                  <div className="tm-sectiontitle text-center">
                    <h3>ĐỘI NGŨ VẬN HÀNH</h3>
                    <p>
                      Dưới đây là toàn bộ đội ngũ cũng như các thành viên tổ
                      chức cấp cao tại The Diamond Store.
                    </p>
                  </div>
                </div>
              </div>
              <div className="row tm-member-slider">
                <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                  <div className="tm-member">
                    <div className="tm-member-topside">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-avatar%2FNT%C4%90-ava.png?alt=media&token=f96e2472-fb36-4243-9ec2-a054dd31922f"
                        alt="team member"
                      />
                      <ul>
                        <li>
                          <a
                            href="https://www.facebook.com/datdua.27/"
                            target="_blank"
                          >
                            <i className="ion-social-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.instagram.com/datdua.27"
                            target="_blank"
                          >
                            {" "}
                            <i className="ion-social-instagram-outline"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-skype-outline"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            href="https://www.pinterest.com/toimqn27/"
                            target="_blank"
                          >
                            <i className="ion-social-pinterest-outline"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tm-member-bottomside">
                      <h6>Nguyễn Tấn Đạt</h6>
                      <p>Nhà sáng lập & Chủ tịch</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                  <div className="tm-member">
                    <div className="tm-member-topside">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-avatar%2FNMTP-ava.png?alt=media&token=a5f0b563-50d0-4d33-b2a3-8c9e2994ce27"
                        alt="team member"
                      />
                      <ul>
                        <li>
                          <a
                            href="https://www.facebook.com/8phuc/"
                            target="_blank"
                          >
                            <i className="ion-social-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-instagram-outline"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-skype-outline"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-pinterest-outline"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tm-member-bottomside">
                      <h6>Nguyễn Phan Thiên Phúc</h6>
                      <p>Giám đốc điều hành</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                  <div className="tm-member">
                    <div className="tm-member-topside">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-avatar%2FPTA-ava.png?alt=media&token=743a71e0-2f11-434c-a75a-140bb1241074"
                        alt="team member"
                      />
                      <ul>
                        <li>
                          <a
                            href="https://www.facebook.com/profile.php?id=100012389499325"
                            target="_blank"
                          >
                            <i className="ion-social-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-instagram-outline"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-skype-outline"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-pinterest-outline"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tm-member-bottomside">
                      <h6>Phan Thiên Ân</h6>
                      <p>Giám đốc kinh doanh</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-6">
                  <div className="tm-member">
                    <div className="tm-member-topside">
                      <img
                        src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-avatar%2FPLTD-ava.png?alt=media&token=b2f542da-8446-4de5-866b-54d428e48ee6"
                        alt="team member"
                      />
                      <ul>
                        <li>
                          <a
                            href="https://www.facebook.com/profile.php?id=100084193212666"
                            target="_blank"
                          >
                            <i className="ion-social-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-instagram-outline"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-skype-outline"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="ion-social-pinterest-outline"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tm-member-bottomside">
                      <h6>Phạm Lê Thành Dũng</h6>
                      <p>Hỗ trợ chuyên gia</p>
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
export default AboutPage;
