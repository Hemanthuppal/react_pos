import React from 'react';
import { useTable, usePagination, useGlobalFilter, useSortBy } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';

const rowCount = 120; // Example: Total number of entries in your dataset

// A simple global filter for searching
function GlobalFilter({ globalFilter, setGlobalFilter, setPageSize, pageSize }) {
  return (
    <div className="mb-3 d-flex justify-content-between align-items-center">
      {/* Show Entries dropdown */}
      <div className="d-flex align-items-center">
        <span className="me-2">Show</span>
        <select
          className="form-select w-auto mx-2"
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>entries</span>
      </div>

      {/* Search input */}
      <input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)} // Only apply text-based filtering
        className="form-control ms-auto"
        style={{ width: '200px' }}
        placeholder="Search..."
      />
    </div>
  );
}

export default function DataTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    gotoPage, // This is the gotoPage function to navigate to a specific page
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter, // Apply global filter hook
    useSortBy, // Apply sorting functionality
    usePagination // Apply pagination functionality
  );

  return (
    <div className="container mt-5">

      {/* Card layout */}
      <div className="card">
        <div className="card-body">
          {/* Search and Show Entries inside the Card */}
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            setPageSize={setPageSize}
            pageSize={pageSize}
          />

          <hr />

          <table {...getTableProps()} className="table table-bordered table-striped">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render('Header')}
                      <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span>
              Showing {pageIndex * pageSize + 1} to{" "}
              {Math.min((pageIndex + 1) * pageSize, rowCount)} of {rowCount} entries
            </span>

            <div className="d-flex align-items-center">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                Previous
              </button>

              {/* Page Number Buttons */}
              <div className="mx-2">
                {pageOptions.map((pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`btn btn-sm ${pageIndex === pageNumber ? 'btn-secondary' : 'btn-outline-primary'}`}
                    onClick={() => gotoPage(pageNumber)} // Go to the selected page
                  >
                    {pageNumber + 1}
                  </button>
                ))}
              </div>

              <button
                className="btn btn-sm btn-primary"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
