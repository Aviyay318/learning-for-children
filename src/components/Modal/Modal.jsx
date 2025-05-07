import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent.jsx';

export default function Modal({component, title,showModal, setShowModal}) {
    return (
        <>
            {showModal && createPortal(
                <ModalContent onClose={() => setShowModal(false)} title={title} component={component}/>,
                document.body
            )}
        </>
    );
}
