import './Searchbar.scss';
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Interface for Searchbar component props
interface SearchbarProps {}

const Searchbar: React.FC<SearchbarProps> = ({}: SearchbarProps) => {
  // State to store the search input value
  const [searchInput, setSearchInput] = useState<string>('');

  // React Router's navigate function to handle navigation
  const navigate = useNavigate();

  // Function to handle changes in the search input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Function to handle the form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchInput) {
      // Navigate to the search results page with the search input as the parameter
      navigate(`/search/${searchInput}`);
    }
  };

  return (
    <form className="searchbar-container" onSubmit={handleSubmit}>
      {/* Input element for the search bar */}
      <input
        type="text"
        className="searchbar"
        placeholder="Suchbegriff eingeben..."
        value={searchInput}
        onChange={handleChange}
      />

      {/* Submit button with the search icon */}
      <button type="submit" className="searchbutton">
        <FiSearch size={24} color="white" className="searchbutton-img" />
      </button>
    </form>
  );
};

export default Searchbar;
