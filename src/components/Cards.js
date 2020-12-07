import React, { useEffect, useRef } from "react";
import { Image } from "react-bootstrap";
function Cards() {
    const itemsRef = useRef([]);
    const list = [
        {
            image:
                "https://cdn-jammin.herokuapp.com/c/editorial/wt15-49_20201127131204.jpg?bch=1606484528",
            title: "Weekly Top Songs",
            total: 30,
            token: "playlist/8MT-LQlP35c_",
        },
        {
            image:
                "https://cdn-jammin.herokuapp.com/c/editorial/charts_TrendingToday_182154_20201124014246.jpg?bch=1502438867",
            title: "Trending Today",
            total: 50,
            token: "playlist/I3kvhipIy73uCJW60TJk1Q__",
        },
        {
            image:
                "https://cdn-jammin.herokuapp.com/c/editorial/charts_HindiChartbusters_108260_20200903065830.jpg?bch=1420542755",
            title: "Hindi Chartbusters",
            total: 118,
            token: "playlist/u-75xwHI4ks_",
        },
        {
            image:
                "https://cdn-jammin.herokuapp.com/c/editorial/wt15-49_20201127131204.jpg?bch=1606484528",
            title: "Weekly Top Songs",
            total: 30,
            token: "playlist/8MT-LQlP35c_",
        },
        {
            image:
                "https://cdn-jammin.herokuapp.com/c/editorial/charts_TrendingToday_182154_20201124014246.jpg?bch=1502438867",
            title: "Trending Today",
            total: 50,
            token: "playlist/I3kvhipIy73uCJW60TJk1Q__",
        },
        {
            image:
                "https://cdn-jammin.herokuapp.com/c/editorial/charts_HindiChartbusters_108260_20200903065830.jpg?bch=1420542755",
            title: "Hindi Chartbusters",
            total: 118,
            token: "playlist/u-75xwHI4ks_",
        },
        {
            image:
                "https://cdn-jammin.herokuapp.com/c/editorial/wt15-49_20201127131204.jpg?bch=1606484528",
            title: "Weekly Top Songs",
            total: 30,
            token: "playlist/8MT-LQlP35c_",
        },
        {
            image:
                "https://cdn-jammin.herokuapp.com/c/editorial/charts_TrendingToday_182154_20201124014246.jpg?bch=1502438867",
            title: "Trending Today",
            total: 50,
            token: "playlist/I3kvhipIy73uCJW60TJk1Q__",
        },
        {
            image:
                "https://cdn-jammin.herokuapp.com/c/editorial/charts_HindiChartbusters_108260_20200903065830.jpg?bch=1420542755",
            title: "Hindi Chartbusters",
            total: 118,
            token: "playlist/u-75xwHI4ks_",
        },
    ];
    useEffect(() => {
        itemsRef.current = itemsRef.current.slice(0, list.length);
    }, [list.length]);
    if (!window.__selected) {
        window.__selected = [];
    }
    return (
        <div className="cards__grid pt-3">
            {list.map((item, i) => {
                return (
                    <div
                        style={{ position: "relative", width: 140 }}
                        key={i}
                        ref={(el) => (itemsRef.current[i] = el)}
                        onClick={() => {
                            toggleSelect(i);
                        }}
                        data-token={item.token}
                        onMouseOver={() =>
                            (itemsRef.current[i].children[1].style.opacity = 1)
                        }
                        className={isSelected(item.token)}
                        onMouseLeave={() =>
                            (itemsRef.current[i].children[1].style.opacity = 0)
                        }
                    >
                        <div>
                            <Image className="cards__image" src={item.image} />
                        </div>
                        <div className="cards__overlay">
                            <span className="h5">{item.title}</span>
                            <span>{item.total} songs</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    function toggleSelect(i) {
        itemsRef.current[i].classList.toggle("toggle-select");
        const token = itemsRef.current[i].getAttribute("data-token");
        if (window.__selected.indexOf(token) > -1) {
            window.__selected.splice(window.__selected.indexOf(token), 1);
        } else {
            window.__selected.push(token);
        }
    }

    function isSelected(token) {
        return window.__selected.indexOf(token) === -1 ? "" : "toggle-select";
    }
}

export default Cards;
