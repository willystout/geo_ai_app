import React from 'react';
import styles from '../styles/SearchForm.module.css'; // Import as `styles`

function SearchForm({ placeholder = "Search...", onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.searchInput.value;
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className={styles['search-container']}>
      <div className={styles['logo-container']}>
        <h1 className={styles['logo-text']}>GEO AI</h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      {/* Search Form */}
      <form className={styles.searchform} onSubmit={handleSubmit}>
        <input
          name="searchInput"
          type="text"
          placeholder={placeholder}
          className={styles['search-input']}
          autoComplete="off"
        />

        <div className={styles['bottom-row']}>
          {/* Date Range Input */}
          <div className={styles['date-range']}>
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              className={styles['date-input']}
            />
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              className={styles['date-input']}
            />
          </div>

          {/* Location Input */}
          <input
            name="location"
            type="text"
            placeholder="Enter location"
            className={styles['location-input']}
          />

          {/* Output Format Selector */}
          <div className={styles['output-format']}>
            <label htmlFor="outputFormat">Output Format</label>
            <select
              name="outputFormat"
              id="outputFormat"
              className={styles['format-select']}
            >
              <option value="PDF">.PDF</option>
              <option value="TIF">.TIF</option>
            </select>
          </div>
        </div>
        <button type="submit" className={styles['search-button']}>Search</button>
      </form>

      <div className={styles.results}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default SearchForm;