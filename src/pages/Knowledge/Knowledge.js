import { Link, useLocation } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./Knowledge.css"

function Knowledge() {
    return (
        <div>
            <div id="wrapper" className="wrapper">
                <div className="tm-breadcrumb-area tm-padding-section bg-grey" style={{ backgroundImage: `url(https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-banner%2Fimg-banner-kien-thuc.png?alt=media&token=21c4c1fe-63d9-426a-9f56-8b5c3cc7d486)` }}>
                    <div className="container">
                        <div className="tm-breadcrumb">
                            <h2>Kiến Thức Kim Cương</h2>
                            <ul className="add-back">
                                <li><Link to="/trangchu">Trang chủ</Link></li>
                                <li>Kiến Thức Kim Cương</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <main className="page-content">
                    <div className="tm-products-area tm-section tm-padding-section bg-white">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <a href="https://vi.wikipedia.org/wiki/Kim_c%C6%B0%C6%A1ng_nh%C3%A2n_t%E1%BA%A1o" target="_blank">
                                        <Card style={{ width: '23rem' }}>
                                            <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-knowledge%2Fimg-know-nhan-tao.png?alt=media&token=1f2c0694-9ab9-4080-915f-1bc20a3281ca" />
                                            <Card.Body>
                                                <Card.Title>Kim cương nhân tạo</Card.Title>
                                                <Card.Text>
                                                    Kim cương nhân tạo là loại đá được sản xuất với ánh quang,
                                                    tính chất vật lý [...]
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <a href="https://har.vn/thu-doi-har/cach-lua-chon-do-tinh-khiet-cua-kim-cuong-de-chi-tieu-kinh-te-nhat.html" target="_blank">
                                        <Card style={{ width: '23rem' }}>
                                            <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-knowledge%2Fimg-know-do-tinh-khiet.png?alt=media&token=be53e88a-824d-4413-b350-95779dacfb4f" />
                                            <Card.Body>
                                                <Card.Title>Cách lựa chọn độ tinh khiết</Card.Title>
                                                <Card.Text>
                                                    Độ độ tinh khiết (độ trong suốt – clarity) là một trong 4 yếu tố
                                                    quan trọng nhất để xác định [...]
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <a href="https://caodiamond.com/kim-cuong-duoc-tao-ra-nhu-the-nao/" target="_blank">
                                        <Card style={{ width: '23rem' }}>
                                            <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-knowledge%2Fimg-know-xuat-xu.png?alt=media&token=eed205ab-c455-4474-9478-677bb5805cab" />
                                            <Card.Body>
                                                <Card.Title>Kim cương tạo ra như thế nào ?</Card.Title>
                                                <Card.Text>
                                                    Viên kim cương lấp lánh được tạo thành từ những khoáng vật
                                                    có chứa cacbon [...]
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <a href="https://vi.wikipedia.org/wiki/Carbonado" target="_blank">
                                        <Card style={{ width: '23rem', marginTop:'35px'}}>
                                            <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-knowledge%2Fimg-know-den.png?alt=media&token=7a686718-919d-43ce-84f3-db3572e8bd51" />
                                            <Card.Body>
                                                <Card.Title>Carbonado - Kim cương đen</Card.Title>
                                                <Card.Text>
                                                    Carbonado, thường được gọi là kim cương đen, là hình thức cứng nhất [...]
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <a href="https://eunoiajewelry.com/tat-tan-tat-nhung-gi-ban-nen-biet-ve-giac-cat-kim-cuong-la-gi/" target="_blank">
                                        <Card style={{ width: '23rem', marginTop:'35px'}}>
                                            <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-knowledge%2Fimg-know-vet-cat.png?alt=media&token=0d2a09ba-fb1b-4c9d-a4d6-a2e4556e6ea7" />
                                            <Card.Body>
                                                <Card.Title>Kiến thức về vết cắt kim cương</Card.Title>
                                                <Card.Text>
                                                    Kim cương thô sau khi khai thác có vẻ đẹp cá tính
                                                    và độc đáo với màu sắc đặc biệt [...]
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </div>
                                <div className="col-md-4">
                                    <a href="https://genz.vn/tieu-chuan-bon-c-cua-kim-cuong/" target="_blank">
                                        <Card style={{ width: '23rem', marginTop:'35px'}}>
                                            <Card.Img variant="top" src="https://firebasestorage.googleapis.com/v0/b/the-diamond-store-423602.appspot.com/o/img-knowledge%2Fimg-know-chuan-4c.png?alt=media&token=e4166903-bbe8-47d3-b26b-a6d9143ba31a" />
                                            <Card.Body>
                                                <Card.Title>Tiêu chuẩn 4C kim cương</Card.Title>
                                                <Card.Text>
                                                    Quy chuẩn 4C được phát triển bởi Robert M.Shipley
                                                    vào những năm 1940 [...]
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
export default Knowledge;