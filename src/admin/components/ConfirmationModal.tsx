
interface ConfirmationModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

function ConfirmationModal({
    isOpen,
    title = 'Confirm',
    message = 'Are you sure?',
    onConfirm,
    onCancel,
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-md">
          {title && <h2 className="text-2xl font-bold mb-4 text-black text-center">{title}</h2>}
          {message && <p className="mb-4 text-black text-base">{message}</p>}
          <div className="flex justify-end space-x-4">
            <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
}

export default ConfirmationModal;