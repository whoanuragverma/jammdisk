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
    const [JSONResponse, setJSONResponse] = useState();
    const itemsRef = useRef([]);
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
                    <div className="cards__grid pt-3">{renderResults()}</div>
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
                            <Link to="/search">
                                <button className="btn btn-dark m-2">
                                    Next
                                </button>
                            </Link>
                        </Col>
                    </Row>
                </div>
            </Container>
        </React.Fragment>
    );

    function renderResults() {
        if (JSONResponse)
            return JSONResponse["results"].map((item, i) => {
                return (
                    <div
                        style={{ position: "relative", width: 140 }}
                        key={i}
                        ref={(el) => (itemsRef.current[i] = el)}
                        onMouseOver={() =>
                            (itemsRef.current[i].children[1].style.opacity = 1)
                        }
                        onMouseLeave={() =>
                            (itemsRef.current[i].children[1].style.opacity = 0)
                        }
                    >
                        <div>
                            <Image
                                src={`https://cdn-jammin.herokuapp.com/${item["image"]["500x500"]}`}
                                className="cards__image"
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
            });
    }

    function search(e) {
        let base = "https://mumbai.jammin.apis.anuragverma.codes/";
        if (e.key === "Enter") {
            setJSONResponse("");
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
            }
            base += `?query=${inputRef.current.value}`;
            fetch(base)
                .then((response) => response.json())
                .then((response) => setJSONResponse(response));
        }
    }
}

export default Search;
