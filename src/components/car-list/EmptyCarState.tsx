interface Props {
  onClearFilters: () => void;
}

export const EmptyCarState: React.FC<Props> = ({ onClearFilters }) => (
  <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center grow">
    <p className="text-gray-500 text-lg mb-4">
      No cars found matching your criteria.
    </p>
    <button
      onClick={onClearFilters}
      className="text-[#004685] font-semibold hover:text-[#00386b] transition-colors"
    >
      Clear All Filters
    </button>
  </div>
);
