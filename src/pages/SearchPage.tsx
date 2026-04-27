import { RequestInfoModal } from "@/components/car-detail/RequestInfoModal";
import { CarCard } from "@/components/car-list/CarCard";
import { CarGridSkeleton } from "@/components/car-list/CarGridSkeleton";
import { EmptyCarState } from "@/components/car-list/EmptyCarState";
import { SearchResultsHeader } from "@/components/car-list/SearchResultsHeader";
import { FiltersBar } from "@/components/filters/FiltersBar";
import SidebarFilter from "@/components/filters/SidebarFilter";
import { StickyTopBar } from "@/components/layout/StickyTopBar";
import { ApiErrorState } from "@/components/shared/ApiErrorState";
import { useSearchPage } from "@/hooks/useSearchPage";
export const SearchPage: React.FC = () => {
  const {
    items,
    status,
    error,
    sortBy,
    totalResults,
    isModalOpen,
    selectedCar,
    lastCarElementRef,
    handleSortChange,
    handleOpenModal,
    handleCloseModal,
    handleClearFilters,
    handleRetry,
  } = useSearchPage();

  const renderMainContent = () => {
    if (status === "loading" && items.length === 0) {
      return <CarGridSkeleton />;
    }

    if (status === "failed") {
      return <ApiErrorState message={error} onRetry={handleRetry} />;
    }

    if (items.length === 0) {
      return <EmptyCarState onClearFilters={handleClearFilters} />;
    }

    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map((car, index) => (
            <div
              key={car.id}
              ref={items.length === index + 1 ? lastCarElementRef : null}
            >
              <CarCard car={car} onRequestInfo={() => handleOpenModal(car)} />
            </div>
          ))}

          {status === "loading" && items.length > 0 && (
            <CarGridSkeleton count={20} withContainer={false} />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <StickyTopBar />
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-1/5 shrink-0 hidden md:block">
            <SidebarFilter />
          </div>

          <div className="w-full lg:w-4/5 flex flex-col">
            <FiltersBar />

            <SearchResultsHeader
              totalResults={totalResults}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />

            {renderMainContent()}
          </div>
        </div>
      </div>

      {isModalOpen && selectedCar && (
        <RequestInfoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          car={selectedCar}
        />
      )}
    </>
  );
};
