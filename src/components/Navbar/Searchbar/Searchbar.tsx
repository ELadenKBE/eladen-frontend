import "./Searchbar.scss";
interface SearchbarProps {}
import { FiSearch } from "react-icons/fi";

/**
 * The Searchbar that is inside the navbar
 * @returns a searchbar with a searchbutton
 */
const Searchbar = ({}: SearchbarProps) => {
  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <div className="searchbutton">
          <FiSearch size={24} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
