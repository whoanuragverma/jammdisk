import React, { useState } from "react";
import { Container, Row, Col, Image, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
function UsbPage() {
    const [checked, setChecked] = useState(false);
    const [buttonValue, setButtonValue] = useState("Select USB");
    const [buttonClass, setButtonClass] = useState("dark");
    const [errorMsg, setError] = useState("");
    const [format, setFormat] = useState("Yes, format");
    async function showFilePicker() {
        try {
            const dirHandle = await window.showDirectoryPicker();
            window.dirHandle = dirHandle;
            setButtonClass("dark");
            setButtonValue("USB Mounted");
            setError("");
            for await (const entry of dirHandle.values()) {
                if (entry) {
                    setChecked(true);
                    break;
                }
            }
        } catch {
            setButtonClass("danger");
            setButtonValue("Try Again");
            setError(
                "Some browsers still don't support this. Try using Google Chrome or Microsoft Edge."
            );
        }
    }
    async function formatPD() {
        setFormat("Click Save Changes");
        try {
            setFormat("Formatting");
            const dirHandle = window.dirHandle;
            for await (const entry of dirHandle.values()) {
                if (entry.kind === "directory") {
                    await dirHandle.removeEntry(entry.name, {
                        recursive: true,
                    });
                } else {
                    await dirHandle.removeEntry(entry.name);
                }
            }
            setFormat("Formatted");
            setChecked(false);
        } catch {
            setFormat("Failed - Retry");
        }
    }
    return (
        <Container fluid className="d-none d-lg-block hc-100 p-5">
            <Modal show={checked} centered>
                <Modal.Header>
                    <h3>This Pendrive is not empty!</h3>
                </Modal.Header>
                <Modal.Body>
                    Do you want to format this pendrive?
                    <br />
                    <br />
                    This will remove everything from your Pendrive.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setChecked(false)}>
                        NVM
                    </Button>
                    <Button variant="dark" onClick={formatPD}>
                        {format}
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="p-5 rounded border shadow h-100">
                <Row className="p-1">
                    <Col>
                        <ProgressBar active={0} />
                    </Col>
                </Row>
                <div className="row d-flex align-items-center">
                    <Col className="d-flex flex-column" lg={6}>
                        <span className="p-3">
                            Plug in your USB
                            <br />
                            Click on Select USB below and navigate to USB in the
                            popup.
                            <br />
                            Click <b>View Files</b> in the browser's popup.
                            <br />
                        </span>
                        <span className="p-3">
                            <button
                                className={`btn btn-${buttonClass}`}
                                onClick={showFilePicker}
                                disabled={
                                    buttonValue === "USB Mounted" ? true : false
                                }
                            >
                                {buttonValue}
                            </button>
                        </span>
                    </Col>
                    <Col lg={6}>
                        <Image
                            src="https://i.giphy.com/media/K25PVRA032Ues/source.gif"
                            alt="How to not plug in USB"
                        />
                    </Col>
                </div>
                <div className="row">
                    <Col lg={12} className="d-flex justify-content-center p-3">
                        {errorMsg}
                    </Col>
                </div>
                <Row>
                    <Col lg={12} className="d-flex justify-content-center p-3">
                        <button className="btn btn-light m-2" disabled>
                            Previous
                        </button>
                        <button
                            className="btn btn-dark m-2"
                            disabled={
                                buttonValue === "USB Mounted" ? false : true
                            }
                        >
                            <Link
                                to={
                                    buttonValue === "USB Mounted"
                                        ? "/choose"
                                        : "/usb"
                                }
                            >
                                Next
                            </Link>
                        </button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default UsbPage;
