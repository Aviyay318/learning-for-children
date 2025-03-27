import React, { useEffect, useState } from 'react';
import { SERVER_URL } from "./Constants.js";

function SvgFromServer() {
    const [svgs, setSvgs] = useState([]);

    useEffect(() => {
        fetch(SERVER_URL + "/api/svg")
            .then(response => response.json())
            .then(data => {

                setSvgs(data);
            })
            .catch(error => {
                console.error('שגיאה בטעינת ה-SVG:', error);
            });
    }, []);

    return (
        <div>
            <h2>רשימת פריטים עם אייקונים:</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {svgs.map((item, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                        <div
                            dangerouslySetInnerHTML={{ __html: item.svg }}
                            style={{ width: '100px', height: '100px', marginBottom: '8px' }}
                        />
                        <div>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SvgFromServer;
