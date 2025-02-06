import { useState, useEffect } from "react";
import axios from 'axios';

const RectangleResizer = () => {
    const [rect, setRect] = useState({ x: 10, y: 10, width: 20, height: 20 });
    const [isResizing, setIsResizing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        fetch("https://localhost:7139/SVGDimensions")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.width >= 20 && data.height >= 20) { // Minimal size set to 20
                    setRect({ x: 10, y: 10, width: data.width, height: data.height });
                } else {
                    console.warn("Size too small, keeping minimal size");
                }
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const handleMouseDown = (e) => {
        setIsResizing(true);
        setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (!isResizing) return;
        const deltaX = e.clientX - startPos.x;
        const deltaY = e.clientY - startPos.y;
        setRect((prevRect) => ({
            ...prevRect,
            width: Math.max(20, prevRect.width + deltaX),
            height: Math.max(20, prevRect.height + deltaY)
        }));
        setStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsResizing(false);

        console.log(`Updated dimensions: width=${rect.width}, height=${rect.height}`);
        sendData(rect.height, rect.width);
    };

    const sendData = async (height, width) => {
        const url = new URL('https://localhost:7139/SVGDimensions');

        const params = new URLSearchParams();
        params.append('height', height);
        params.append('width', width);

        url.search = params.toString();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to save data.');
            }

            const result = await response.json();
            console.log(result);
            if (result.error) {
                alert(result.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const perimeter = 2 * (rect.width + rect.height);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh"
            }}
            onMouseMove={handleMouseMove}
        >
            <div style={{ fontSize: "18px" }}>Perimeter: {perimeter}</div>
                <svg width="600" height="600" style={{ border: "1px solid black" }}>
                    <rect
                        x={rect.x}
                        y={rect.y}
                        width={rect.width}
                        height={rect.height}
                        fill="blue"
                        stroke="black"
                        strokeWidth="2"
                    />
                    <circle
                        cx={rect.x + rect.width}
                        cy={rect.y + rect.height}
                        r="8"
                        fill="red"
                        style={{ cursor: "nwse-resize" }}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                    />
                    </svg>
            <div style={{ fontSize: "18px" }}>Dimensions: {rect.width} x {rect.height}</div>
        </div>
    );
};

export default RectangleResizer;
