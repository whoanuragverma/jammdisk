import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-bootstrap";
import MusicSvg from "../assets/music.svg";
import list from "./listMusic";
function Cards() {
    const itemsRef = useRef([]);
    const [total, setTotal] = useState(window.__total_selected__ || 0);
    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, list.length);
    }, [list.length]);
    if (!window.__selected__) {
        window.__selected__ = [];
        window.__total_selected__ = 0;
    }
    return (
        <React.Fragment>
            <div className="cards__total border p-2 rounded shadow">
                <Image src={MusicSvg} width={24} />
                <span className="ml-2 badge badge-secondary">
                    {total} songs
                </span>
            </div>
            <div className="cards__grid pt-3">
                {list.map((item, i) => {
                    return (
                        <div
                            style={{ position: "relative", width: 140 }}
                            key={i}
                            ref={(el) => (itemsRef.current[i] = el)}
                            onClick={() => {
                                toggleSelect(i, item.total);
                            }}
                            data-token={item.token}
                            onMouseOver={() =>
                                (itemsRef.current[
                                    i
                                ].children[1].style.opacity = 1)
                            }
                            className={isSelected(item.token)}
                            onMouseLeave={() =>
                                (itemsRef.current[
                                    i
                                ].children[1].style.opacity = 0)
                            }
                        >
                            <div>
                                <Image
                                    className="cards__image"
                                    src={item.image}
                                />
                            </div>
                            <div className="cards__overlay">
                                <span className="h5">{item.title}</span>
                                <span>{item.total} songs</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </React.Fragment>
    );

    function toggleSelect(i, totalS) {
        itemsRef.current[i].classList.toggle("toggle-select");
        const token = itemsRef.current[i].getAttribute("data-token");
        if (window.__selected__.indexOf(token) > -1) {
            window.__selected__.splice(window.__selected__.indexOf(token), 1);
            setTotal(total - totalS);
            window.__total_selected__ -= totalS;
        } else {
            window.__selected__.push(token);
            setTotal(total + totalS);
            window.__total_selected__ += totalS;
        }
    }

    function isSelected(token) {
        return window.__selected__.indexOf(token) === -1 ? "" : "toggle-select";
    }
}

export default Cards;
