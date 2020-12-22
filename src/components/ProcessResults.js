import React, { useState, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
function ProcessResults() {
    const dirHandle = window.__dirHandle__;
    const [quality, setQuality] = useState(0);
    const [choose, setChoose] = useState(0);
    let currentCounter = 0;
    let listOfSongs = [];
    const pb = useRef();
    if (!window.__selected__ || !window.__selected__.length || !dirHandle) {
        return <Redirect to="/search" />;
    }
    async function unWrap() {
        await new Promise((r) => setTimeout(r, 2000));
        for (let i = 0; i < window.__selected__.length; i++) {
            console.log(currentCounter);
            if (window.__selected__[i].indexOf("song") === 0) {
                let song = atob(window.__selected__[i].split("song/")[1]);
                song = song.split("~");
                listOfSongs.push({
                    image: song[1],
                    media: song[0],
                    album: song[3],
                    author: song[4],
                    title: song[2],
                });
                currentCounter += 1;
                pb.current.style.width = `${
                    (currentCounter * 100) / window.__total_selected__
                }%`;
                pb.current.innerHTML = `${
                    (
                        (currentCounter * 100) /
                        window.__total_selected__
                    ).toPrecision(3) > 100
                        ? 100
                        : (
                              (currentCounter * 100) /
                              window.__total_selected__
                          ).toPrecision(3)
                }
                %`;
            } else {
                fetchv2(window.__selected__[i]);
            }
        }
    }
    let timer = setInterval(() => {
        if (listOfSongs.length >= window.__total_selected__) {
            clearInterval(timer);
            window.__unrolled__ = listOfSongs;
            window.location.href = "/#/download";
        }
    }, 250);
    async function fetchv2(token) {
        let page = 1,
            response;
        do {
            let base = `https://mumbai.jammin.apis.anuragverma.codes/search?token=${token}&p=${page}`;
            page = page + 1;
            response = await fetch(base)
                .then((response) => response.json())
                .then((response) => response);
            response["results"].forEach((element) => {
                currentCounter += 1;
                pb.current.style.width = `${
                    (currentCounter * 100) / window.__total_selected__
                }%`;
                pb.current.innerHTML = `${
                    (
                        (currentCounter * 100) /
                        window.__total_selected__
                    ).toPrecision(3) > 100
                        ? 100
                        : (
                              (currentCounter * 100) /
                              window.__total_selected__
                          ).toPrecision(3)
                }
                %`;
                listOfSongs.push({
                    image: element["image"]["500x500"],
                    media: element["media"]["low"],
                    title: element["title"],
                    album: element["album"],
                    author: element["authors"],
                });
            });
            if (response["current"] > parseInt(response["total"])) break;
        } while (true);
    }
    return (
        <Container fluid className="p-0">
            <div className="p-5  h-100">
                <Row className="p-1">
                    <Col>
                        <ProgressBar active={3} />
                    </Col>
                </Row>
                {choose === 0 && (
                    <>
                        <Row>
                            <Col className="d-flex justify-content-center flex-column align-items-center mt-5 pt-4 mb-5">
                                <h3>Choose download quality</h3>
                                <div>
                                    <Button
                                        variant={
                                            quality === 0 ? "dark" : "light"
                                        }
                                        className="m-2"
                                        onClick={() => setQuality(0)}
                                    >
                                        High
                                    </Button>
                                    <Button
                                        variant={
                                            quality === 1 ? "dark" : "light"
                                        }
                                        className="m-2"
                                        onClick={() => setQuality(1)}
                                    >
                                        Medium
                                    </Button>
                                    <Button
                                        variant={
                                            quality === 2 ? "dark" : "light"
                                        }
                                        className="m-2"
                                        onClick={() => setQuality(2)}
                                    >
                                        Low
                                    </Button>
                                </div>
                                <Button
                                    variant="dark"
                                    className="m-5"
                                    onClick={() => {
                                        setChoose(1);
                                        unWrap();
                                    }}
                                >
                                    Done
                                </Button>
                                <small>
                                    This selection can't be undone. Do not
                                    unplug the USB or refresh this page post
                                    selecting quality.
                                </small>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                lg={12}
                                className="d-flex justify-content-center p-3"
                            >
                                <Link to="/search">
                                    <button className="btn btn-light m-2">
                                        Previous
                                    </button>
                                </Link>
                            </Col>
                        </Row>
                    </>
                )}

                {choose === 1 && (
                    <>
                        <Row className="mt-5 pt-5">
                            <Col className="d-flex justify-content-center flex-column align-items-center mt-2">
                                <h3>Initializing</h3>
                            </Col>
                        </Row>
                        <Row className="m-3 mt-5 pt-5">
                            <Col lg={3}></Col>
                            <Col>
                                <div class="progress">
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        ref={pb}
                                        style={{
                                            width: `${
                                                (currentCounter * 100) /
                                                window.__total_selected__
                                            }%`,
                                        }}
                                    >
                                        {`${
                                            (
                                                (currentCounter * 100) /
                                                window.__total_selected__
                                            ).toPrecision(3) > 100
                                                ? 100
                                                : (
                                                      (currentCounter * 100) /
                                                      window.__total_selected__
                                                  ).toPrecision(3)
                                        }
                                        %`}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={3}></Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center flex-column align-items-center mt-2">
                                <small>
                                    Do not unplug the USB or refresh this page.
                                </small>
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </Container>
    );
}

export default ProcessResults;
