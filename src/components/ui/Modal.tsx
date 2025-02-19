import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-xl shadow-2xl max-w-[90vw] max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-10 w-8 h-8 flex items-center justify-center bg-white/80 rounded-full"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}