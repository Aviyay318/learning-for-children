import React from "react";
import Modal from "../../Modal/Modal.jsx";
import Guide from "../../Guide/Guide.jsx";

export default function ModalsManager({ hint, canvas, showHint, setShowHint, showCanvas, setShowCanvas, showGuide, setShowGuide, islandId }) {
  return (
    <>
      <Modal title="רמז" component={hint} showModal={showHint} setShowModal={setShowHint} />
      <Modal title="לוח" component={canvas} showModal={showCanvas} setShowModal={setShowCanvas} />
      <Modal title="הוראות" component={<Guide url="/api/get-guide" payload={{ islandId }} />} showModal={showGuide} setShowModal={setShowGuide} />
    </>
  );
}
