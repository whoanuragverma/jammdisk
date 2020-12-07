import React from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import HomePage from "./HomePage";

function InfoPage() {
    const history = useHistory();
    function hide() {
        return history.push("/");
    }

    return (
        <React.Fragment>
            <HomePage />
            <Modal show centered onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title>Umm... but how to use this?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ol>
                        <li>Plug in your usb. 💾</li>
                        <li>
                            Click let's go and select your usb via file picker.
                        </li>
                        <li>Choose your favourite songs. 🎶🎵</li>
                        <li>We take care of the rest. 💃🏻</li>
                    </ol>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
}

export default InfoPage;
