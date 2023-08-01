import './Searchbar.scss';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchbarProps {}

const Searchbar = ({}: SearchbarProps) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchInput) {
      navigate(`/search/${searchInput}`);
    }
  };

  return (
    <form className="searchbar-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchbar"
        placeholder="Suchbegriff eingeben..."
        value={searchInput}
        onChange={handleChange}
      />
      <button type="submit" className="searchbutton">
        <FiSearch size={24} color="white" className="searchbutton-img" />
      </button>
    </form>
  );
};

export default Searchbar;
