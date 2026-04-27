import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSortBy, fetchCarsAsync, clearFilters } from "../store/carSlice";
import { useCarSearchSync } from "./useCarSearchSync";
import { useInfiniteScroll } from "./useInfiniteScroll";
import type { Car, SortOption } from "../types/type";

export const useSearchPage = () => {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const { items, status, error, sortBy, totalResults, page, hasMore } =
    useAppSelector((state) => state.cars);

  useCarSearchSync();

  const handleLoadMore = useCallback(() => {
    dispatch(fetchCarsAsync(page + 1));
  }, [dispatch, page]);

  const lastCarElementRef = useInfiniteScroll(
    status === "loading",
    hasMore,
    handleLoadMore,
  );

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      dispatch(setSortBy(e.target.value as SortOption));
    },
    [dispatch],
  );

  const handleOpenModal = useCallback((car: Car) => {
    setSelectedCar(car);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCar(null);
  }, []);

  const handleClearFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const handleRetry = useCallback(() => {
    dispatch(fetchCarsAsync(0));
  }, [dispatch]);

  return {
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
  };
};
