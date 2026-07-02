function Table({
  columns,
  data,
  renderActions,
}) {
  return (
    <div className="overflow-x-auto">

      <table className="w-full border border-gray-300">

        <thead className="bg-gray-200">

          <tr>

            {columns.map((column) => (
              <th
                key={column.key}
                className="border p-3 text-left"
              >
                {column.label}
              </th>
            ))}

            {renderActions && (
              <th className="border p-3">
                Actions
              </th>
            )}

          </tr>

        </thead>

        <tbody>

          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row._id}>

                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="border p-3"
                  >
                    {row[column.key]}
                  </td>
                ))}

                {renderActions && (
                  <td className="border p-3">
                    {renderActions(row)}
                  </td>
                )}

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={
                  columns.length + 1
                }
                className="text-center p-4"
              >
                No Data Found
              </td>
            </tr>
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Table;