type ProcessLike = {
  env?: Record<string, string | undefined>;
};

type GlobalWithProcess = typeof globalThis & {
  process?: ProcessLike;
  __APP_CONFIG__?: {
    API_URL?: string;
  };
};

const DEFAULT_API_BASE_URL = "http://localhost:8080/api";

const resolveApiBaseUrl = () => {
  const globalScope = globalThis as GlobalWithProcess;

  const fromRuntimeConfig = globalScope.__APP_CONFIG__?.API_URL;
  const fromProcessEnv = globalScope.process?.env?.VITE_API_URL;

  return (fromRuntimeConfig || fromProcessEnv || DEFAULT_API_BASE_URL).replace(
    /\/+$/,
    "",
  );
};

export const API_BASE_URL = resolveApiBaseUrl();
