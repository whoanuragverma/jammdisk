import React from "react";
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ProgressBar from "./ProgressBar";
import Cards from "./Cards";
function ChoosePage() {
    const dirHandle = window.dirHandle;

    if (!dirHandle) {
        return <Redirect to="/usb" />;
    }
    return (
        <Container fluid className="p-0">
            <div className="p-5  h-100">
                <Row className="p-1">
                    <Col>
                        <ProgressBar active={1} />
                    </Col>
                </Row>
                <Row className="d-flex flex-column pl-3">
                    <h3>Playlists you might like</h3>
                    <small>You can skip if you don't like these</small>
                </Row>
                <Cards />
                <Row>
                    <Col lg={12} className="d-flex justify-content-center p-3">
                        <Link to="/usb">
                            <button className="btn btn-light m-2">
                                Previous
                            </button>
                        </Link>
                        <Link to="/search">
                            <button className="btn btn-dark m-2">Next</button>
                        </Link>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default ChoosePage;
