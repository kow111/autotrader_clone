interface Props {
  totalResults: number;
  sortBy: string;
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SearchResultsHeader: React.FC<Props> = ({
  totalResults,
  sortBy,
  onSortChange,
}) => (
  <div className="flex justify-between items-center mb-2 mt-2">
    <h2 className="text-lg font-bold text-gray-900">{totalResults} Matches</h2>
    <div className="flex items-center gap-3">
      <label className="text-sm text-gray-600 font-medium whitespace-nowrap">
        Sort by:
      </label>
      <select
        value={sortBy}
        onChange={onSortChange}
        className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-[#004685] text-sm cursor-pointer"
      >
        <option value="recommended">Recommended</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="year_desc">Year: Newest</option>
        <option value="year_asc">Year: Oldest</option>
      </select>
    </div>
  </div>
);
