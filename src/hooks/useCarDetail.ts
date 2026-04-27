import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { carApi } from "../services/api";
import { useAppSelector } from "../store/hooks";
import type { Car } from "../types/type";

type SearchNavigationState = {
  fromSearch?: boolean;
};

export const useCarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { items: similarCars } = useAppSelector((state) => state.cars);

  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryKey, setRetryKey] = useState(0);
  const [paymentType, setPaymentType] = useState<"Finance" | "Cash">("Finance");

  useEffect(() => {
    let isActive = true;
    const carId = Number(id);

    const fetchCar = async () => {
      setIsLoading(true);
      setError(null);

      if (!id || !Number.isFinite(carId)) {
        setCar(null);
        setError("Invalid car id.");
        setIsLoading(false);
        return;
      }

      try {
        const data = await carApi.getCarById(carId);
        if (isActive) {
          setCar(data ?? null);
          if (!data) {
            setError("Car not found.");
          }
        }
      } catch (err) {
        if (isActive) {
          setCar(null);
          setError(err instanceof Error ? err.message : "Failed to load car.");
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    fetchCar();

    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    return () => {
      isActive = false;
    };
  }, [id, retryKey]);

  const handleRetry = useCallback(() => {
    setRetryKey((prev) => prev + 1);
  }, []);

  const cameFromSearch = Boolean(
    (location.state as SearchNavigationState | null)?.fromSearch,
  );

  const handleBackToResults = useCallback(() => {
    if (cameFromSearch) {
      navigate(-1);
      return;
    }

    navigate(`/${location.search}`);
  }, [cameFromSearch, navigate, location.search]);

  return {
    car,
    error,
    isLoading,
    similarCars,
    paymentType,
    setPaymentType,
    handleBackToResults,
    handleRetry,
  };
};
