import './Sidebar.scss';
import React, { ChangeEvent } from 'react';

interface PriceRange {
  min: number;
  max: number;
}

interface SidebarProps {
  availability: boolean;
  priceRange: PriceRange;
  setAvailability: (availability: boolean) => void;
  setPriceRange: (priceRange: PriceRange) => void;
  isSorted: string;
  setIsSorted: (isSorted: 'ascending' | 'descending') => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  setAvailability,
  setPriceRange,
  availability,
  priceRange,
  isSorted,
  setIsSorted,
}) => {
  // Function to handle changes in the "Availability" checkbox
  const handleAvailabilityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAvailability(event.target.checked);
  };

  // Function to convert the price range string to an object with min and max values
  const convertPrices = (priceRangeString: string): PriceRange => {
    const [min, max] = priceRangeString
      .split('-')
      .map((price) => parseFloat(price));
    return { min, max };
  };

  // Function to check if a particular price range is selected
  const isPriceRangeSelected = (value: string): boolean => {
    const selectedPriceRange = convertPrices(value);
    return (
      selectedPriceRange.min === priceRange.min &&
      selectedPriceRange.max === priceRange.max
    );
  };

  // Function to handle changes in the "Price Range" checkboxes
  const handlePriceRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedPriceRange = convertPrices(event.target.value);
    // If the checkbox is checked, set the price range; otherwise, reset it to the default range.
    setPriceRange(
      event.target.checked ? selectedPriceRange : { min: 0, max: 100000 },
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar-availability">
        <h2>Verfügbarkeit:</h2>
        <label>
          <input
            type="checkbox"
            checked={availability}
            onChange={handleAvailabilityChange}
          />
          Im Lager
        </label>
      </div>
      <div className="sidebar-prices">
        <h2>Preis:</h2>
        <label>
          <input
            type="checkbox"
            name="priceRange"
            value="50-100"
            checked={isPriceRangeSelected('50-100')}
            onChange={handlePriceRangeChange}
          />
          50€ - 100€
        </label>
        <label>
          <input
            type="checkbox"
            name="priceRange"
            value="100-200"
            checked={isPriceRangeSelected('100-200')}
            onChange={handlePriceRangeChange}
          />
          100€ - 200€
        </label>
        <label>
          <input
            type="checkbox"
            name="priceRange"
            value="200-400"
            checked={isPriceRangeSelected('200-400')}
            onChange={handlePriceRangeChange}
          />
          200€ - 400€
        </label>
        <label>
          <input
            type="checkbox"
            name="priceRange"
            value="400-800"
            checked={isPriceRangeSelected('400-800')}
            onChange={handlePriceRangeChange}
          />
          400€ - 800€
        </label>
      </div>

      <div className="sidebar-sorting">
        <h2>Sortierung:</h2>
        <label>
          <input
            type="radio"
            name="sorting"
            value="ascending"
            checked={isSorted === 'ascending'}
            onChange={() => setIsSorted('ascending')}
          />
          Aufsteigend
        </label>
        <label>
          <input
            type="radio"
            name="sorting"
            value="descending"
            checked={isSorted === 'descending'}
            onChange={() => setIsSorted('descending')}
          />
          Absteigend
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
