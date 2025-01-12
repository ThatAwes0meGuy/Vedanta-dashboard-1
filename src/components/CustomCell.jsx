const CustomCell = ({column, row, setCellDimensions, select, activate, mode, dragging, active, data, evaluatedData, DataViewer, setCellData}) => {
    const value = cell?.value || ""; // Safeguard for undefined cells
  
    const isNegative = typeof value === "number" && value < 0;
  
    return (
      <div
        style={{
          backgroundColor: isNegative ? "red" : "white",
          color: isNegative ? "white" : "black",
          padding: "10px",
          textAlign: "center",
          minWidth: "100px",
        }}
      >
        {value}
      </div>
    );
  };
  
export default CustomCell
  
// const stories_CustomCell = ({column, row, setCellDimensions, select, activate, mode, dragging, active, data, evaluatedData, DataViewer, setCellData}) => {
//     const rootRef = react.createRef();
//     react.useEffect(( () => {
//         setCellDimensions({
//             row,
//             column
//         }, {
//             height: 30,
//             width: 149,
//             left: 96 * (column + 1),
//             top: 30 * (row + 1)
//         })
//     }
//     ), [setCellDimensions, column, row]),
//     react.useEffect(( () => {
//         rootRef.current && active && "view" === mode && rootRef.current.focus()
//     }
//     ), [rootRef, active, mode]);