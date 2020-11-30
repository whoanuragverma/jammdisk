import React, { useRef } from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import BackGroundImg from "../assets/bg.png";
import BackGroundImg2 from "../assets/bg-2.png";
import "./HomePage.css";

export default function HomePage() {
    const imgRef = useRef(0);
    function mouseMove(event) {
        imgRef.current.style.top = `${
            event.clientX / 100 > window.innerHeight / 100
                ? 20 - event.clientX / 150
                : 20 + event.clientY / 150
        }%`;
        imgRef.current.style.right = `${
            event.clientY / 100 > window.innerWidth / 100
                ? (-1 * event.clientY) / 100
                : event.clientY / 200
        }%`;
    }

    return (
        <Container
            fluid
            className="hc-100 d-none d-lg-block"
            onMouseMove={mouseMove}
        >
            <Row className="h-100">
                <Col className="d-flex justify-content-center align-items-center flex-column p-3">
                    <div className="p-5">
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
                            <button className="btn btn-outline-dark">
                                Info
                            </button>
                            <button className="btn btn-dark">Lets Go</button>
                        </div>
                    </div>
                </Col>
                <Col className="d-flex justify-content-center align-items-center">
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
