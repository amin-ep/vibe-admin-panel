import { useCallback, useEffect, useState } from "react";

export function usePaginate<T>(data: T[], pageSize: number) {
  const [page, setPage] = useState(1);
  const [currentPageData, setCurrentPageData] = useState<T[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);
  const totalPages = Math.ceil(data.length / pageSize);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  useEffect(() => {
    if (data) {
      const currentPageData = data.slice(startIndex, endIndex);
      setCurrentPageData(currentPageData);
      setIsLastPage(totalPages === page);
    }
  }, [data, page]);

  const prevPage = useCallback(() => {
    if (page === 1) return;
    setPage((p) => p - 1);
  }, [page]);

  const nextPage = useCallback(() => {
    if (isLastPage) return;
    setPage((p) => p + 1);
  }, [isLastPage]);

  return { page, currentPageData, nextPage, prevPage, isLastPage, totalPages };
}
