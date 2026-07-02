function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <div className="mb-5">

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>
  );
}

export default SearchBar;