import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ContactPage.css";

function ContactPage() {
   /* useEffect(() => {
        // Function to initialize the Google Map
        const initMap = () => {
            const mapOptions = {
                zoom: 8,
                center: { lat: -34.397, lng: 150.644 },
            };
            const map = new window.google.maps.Map(document.getElementById("google-map"), mapOptions);
        };

        // Load the Google Maps API script dynamically
        const loadGoogleMapsAPI = () => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBEDd_Sv9-p-I6bebrAMpmZBQvalqBE5Ds&callback=initMap`;
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            script.onerror = () => {
                console.error("Error loading Google Maps API");
            };
            window.initMap = initMap; // Set the callback to initialize the map
        };

        loadGoogleMapsAPI();
    }, []);
*/
    return (
        <div>
            {/* <!-- Preloader --> 
            <div className="tm-preloader">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="tm-preloader-logo">
                                <img src="assets/images/logo.png" alt="logo" />
                            </div>
                            <span className="tm-preloader-progress"></span>
                        </div>
                    </div>
                </div>
                <button className="tm-button tm-button-small">Cancel Preloader</button>
            </div>
            {/* <!--// Preloader --> */}

            {/* <!-- Wrapper --> */}
            <div id="wrapper" className="wrapper">
                {/* <!-- Header --> */}
                {/* <!--// Header --> */}
                {/* <!-- Breadcrumb Area --> */}
                <div className="tm-breadcrumb-area tm-padding-section bg-grey" style={{ backgroundImage: `url(assets/images/breadcrumb-bg.jpg)` }}>
                    <div className="container">
                        <div className="tm-breadcrumb">
                            <h2>Contact</h2>
                            <ul>
                                <li><Link to="/home">Home</Link></li>
                                <li>Contact</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <!--// Breadcrumb Area --> */}
                {/* <!-- Page Content --> */}
                <main className="page-content">
                    {/* <!-- Google Map --> 
                    <div id="google-map" className="google-map" style={{ width: "100%", height: "400px" }}></div>
                    {/* <!--// Google Map --> */}

                    {/* <!-- Contact Area --> */}
                    <div className="tm-section tm-contact-area tm-padding-section bg-white">
                        <div className="container">
                            <div className="tm-contact-blocks">
                                <div className="row mt-30-reverse justify-content-center">
                                    {/* <!-- Contact block --> */}
                                    <div className="col-lg-4 col-md-6 mt-30">
                                        <div className="tm-contact-block text-center">
                                            <i className="ion-android-call"></i>
                                            <h6>Call Us</h6>
                                            <p>Phone: <a href="tel:+18009156270">1 800 915 6270</a></p>
                                            <p>Tel: <a href="tel:+15147332010">1 514 733 2010</a></p>
                                        </div>
                                    </div>
                                    {/* <!--// Contact block --> */}

                                    {/* <!-- Contact block --> */}
                                    <div className="col-lg-4 col-md-6 mt-30">
                                        <div className="tm-contact-block text-center">
                                            <i className="ion-location"></i>
                                            <h6>Our Location</h6>
                                            <p>7415 Transcanadienne, Suite 100 St. Laurent, Quebec, Canada H45T 1Z22</p>
                                        </div>
                                    </div>
                                    {/* <!--// Contact block --> */}

                                    {/* <!-- Contact block --> */}
                                    <div className="col-lg-4 col-md-6 mt-30">
                                        <div className="tm-contact-block text-center">
                                            <i className="ion-email"></i>
                                            <h6>Email</h6>
                                            <p><a href="mailto:surose@gmail.com">surose@gmail.com</a></p>
                                            <p><a href="mailto:info@surose.com">info@surose.com</a></p>
                                        </div>
                                    </div>
                                    {/* <!--// Contact block --> */}
                                </div>
                            </div>

                            <div className="tm-contact-forms tm-padding-section-top">
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 col-12">
                                        <div className="tm-sectiontitle text-center">
                                            <h3>SEND US A MESSAGE</h3>
                                            <p>You can contact us for any of your requirements. We’ll help you meet your needs.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <form id="tm-contactform" action="assets/php/mailer.php" className="tm-contact-forminner tm-form" method="POST">
                                            <div className="tm-form-inner">
                                                <div className="tm-form-field tm-form-fieldhalf">
                                                    <label htmlFor="contact-form-name">Name</label>
                                                    <input type="text" id="contact-form-name" placeholder="Your name here" name="name" required />
                                                </div>
                                                <div className="tm-form-field tm-form-fieldhalf">
                                                    <label htmlFor="contact-form-email">Email</label>
                                                    <input type="email" id="contact-form-email" placeholder="surose@example.com" name="email" required />
                                                </div>
                                                <div className="tm-form-field tm-form-fieldhalf">
                                                    <label htmlFor="contact-form-phone">Phone</label>
                                                    <input type="text" id="contact-form-phone" placeholder="Your phone number here" name="phone" required />
                                                </div>
                                                <div className="tm-form-field tm-form-fieldhalf">
                                                    <label htmlFor="contact-form-subject">Subject</label>
                                                    <input type="text" id="contact-form-subject" placeholder="Your subject" name="subject" />
                                                </div>
                                                <div className="tm-form-field">
                                                    <label htmlFor="contact-form-message">Message</label>
                                                    <textarea cols="30" rows="5" id="contact-form-message" placeholder="Write your message" name="message"></textarea>
                                                </div>
                                                <div className="tm-form-field text-center">
                                                    <button type="submit" className="tm-button tm-button-block">Send Message</button>
                                                </div>
                                            </div>
                                        </form>
                                        <p className="form-messages"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!--// Contact Area --> */}
                </main>
                {/* <!--// Page Content --> */}
                {/* <!-- Footer --> */}
                {/* <!--// Footer --> */}
                <button id="back-top-top"><i className="ion-arrow-up-c"></i></button>
            </div>
            {/* <!--// Wrapper --> */}
        </div>
    );
}

export default ContactPage;
