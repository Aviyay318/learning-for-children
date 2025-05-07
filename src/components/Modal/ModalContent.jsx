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
                        {component}
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
