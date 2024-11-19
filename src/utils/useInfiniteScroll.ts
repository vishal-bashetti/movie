import { useEffect } from 'react';

function useInfiniteScroll({
  observerRef,
  loadMore,
  loading,
  error,
}: {
  observerRef: React.RefObject<HTMLElement>;
  loadMore: () => void;
  loading: boolean;
  error: string | null;
}) {
  /**
   * Sets up an IntersectionObserver to trigger the `loadMore` function
   * when the observed element (referenced by `observerRef`) becomes visible in the viewport.
   * Ensures data is fetched only if not currently loading and no errors exist.
   */
  useEffect(() => {
    // Ensure the element reference exists before proceeding
    if (!observerRef.current) return;

    // Create an IntersectionObserver to monitor the visibility of the element
    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the element is visible and conditions for loading are met
        const isElementVisible = entries[0].isIntersecting;
        if (isElementVisible && !loading && !error) {
          loadMore(); // Fetch more data
        }
      },
      {
        threshold: 1.0, // The element must be fully visible to trigger the callback
      }
    );

    // Start observing the referenced element
    observer.observe(observerRef.current);

    // Cleanup: Disconnect the observer to prevent memory leaks
    return () => observer.disconnect();
  }, [observerRef, loadMore, loading, error]);
}

export default useInfiniteScroll;
