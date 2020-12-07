import React, { useEffect, useRef } from "react";

function ProgressBar(props) {
    const divRef = useRef(0);
    useEffect(() => {
        for (let i = 0; i < divRef.current.children.length; i++) {
            i === props.active
                ? divRef.current.children[i].classList.add("active")
                : divRef.current.children[i].classList.add("inactive");
        }
    }, []);
    return (
        <div className="d-flex justify-content-center" ref={divRef}>
            <span className="dotted m-2"></span>
            <span className="dotted m-2"></span>
            <span className="dotted m-2"></span>
            <span className="dotted m-2"></span>
        </div>
    );
}

export default ProgressBar;
