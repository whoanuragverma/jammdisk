import React, { useState, useRef, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button, FormControl, Image, InputGroup } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import ProgressBar from "./ProgressBar";
import MusicSvg from "../assets/music.svg";
import SearchSvg from "../assets/search.svg";
function Search() {
    const dirHandle = window.__dirHandle__;
    const [total, setTotal] = useState(window.__total_selected__ || 0);
    const [active, setActive] = useState("Album");
    const [currentPage, setCurrentPage] = useState(1);
    const [JSONResponse, setJSONResponse] = useState();
    const itemsRef = useRef([]);
    if (!window.__selected__) {
        window.__selected__ = [];
        window.__total_selected__ = 0;
    }
    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, 1500);
    }, []);
    const inputRef = useRef(null);
    if (!dirHandle) {
        return <Redirect to="/usb" />;
    }
    return (
        <React.Fragment>
            <div className="cards__total border p-2 rounded shadow">
                <Image src={MusicSvg} width={24} />
                <span className="ml-2 badge badge-secondary">
                    {total} songs
                </span>
            </div>
            <Container fluid className="p-0">
                <div className="p-5  h-100">
                    <Row className="p-1">
                        <Col>
                            <ProgressBar active={2} />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3}></Col>
                        <Col>
                            <InputGroup>
                                <FormControl
                                    placeholder="Search for music.."
                                    aria-label="Search for music"
                                    aria-describedby="Search Bar"
                                    ref={inputRef}
                                    onKeyDown={search}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="dark"
                                        style={{
                                            borderTopRightRadius: 5,
                                            borderBottomRightRadius: 5,
                                        }}
                                        onClick={() => {
                                            search({ key: "Enter" });
                                        }}
                                    >
                                        <Image src={SearchSvg} width={18} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                        <Col lg={3}></Col>
                    </Row>
                    <Row className="m-3 p-2 d-flex justify-content-center">
                        {/* <Button
                            variant={active === "Anything" ? "dark" : "light"}
                            className="m-2"
                            onClick={() => {
                                setActive("Anything");
                            }}
                        >
                            Anything
                        </Button> */}
                        <Button
                            className="m-2"
                            variant={active === "Album" ? "dark" : "light"}
                            onClick={() => {
                                setActive("Album");
                            }}
                        >
                            Album
                        </Button>
                        <Button
                            variant={active === "Playlist" ? "dark" : "light"}
                            className="m-2"
                            onClick={() => {
                                setActive("Playlist");
                            }}
                        >
                            Playlist
                        </Button>
                        <Button
                            variant={active === "Song" ? "dark" : "light"}
                            className="m-2"
                            onClick={() => {
                                setActive("Song");
                            }}
                        >
                            Song
                        </Button>
                    </Row>
                    <>{renderResults()}</>
                    {JSONResponse &&
                        JSONResponse["current"] <= JSONResponse["total"] && (
                            <Row>
                                <Col className="d-flex justify-content-center p-3">
                                    <button
                                        className="btn btn-dark"
                                        onClick={fetchMore}
                                    >
                                        More
                                    </button>
                                </Col>
                            </Row>
                        )}
                    <Row>
                        <Col
                            lg={12}
                            className="d-flex justify-content-center p-3"
                        >
                            <Link to="/choose">
                                <button className="btn btn-light m-2">
                                    Previous
                                </button>
                            </Link>
                            <Link
                                to={
                                    window.__selected__.length === 0
                                        ? "search"
                                        : "process"
                                }
                            >
                                <button
                                    className="btn btn-dark m-2"
                                    disabled={!window.__selected__.length}
                                >
                                    Next
                                </button>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Container>
        </React.Fragment>
    );
    function fetchMore() {
        let base = `https://mumbai.jammin.apis.anuragverma.codes/${active.toLowerCase()}?query=${
            inputRef.current.value
        }&p=${currentPage + 1}`;
        fetch(base)
            .then((response) => response.json())
            .then((response) => {
                setCurrentPage(currentPage + 1);
                let oldResponse = JSONResponse;
                oldResponse["current"] = response["current"];
                oldResponse["results"].push(...response["results"]);
                setJSONResponse(oldResponse);
            });
    }
    function renderResults() {
        if (JSONResponse && JSONResponse["total"] === 0)
            return <div>Nothing Found</div>;
        if (JSONResponse)
            return (
                <div className="cards__grid pt-3">
                    {JSONResponse["results"].map((item, i) => {
                        return (
                            <div
                                style={{ position: "relative", width: 140 }}
                                key={i}
                                ref={(el) => (itemsRef.current[i] = el)}
                                onMouseOver={() =>
                                    (itemsRef.current[
                                        i
                                    ].children[1].style.opacity = 1)
                                }
                                onMouseLeave={() =>
                                    (itemsRef.current[
                                        i
                                    ].children[1].style.opacity = 0)
                                }
                                className={isSelected(
                                    item.url ||
                                        `song/` +
                                            btoa(
                                                `${item["media"]["low"]}~${item["image"]["500x500"]}~${item["title"]}`
                                            )
                                )}
                                onClick={() => toggleSelect(i)}
                                data-token={
                                    item.url ||
                                    `song/` +
                                        btoa(
                                            `${item["media"]["low"]}~${item["image"]["500x500"]}~${item["title"]}`
                                        )
                                }
                            >
                                <div>
                                    <Image
                                        src={processCDN(
                                            item["image"]["500x500"]
                                        )}
                                        className="cards__image"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="cards__overlay">
                                    <span className="h6">
                                        {item.title.substring(
                                            0,
                                            item.title.indexOf("(") > -1
                                                ? item.title.indexOf("(")
                                                : 20
                                        )}
                                    </span>
                                    <span>{item.authors || item.album}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
    }
    function isSelected(token) {
        return window.__selected__.indexOf(token) === -1 ? "" : "toggle-select";
    }
    function processCDN(url) {
        let p = url.split("/")[0];
        let q = url.split("/").slice(1);
        return `https://${p}.saavncdn.com/${q.join("/")}`;
    }
    function toggleSelect(i) {
        itemsRef.current[i].classList.toggle("toggle-select");
        const token = itemsRef.current[i].getAttribute("data-token");
        let base = `https://mumbai.jammin.apis.anuragverma.codes/search?token=${token}`;
        if (window.__selected__.indexOf(token) > -1) {
            window.__selected__.splice(window.__selected__.indexOf(token), 1);

            if (token.indexOf("song") === 0) {
                setTotal(total - 1);
                window.__total_selected__ -= 1;
            } else {
                fetch(base)
                    .then((response) => response.json())
                    .then((response) => {
                        setTotal(total - parseInt(response["total"]));
                        window.__total_selected__ -= parseInt(
                            response["total"]
                        );
                    });
                // Decrement total by fecthing
            }
        } else {
            if (token.indexOf("song") === 0) {
                setTotal(total + 1);
                window.__total_selected__ += 1;
            } else {
                // Increment total by fecthing
                fetch(base)
                    .then((response) => response.json())
                    .then((response) => {
                        setTotal(total + parseInt(response["total"]));
                        window.__total_selected__ += parseInt(
                            response["total"]
                        );
                    });
            }
            window.__selected__.push(token);
        }
    }
    function search(e) {
        let base = "https://mumbai.jammin.apis.anuragverma.codes/";
        if (e.key === "Enter") {
            setJSONResponse("");
            setCurrentPage(1);
            switch (active) {
                case "Album":
                    base += "album";
                    break;
                case "Playlist":
                    base += "playlist";
                    break;
                case "Song":
                    base += "song";
                    break;
                default:
                    base += "autocomplete";
            }
            base += `?query=${inputRef.current.value}`;
            fetch(base)
                .then((response) => response.json())
                .then((response) => setJSONResponse(response));
        }
    }
}

export default Search;
