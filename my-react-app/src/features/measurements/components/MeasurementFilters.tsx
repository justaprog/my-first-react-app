type MeasurementFiltersProps = {
  searchTerm: string;
  statusFilter: "ALL" | "OK" | "NOK";
  onSearchTermChange: (value: string) => void; // similar to emit event in Vue
  onStatusFilterChange: (value: "ALL" | "OK" | "NOK") => void;
};

/**
 * Component to display filters for searching and filtering measurements.
 * @param searchTerm The current search term for filtering measurements by component, cell, or dimension.
 * @param statusFilter The current status filter ("ALL", "OK", or "NOK") for filtering measurements by their status.
 * @param onSearchTermChange Callback function to update the search term when the user types in the search input.
 * @param onStatusFilterChange Callback function to update the status filter when the user selects a different option from the dropdown.
 * @returns A JSX element containing the search input and status filter dropdown for filtering measurements.
 */
export function MeasurementFilters({
  searchTerm,
  statusFilter,
  onSearchTermChange, // callback to update search term
  onStatusFilterChange, // callback to update status filter
}: MeasurementFiltersProps) {
  return (
    <section className="filters">
      <div className="filter-group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
          placeholder="Search component, cell, or dimension..."
        />
      </div>

      <div className="filter-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={statusFilter}
          onChange={(event) =>
            onStatusFilterChange(event.target.value as "ALL" | "OK" | "NOK")
          }
        >
          <option value="ALL">All</option>
          <option value="OK">OK</option>
          <option value="NOK">NOK</option>
        </select>
      </div>
    </section>
  );
}