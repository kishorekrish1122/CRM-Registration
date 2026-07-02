function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex justify-center items-center gap-3 mt-5">

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;