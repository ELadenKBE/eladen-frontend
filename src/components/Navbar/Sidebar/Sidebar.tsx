import './Sidebar.scss';

interface SidebarProps {
  availability: any;
  priceRange: any;
  setAvailability: any;
  setPriceRange: any;
  isSorted: any;
  setIsSorted: any;
}

const Sidebar = ({
  setAvailability,
  setPriceRange,
  availability,
  priceRange,
  isSorted,
  setIsSorted,
}: SidebarProps) => {
  const handleAvailabilityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAvailability(event.target.checked);
  };

  const convertPrices = (priceRangeString: string) => {
    const [min, max] = priceRangeString
      .split('-')
      .map((price) => parseFloat(price));
    return { min, max };
  };

  const isPriceRangeSelected = (value: string) => {
    const selectedPriceRange = convertPrices(value);
    return (
      selectedPriceRange.min === priceRange.min &&
      selectedPriceRange.max === priceRange.max
    );
  };

  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedPriceRange = convertPrices(event.target.value);
    // If the checkbox is checked, set the price range, otherwise, reset it to null.
    setPriceRange(
      event.target.checked ? selectedPriceRange : { min: 0, max: 100000 },
    );
  };

  return (
    <div className="sidebar">
      <h2>Verfügbarkeit:</h2>
      <label>
        <input
          type="checkbox"
          checked={availability}
          onChange={handleAvailabilityChange}
        />
        Im Lager
      </label>

      <h2>Preis:</h2>
      <div className="sidebar-prices">
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

      <h2>Sortierung:</h2>
      <div className="sidebar-sorting">
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
