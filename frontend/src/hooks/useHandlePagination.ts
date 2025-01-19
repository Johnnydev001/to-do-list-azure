import { useCallback, useEffect } from "react";

export const useHandlePagination = (
  items: Array<any> | null | undefined = [],
  setItems: (x: Array<any>) => void,
  currentPage: number = 1,
  itemsPerPage: number = 10
) => {
  const fetchData = useCallback(async () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setItems(items?.slice(startIndex, endIndex));
  }, [currentPage]);

  useEffect(() => {
    let isMounted = true;

    fetchData().then(() => {
      if (!isMounted) {
        return;
      }
    });

    return () => {
      isMounted = false;
    };
  }, [fetchData]);
};
