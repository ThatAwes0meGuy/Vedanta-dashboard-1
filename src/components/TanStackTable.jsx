import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { USERS } from '../data';
import { useState } from 'react';
import DownloadBtn from './DownloadBtn';
import UploadBtn from './UploadBtn';
import DebouncedInput from './DebouncedInput';
import { SearchIcon } from '../Icons/Icons';

const TanStackTable = () => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('', {
      id: 'Sl_No',
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: 'S.No',
    }),
    columnHelper.accessor('Equipment', {
      cell: (info) => (
        <img
          src="https://www.shutterstock.com/image-vector/industrial-hvac-blower-equipment-exhaust-600nw-2443989807.jpg"
          alt="..."
          className="rounded-full w-10 h-10 object-cover"
        />
      ),
      header: 'Equipment',
    }),
    columnHelper.accessor('Date_of_Visit', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Date of visit',
    }),
    columnHelper.accessor('Main_WorkCtr', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Main WorkCtr',
    }),
    columnHelper.accessor('Equip_Tag_No', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Equip. Tag No.',
    }),
    columnHelper.accessor('Frequency', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Frequency',
    }),
    columnHelper.accessor('Critical_Limit', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Critical Limit',
    }),
    columnHelper.accessor('Drive_Driven_Max_Vibrations', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Drive/Driven Vibrations',
    }),
    columnHelper.accessor('Health_Status', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Health Status',
    }),
    columnHelper.accessor('Observations_Analysis', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Observation & Analysis',
    }),
    columnHelper.accessor('Recommendations', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Recommendations',
    }),
    columnHelper.accessor('Remarks', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Remarks',
    }),
  ];
  const [data] = useState(() => [...USERS]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2">
      <div className="flex justify-between mb-2">
        <div className="w-full flex items-center gap-1">
          <SearchIcon />
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-green-600"
            placeholder="Search all columns..."
          />
        </div>
        <span className="mx-4">
          <DownloadBtn data={data} fileName={'peoples'} />
        </span>
        <UploadBtn data={data} fileName={'peoples'} />
      </div>
      <table className="border border-green-600 w-full text-left">
        <thead className="bg-green-600 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3.5 py-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`
                ${i % 2 === 0 ? 'bg-green-100' : 'bg-green-50'}
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3.5 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>No Records Found!</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-green-600 px-2 disabled:opacity-30"
        >
          {'<'}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-green-600 px-2 disabled:opacity-30"
        >
          {'>'}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-green-100"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-green-100 border border-green-600"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TanStackTable;
