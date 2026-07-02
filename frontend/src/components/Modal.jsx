function Modal({
  isOpen,
  title,
  children,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 text-xl font-bold"
          >
            ✕
          </button>

        </div>

        <div>
          {children}
        </div>

      </div>

    </div>
  );
}

export default Modal;