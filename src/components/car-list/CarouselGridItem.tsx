import { ExternalLink, Info } from "lucide-react";

export const ACTION_REQUEST_INFO = "ACTION_REQUEST_INFO";
export const ACTION_AUTOCHECK = "ACTION_AUTOCHECK";

type Props = {
  item: string;
  originalImageIndex: number;
  onImageClick: (index: number) => void;
};

export const CarouselGridItem = ({
  item,
  originalImageIndex,
  onImageClick,
}: Props) => {
  if (item === ACTION_REQUEST_INFO) {
    return (
      <div className="w-full h-full bg-[#f8f9fa] rounded border border-gray-200 flex flex-col items-center justify-center relative hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex flex-col items-center gap-2 text-[#004685]">
          <Info size={28} />
          <span className="text-center font-medium leading-tight">
            Request More
            <br />
            Info
          </span>
        </div>
      </div>
    );
  }

  if (item === ACTION_AUTOCHECK) {
    return (
      <a
        href="#"
        target="_blank"
        className="w-full h-full bg-[#f8f9fa] rounded border border-gray-200 flex flex-col items-center justify-center p-4 hover:shadow-md transition-shadow cursor-pointer text-center"
      >
        <div className="text-gray-500 text-sm mb-1">experian.</div>
        <div className="text-[#b43512] text-xl font-light tracking-wide mb-2">
          AutoCheck.
        </div>
        <div className="text-[10px] font-bold flex items-center justify-center gap-1 mb-3">
          <span className="w-4 h-4 bg-[#004685] text-white rounded-full flex items-center justify-center text-[8px]">
            KBB
          </span>
          Offered by Kelley Blue Book
        </div>
        <div className="text-[#004685] text-sm flex items-center justify-center gap-1 font-medium">
          View the Free Vehicle History Report <ExternalLink size={14} />
        </div>
      </a>
    );
  }

  return (
    <div
      className="w-full h-full overflow-hidden cursor-pointer group/img relative"
      onClick={() => onImageClick(originalImageIndex)}
    >
      <img
        src={item}
        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
      />
    </div>
  );
};
