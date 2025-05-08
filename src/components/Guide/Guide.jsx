import useApi from "../../hooks/apiHooks/useApi.js";
import { useEffect } from "react";
import "./Guide.css";

export default function Guide({ url, payload }) {
    const { data, error, sendRequest } = useApi(url, "GET", { minDelay: 0 });

    useEffect(() => {
        sendRequest(payload || {});
    }, []);

    if (error) {
        return <div className="guide-error">שגיאה בטעינת ההוראות</div>;
    }

    if (!data) {
        return <div className="guide-loading">טוען הוראות...</div>;
    }

    const isGeneralGuide = Array.isArray(data.scoring);

    return (
        <div className={"guide-box"}>
            {(!isGeneralGuide && data.title) && <label className="guide-title">📘 {data.title}</label>}
            <div className="guide-container" dir="rtl">

                {isGeneralGuide ? (
                    <>
                        {renderSection("🎯 ניקוד", data.scoring)}
                        {renderSection("⬆️ קידום רמה", data.leveling)}
                        {renderSection("✋ עזרי פתרון", data.helpers)}
                        {renderSection("🧠 טיפים", data.tips)}
                    </>
                ) : (
                    <>
                        <div className={"instruction"} id={"center-this"}>
                            {data.description && <p><b>תיאור:</b> {data.description}</p>}
                            {data.tip && <p><b>טיפ:</b> {data.tip}</p>}
                            {data.explanation && <p><b>הסבר נוסף:</b><br/> {data.explanation}</p>}
                            {data.example && (
                                <div>
                                    <b>דוגמה:</b><br/>
                                    <div dangerouslySetInnerHTML={{__html: data.example}}/>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>


)
    ;
}

function renderSection(title, items) {
    return (
        <div className="guide-section">
            <h3 className="guide-subtitle">{title}</h3>
            <ul className="guide-list">
                {items.map((line, idx) => (
                    <li key={idx}>• {line}</li>
                ))}
            </ul>
        </div>
    );
}
