function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[300px]">

      <div className="flex flex-col items-center gap-4">

        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-gray-600 font-medium">
          Loading...
        </p>

      </div>

    </div>
  );
}

export default Loader;