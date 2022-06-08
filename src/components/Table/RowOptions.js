import classes from "./RowOptions.module.css";

const RowOptions = ({ onEdit, onViewDetails }) => {
  return (
    <div className={classes.options}>
      {onEdit && (
        <button type="button" onClick={onEdit}>
          <i className="bx bxs-edit"></i>
        </button>
      )}
      <button type="button" onClick={onViewDetails}>
        <i className="bx bx-spreadsheet"></i>
      </button>
    </div>
  );
};

export default RowOptions;
