import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { Redirect } from "react-router-dom";

function DownLoad() {
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

    const download = async (el, idx) => {
        const newFile = await window.__dirHandle__.getFileHandle(
                    `${el.title}.m4a`,
                    { create: true }
                );
        return await fetch(`https://cdn-jammin.herokuapp.com/${el.media}`)
            .then((response) => response.blob())
            .then(async (response) => {
                const newFileW = await newFile.createWritable();
                await newFileW.write(response);
                await newFileW.close();
                document.querySelector(
                    "#bnr"
                ).src = `https://cdn-jammin.herokuapp.com/${el["image"]}`;
                document.querySelector("#tt").innerHTML = el["title"];
                document.querySelector("#au").innerHTML = el["author"];
                document.querySelector("#al").innerHTML = el["album"];
                document.querySelector("#idx").innerHTML = idx;
            })
            .then(() => console.log("Downloaded one song."));
}
    function dd() {
        queueAsyncFns(
            window.__unrolled__.map((el, idx) => () => download(el, idx))
        );
    }
    // {
    //
    //     await fetch(`https://cdn-jammin.herokuapp.com/${el.media}`)
    //         .then((response) => response.blob())
    //         .then(async (response) => {
    //             const newFileW = await newFile.createWritable();
    //             await newFileW.write(response);
    //             await newFileW.close();
    //         });
    // });
    // }
    if (!window.__unrolled__) return <Redirect to="/usb" />;
    return (
        <>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    color: "#000000",
                    zIndex: 99,
                }}
                id="bnr2"
                className="d-flex justify-content-center align-items-center flex-column"
                onDoubleClick={() => {
                    document.querySelector("#main").style.filter = "";
                    document.querySelector("#bnr2").style.top = "-99999999px";
                    dd();
                }}
            >
                <h3>Double Click anywhere to start the download.</h3>
                <small>Make sure to allow any pending permissions.</small>
            </div>
            <Container
                className="d-flex justify-content-center align-items-center container flex-column"
                style={{ filter: "blur(12px)" }}
                id="main"
            >
                <Row className="mt-5 pt-5 m-4 p-2">
                    <Col>
                        <h2>Downloading your favourite songs</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Image
                            src={`https://cdn-jammin.herokuapp.com/${window.__unrolled__[0]["image"]}`}
                            width="300px"
                            id="bnr"
                            style={{
                                boxShadow:
                                    "10px 11px 12px 3px rgba(0,0,0,.175)",
                            }}
                        />
                    </Col>
                    <Col
                        className="col d-flex flex-column justify-content-center"
                        style={{ width: "50vw" }}
                    >
                        <h5 id="tt">{window.__unrolled__[0]["title"]}</h5>
                        <h6 id="al">{window.__unrolled__[0]["album"]}</h6>
                        <h6 id="au">{window.__unrolled__[0]["author"]}</h6>
                        <small>
                            Downloaded <span id="idx">0</span> out of{" "}
                            {window.__unrolled__.length}
                        </small>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default DownLoad;
