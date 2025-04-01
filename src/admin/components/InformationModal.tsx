interface InformationModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    onClose: () => void;
}

const InformationModal: React.FC<InformationModalProps> = ({ isOpen, title, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md">
                {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
                {message && <p className="mb-4">{message}</p>}
                <div className="flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-blue-500 text-white rounded">
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InformationModal;