interface ApiErrorStateProps {
  title?: string;
  message?: string | null;
  onRetry: () => void;
}

export const ApiErrorState: React.FC<ApiErrorStateProps> = ({
  title,
  message,
  onRetry,
}) => {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 md:p-5">
      <h3 className="text-base md:text-lg font-semibold text-red-700">
        {title || "Failed to load cars"}
      </h3>
      <p className="mt-1 text-sm text-red-600">
        {message || "Something went wrong while fetching data."}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
};
