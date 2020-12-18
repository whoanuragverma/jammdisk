import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
function ProcessResults() {
    const dirHandle = window.__dirHandle__;
    if (!window.__selected__.length || !dirHandle) {
        return <Redirect to="/search" />;
    }
    return (
        <Container fluid className="p-0">
            <div className="p-5  h-100">
                <Row className="p-1">
                    <Col>
                        <ProgressBar active={3} />
                    </Col>
                </Row>
                <Row>
                    <Col lg={12} className="d-flex justify-content-center p-3">
                        <Link to="/search">
                            <button className="btn btn-light m-2">
                                Previous
                            </button>
                        </Link>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default ProcessResults;
