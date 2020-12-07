import React, { useRef } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import BackGroundImg from "../assets/bg.png";
import BackGroundImg2 from "../assets/bg-2.png";
import "./HomePage.css";
import { Link } from "react-router-dom";

export default function HomePage() {
    const imgRef = useRef(0);
    function mouseMove(event) {
        imgRef.current.style.top = `${
            event.clientX / 100 > window.innerHeight / 100
                ? 30 - event.clientX / 150
                : 30 + event.clientX / 150
        }%`;
        imgRef.current.style.right = `${
            event.clientY / 100 > window.innerWidth / 100
                ? (-1 * event.clientY) / 100
                : event.clientY / 200
        }%`;
    }

    return (
        <Container
            onMouseMove={mouseMove}
            style={{ height: "100vh", width: "100vw" }}
        >
            <Row className="h-100">
                <Col
                    className="d-flex justify-content-center align-items-center flex-column p-3"
                    xs={12}
                    lg={6}
                >
                    <div>
                        <p className="h2">
                            Like Music?
                            <br /> Need something for road trip?
                        </p>
                        <p className="h-6">
                            Plug in your pen drive, select your favourite music,
                            We'll take care of the rest. Magical, isn't it? 🎉
                            <br />
                            Creating your favourite jams will never be this
                            easier. 😎
                            <br />
                            <br />
                            What are you waiting for? Let the party begin. 💃🏻🎊
                        </p>
                        <div className="pt-3 pr-4 d-flex justify-content-between">
                            <Link to="/info">
                                <button className="btn btn-outline-dark">
                                    Info
                                </button>
                            </Link>
                            <Link to="/usb">
                                <button className="btn btn-dark d-flex  align-items-center">
                                    <span>Lets Go</span>
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <line
                                                x1="5"
                                                y1="12"
                                                x2="19"
                                                y2="12"
                                            ></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </Col>
                <Col
                    className="d-flex justify-content-center align-items-center"
                    xs={12}
                    lg={6}
                >
                    <Image
                        src={BackGroundImg}
                        className="w-100"
                        alt="background for the people"
                    />
                    <Image
                        src={BackGroundImg2}
                        className="w-100 position-absolute animated"
                        ref={imgRef}
                        alt="Illustration of people listening music"
                    />
                </Col>
            </Row>
        </Container>
    );
}
