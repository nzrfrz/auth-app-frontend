import { useMemo } from "react";

export const useSearchParamsHook = () => {
    const searchParams = new URLSearchParams(window.location.search);

    const paginationData = useMemo(() => {
        return {
            page: parseInt(searchParams.get("page") || "0"),
            limit: parseInt(searchParams.get("limit") || "0"),
            per_page: parseInt(searchParams.get("per_page") || "0"),
            searchQuery: searchParams.get("q"),
        }
    }, [searchParams]);

    return paginationData;
};