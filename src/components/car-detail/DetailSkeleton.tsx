export const DetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse bg-gray-50 min-h-screen">
      <div className="h-4 bg-gray-200 rounded w-48 mb-6"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="w-full md:w-1/2">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-40"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="w-full h-75 sm:h-100 md:h-125 bg-gray-200 rounded-xl mb-4"></div>

          <div className="grid grid-cols-4 md:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="h-20 md:h-24 bg-gray-200 rounded-lg"
              ></div>
            ))}
          </div>

          <div className="mt-10">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
            <div className="h-12 bg-gray-100 rounded-lg w-full"></div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n}>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full shrink-0"></div>
            <div className="w-full space-y-2">
              <div className="h-5 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
