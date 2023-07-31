import './Searchbar.scss';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface SearchbarProps {}

const Searchbar = ({}: SearchbarProps) => {
  const [searchInput, setSearchInput] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const url = `/search/${searchInput}`;

  return (
    <form className="searchbar-container">
      <input
        type="text"
        className="searchbar"
        placeholder="Suchbegriff eingeben..."
        value={searchInput}
        onChange={handleChange}
      />
      <button type="submit" className="searchbutton">
        {searchInput ? (
          <Link to={url} className="searchbutton-link">
            <FiSearch size={24} color="white" className="searchbutton-img" />
          </Link>
        ) : (
          <FiSearch size={24} color="white" className="searchbutton-img" />
        )}
      </button>
    </form>
  );
};

export default Searchbar;
