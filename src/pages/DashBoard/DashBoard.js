// // Dashboard.js
// import React, { useEffect, useState } from "react";
// import "./DashBoard.css";

// import { Card, Statistic, Row, Col } from 'antd';
// import { DollarOutlined, UserOutlined, ArrowUpOutlined } from '@ant-design/icons';
// import { countCustomer } from "../../api/accountCrud";

// function Dashboard() {
//   const [customer, setCustomer] = useState([]);
//   useEffect(() => {
//     const fetchCountCustomer = async () => {
//       try {
//         const count = await countCustomer();
//         setCustomer(count);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchCountCustomer();
//   })

//   return (
//     <div>
//     <div className="dash-board">
//       <div className="row">
//         <div className="col-md-3 card-info" >
//           <Col>
//             <Card
//               title="Tổng doanh thu"
//               bordered={false}
//               style={{ width: 300, backgroundColor: "#daa573", color: "white" }}
//               // 
//             >
//               <Statistic
//                 value={customer}
//                 // value={10}
//                 precision={0}
//                 valueStyle={{ color: 'white', fontSize: '36px' }}
//                 prefix={<DollarOutlined />}
//                 suffix={
//                   <div style={{ fontSize: '16px', color: 'white' }}>
//                     <ArrowUpOutlined /> 100 so với 7 ngày qua
//                   </div>
//                 }
//               />
//             </Card>
//           </Col>
//         </div>
//         <div className="col-md-3 card-info" >
//           <Col>
//             <Card 
//               title="Tổng khách hàng"
//               bordered={false}
//               style={{ width: 300, backgroundColor: "#daa573", color: "white" }}
//             >
//               <Statistic
//                 value={customer}
//                 // value={10}
//                 precision={0}
//                 valueStyle={{ color: 'white', fontSize: '36px' }}
//                 prefix={<UserOutlined />}
//                 suffix={
//                   <div style={{ fontSize: '16px', color: 'white' }}>
//                     <ArrowUpOutlined /> 100 so với 7 ngày qua
//                   </div>
//                 }
//               />
//             </Card>
//           </Col>
//         </div>
//         <div className="col-md-3 card-info" >
//           <Col>
//             <Card styles={{}}
//               title="Tổng khách hàng"
//               bordered={false}
//               style={{ width: 300, backgroundColor: "#daa573", color: "white" }}
              
//             >
//               <Statistic
//                 // value={customer}
//                 value={10}
//                 precision={0}
//                 valueStyle={{ color: 'white', fontSize: '36px' }}
//                 prefix={<UserOutlined />}
//                 suffix={
//                   <div style={{ fontSize: '16px', color: 'white' }}>
//                     <ArrowUpOutlined /> 100 so với 7 ngày qua
//                   </div>
//                 }
//               />
//             </Card>
//           </Col>
//         </div>
//         <div className="col-md-3 card-info" >
//           <Col>
//             <Card 
//               title="Tổng khách hàng"
//               bordered={false}
//               style={{ width: 300, backgroundColor: "#daa573", color: "white" }}
              
//             >
//               <Statistic
//                 // value={customer}
//                 value={10}
//                 precision={0}
//                 valueStyle={{ color: 'white', fontSize: '36px' }}
//                 prefix={<UserOutlined />}
//                 suffix={
//                   <div style={{ fontSize: '16px', color: 'white' }}>
//                     <ArrowUpOutlined /> 100 so với 7 ngày qua
//                   </div>
//                 }
//               />
//             </Card>
//           </Col>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
  
// }

// export default Dashboard;
