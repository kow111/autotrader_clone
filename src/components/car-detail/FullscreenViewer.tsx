import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Props = {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (newIndex: number) => void;
};

export const FullscreenViewer = ({
  images,
  currentIndex,
  onClose,
  onIndexChange,
}: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center backdrop-blur-sm overflow-hidden"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white/70 hover:text-white p-2 transition"
      >
        <X size={32} />
      </button>

      <div
        className="flex h-full w-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-full h-full shrink-0 flex items-center justify-center p-4 relative"
          >
            <img
              src={img}
              alt={`Fullscreen image ${idx + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        ))}
      </div>

      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onIndexChange(currentIndex - 1);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white p-2 transition"
        >
          <ChevronLeft size={48} />
        </button>
      )}

      {currentIndex < images.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onIndexChange(currentIndex + 1);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white p-2 transition"
        >
          <ChevronRight size={48} />
        </button>
      )}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 text-white/70 text-sm font-medium tracking-widest bg-black/50 px-4 py-1.5 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};
