import { useCallback, useState } from "react";

export enum NetworkStatus {
  NONE = "none",
  INFLIGHT = "in-flight",
  SUCCESS = "success",
  ERROR = "error",
}

export const useNetworkStatus = (initialStatus = NetworkStatus.NONE) => {
  const [status, setStatus] = useState(initialStatus);

  const setNone = useCallback(() => {
    setStatus(NetworkStatus.NONE);
  }, []);

  const setInFlight = useCallback(() => {
    setStatus(NetworkStatus.INFLIGHT);
  }, []);

  const setSuccess = useCallback(() => {
    setStatus(NetworkStatus.SUCCESS);
  }, []);

  const setError = useCallback(() => {
    setStatus(NetworkStatus.ERROR);
  }, []);

  return {
    status,
    setNone,
    setInFlight,
    setSuccess,
    setError,
  };
};
