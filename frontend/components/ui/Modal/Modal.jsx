import React, { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

const Modal = ({ width, height, onClose, title, children, open }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!open) {
    return;
  }
  return (
    <div className="h-dvh flex-center fixed inset-0 top-0 w-full z-100 bg-black/60">
      <div
        className="bg-surface-2 border border-border-2 rounded-md"
        style={{ width: width, minHeight: height }}
        ref={modalRef}
      >
        <div className="w-full border-b border-border-2 p-4 flex-between text-text-2">
          <div className="text-xl text-white">{title}</div>
          <button onClick={onClose}>
            <IoClose className="text-2xl" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
