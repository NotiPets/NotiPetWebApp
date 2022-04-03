/* eslint-disable react/jsx-key */
import { useTable, usePagination } from "react-table";
import classes from "./Table.module.css";

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    usePagination
  );

  return (
    <div className={classes["table-wrapper"]}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={classes["table__pagination"]}>
        <button
          className={classes["table__pagination-item"]}
          onClick={previousPage}
          disabled={!canPreviousPage}
        >
          &lt;
        </button>
        <button
          className={classes["table__pagination-item"]}
          onClick={nextPage}
          disabled={!canNextPage}
        >
          &gt;
        </button>
        <span>
          Página&nbsp;
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default Table;
