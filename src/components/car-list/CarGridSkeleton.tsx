interface CarGridSkeletonProps {
  count?: number;
  withContainer?: boolean;
  containerClassName?: string;
}

export const CarGridSkeleton: React.FC<CarGridSkeletonProps> = ({
  count = 20,
  withContainer = true,
  containerClassName = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6",
}) => {
  const items = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className="bg-white rounded-lg p-4 animate-pulse border border-gray-200 flex flex-col h-full"
    >
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4 shrink-0"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
      <div className="grid grid-cols-2 gap-4 mb-6 mt-auto">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
      <div className="h-8 bg-gray-200 rounded w-1/3 mt-auto"></div>
    </div>
  ));

  if (!withContainer) {
    return <>{items}</>;
  }

  return <div className={containerClassName}>{items}</div>;
};
