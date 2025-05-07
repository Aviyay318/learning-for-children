import "./Modal.css"
import ModalTitle from "/src/assets/images/Modal/modal_title.png";
import ModalBoard from "/src/assets/images/Modal/modal_board.png";
import ModalButton from "/src/assets/images/Modal/modal_button.png";
import BasicHelper from "../Math/BasicMath/BasicHelper/BasicHelper.jsx";

export default function ModalContent({ component, title,onClose }) {

    return (
        <div className="modal">
            <div className="modal-content-container">
                    <div className={"modal-title-container"}>
                        <div className={"modal-title flex"}>
                            <img className={"modal-title-image"} src={ModalTitle} alt="Modal title" />
                            <label className={"modal-title-label"}>{title}</label>
                        </div>
                    </div>
                    <div className={"modal-content flex"}>
                        <img className={"modal-board"} src={ModalBoard} alt="Modal board" />
                        {/*{component}*/}
                        <label>
                            🧮 הוראות שימוש במערכת הלמידה:

                            🎯 ניקוד:

                            תשובה נכונה רגילה: %d נקודות.
                            תשובה נכונה ללא שימוש ברמז בשאלה מילולית: %d נקודות.
                            תשובה נכונה מהירה (פחות מ-2 דקות בשאלות טבלה): %d נקודות.
                            שימוש ברמז: %d נקודות בלבד.
                            תשובה שגויה: הפחתה של %d נקודות.

                            ⬆️ קידום רמה:

                            הצלחה של מעל %d%% מהשאלות + רצף של %d תשובות נכונות + %d תשובות מהירות – קידום מהיר.
                            הצלחה רגילה (%d%% ומעלה) – קידום רגיל.
                            הצלחה חלשה (פחות מ-%d%%) + רצף טעויות – ירידה ברמה.

                            🧠 טיפים:

                            נסה לענות מהר (פחות מ-%d שניות) כדי לקבל בונוס!
                            שימוש ברמז מקטין ניקוד – השתמש בו רק כשצריך.
                            טעות זה חלק מהלמידה! המערכת תתאים את הרמה עבורך.

                            בהצלחה! 💪
                        </label>
                        <div className={"modal-button-container"}>
                            <div className={"modal-button flex"}>
                                <img  src={ModalButton} alt="Modal button" />
                                <button onClick={onClose}>אוקיי!</button>
                            </div>

                        </div>
                    </div>


                </div>
        </div>
    );
}
