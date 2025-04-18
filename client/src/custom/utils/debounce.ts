export const debounce = <T extends Array<unknown>>(
  func: (...args: T) => void,
  wait = 500
) => {
  let timeout: number | null;

  return function executedFunction(...args: T) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    window.clearTimeout(timeout as number);
    timeout = window.setTimeout(later, wait);
  };
};
