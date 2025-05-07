import { useState } from 'react';
import { createPortal } from 'react-dom';
import ModalContent from './ModalContent.jsx';

export default function Modal({ component, title, showModal, setShowModal }) {
    if (!showModal) return null;

    return createPortal(
        <ModalContent
            title={title}
            component={component}
            onClose={() => setShowModal(false)}   // properly hide
        />,
        document.body
    );
}
