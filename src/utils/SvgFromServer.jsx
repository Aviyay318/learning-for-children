import React, { useEffect, useState } from 'react';
import {SERVER_URL} from "./Constants.js";

function SvgFromServer() {
    const [svg, setSvg] = useState(null);

    useEffect(() => {
        fetch(SERVER_URL+"/api/svg") // החליפי ל-URL של השרת שלך
            .then(response => response.json())
            .then(data => {
                setSvg(data.svg);
            })
            .catch(error => {
                console.error('שגיאה בטעינת ה-SVG:', error);
            });
    }, []);

    return (
        <div>
            <h2>SVG מהשרת:</h2>
            <div
                dangerouslySetInnerHTML={{ __html: svg }}
                style={{ width: '100px', height: '100px', border: '1px solid #ccc' }}
            />
        </div>
    );
}

export default SvgFromServer;
