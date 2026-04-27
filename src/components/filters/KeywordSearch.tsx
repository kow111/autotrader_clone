import { Search } from "lucide-react";

interface Props {
  keyword: string | null | undefined;
  setKeyword: (val: string) => void;
}

export const KeywordSearch: React.FC<Props> = ({ keyword, setKeyword }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-[#d85e26]" />
      </div>
      <input
        value={keyword || ""}
        onChange={(e) => setKeyword(e.target.value)}
        type="text"
        placeholder="Start New Search"
        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full text-[15px] outline-none focus:border-[#004685] focus:ring-1 focus:ring-[#004685] shadow-sm transition-shadow"
      />
    </div>
  );
};
