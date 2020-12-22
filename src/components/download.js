import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

function DownLoad() {
    const [current, setCurrent] = useState(0);
    const [currentDownload, setCurrentDownload] = useState({
        image: "",
        media: "",
        author: "",
        album: "",
    });
    async function queueAsyncFns(fns) {
        const values = [];

        await fns.reduce((previous, current, index, array) => {
            const thenable = index === 1 ? previous() : previous;
            return thenable.then((value) => {
                values.push(value);
                return index === array.length - 1
                    ? current().then((value) => values.push(value))
                    : current();
            });
        });

        return values;
    }
    function dd() {
        window.__unrolled__.map(async (el) => {
            const newFile = await window.__dirHandle__.getFileHandle(
                `${el.title}.mp3`,
                { create: true }
            );
            await fetch(`https://cdn-jammin.herokuapp.com/${el.media}`)
                .then((response) => response.blob())
                .then(async (response) => {
                    const newFileW = await newFile.createWritable();
                    await newFileW.write(response);
                    await newFileW.close();
                    setCurrentDownload(el);
                    setCurrent(current + 1);
                });
        });
    }
    if (!window.__unrolled__) return <Redirect to="/usb" />;
    return (
        <Container className="d-flex justify-content-center align-items-center container flex-column">
            <Row className="mt-5 pt-5 m-4 p-2">
                <Col>
                    <h2>Downloading your favourite songs</h2>
                </Col>
                <Button
                    onClick={() => {
                        alert("hi");
                        dd();
                    }}
                >
                    Start
                </Button>
            </Row>
            <Row>
                <Col className="mr-5">
                    <Image
                        src={`https://cdn-jammin.herokuapp.com/${currentDownload["image"]}`}
                        width="300px"
                    />
                </Col>
                <Col className="ml-5 col d-flex flex-column justify-content-center">
                    <h5>{currentDownload["title"]}</h5>
                    <h6>{currentDownload["album"]}</h6>
                    <h6>{currentDownload["author"]}</h6>
                    <small>
                        Downloading {current + 1} out of{" "}
                        {window.__unrolled__.length}
                    </small>
                </Col>
            </Row>
        </Container>
    );
}

export default DownLoad;
