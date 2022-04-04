import editIcon from "../../assets/Images/edit_icon.png";
import detailsIcon from "../../assets/Images/details_icon.png";
import classes from "./RowOptions.module.css";
const RowOptions = ({ onEdit, onViewDetails }) => {
  return (
    <div className={classes.options}>
      <button type="button" onClick={onEdit}>
        <img src={editIcon}></img>
      </button>
      <button type="button" onClick={onViewDetails}>
        <img src={detailsIcon}></img>
      </button>
    </div>
  );
};

export default RowOptions;
