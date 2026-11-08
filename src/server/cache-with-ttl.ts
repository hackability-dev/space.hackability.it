/**
 * Caches the result of `load` in memory for `ttlMs`. Concurrent misses share one
 * in-flight load, and a failed refresh falls back to the last good value.
 */
export const cacheWithTtl = <T>(
  load: () => Promise<T>,
  ttlMs: number,
  now: () => number = Date.now
) => {
  let cached: { value: T; loadedAt: number } | undefined;
  let inFlight: Promise<T> | undefined;

  return async (): Promise<T> => {
    if (cached && now() - cached.loadedAt < ttlMs) {
      return cached.value;
    }

    inFlight ??= load()
      .then((value) => {
        cached = { value, loadedAt: now() };
        return value;
      })
      .finally(() => {
        inFlight = undefined;
      });

    try {
      return await inFlight;
    } catch (error) {
      if (cached) {
        return cached.value;
      }
      throw error;
    }
  };
};
