import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useQueryHook } from "./useQueryHook";
import { useDebounce } from "./useDebounce";

import { getUserPaginated } from "../api";
import { GlobalContext } from "../context/contextCreate";
import { UserInfoInterface } from "../_helpers";

const navbarHeight = 64;

export const useUserList = () => {
    const navigateTo = useNavigate();
    const { windowDimension } = useContext(GlobalContext);

    // const searchInputRef = useRef<HTMLDivElement | null>(null);
    // const tablePaginationRef = useRef<HTMLDivElement | null>(null);
    // const cardPaginationRef = useRef<HTMLDivElement | null>(null);
    const [componentHeight, setComponentHeight] = useState({
        contentHeaderHeight: 0,
        tablePaginationHeight: 0,
        cardPagiantionHeight: 0
    });
    
    const [page, setPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState<string>("");
    const debounceSave = useDebounce((nextValue) => {
        setSearchValue(nextValue); 
        setPage(1);
    }, 700);

    const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
    const [selectedUserData, setSelectedUserData] = useState<UserInfoInterface | undefined>(undefined);
    
    const userListResponse = useQueryHook(["userList", limitPerPage, page, searchValue], getUserPaginated(limitPerPage, page, searchValue), true);

    const contentHeaderRef = useCallback((node: HTMLDivElement) => {
        if (node !== null) {
            setComponentHeight((prevVals) => (
                { ...prevVals, contentHeaderHeight: node.getBoundingClientRect().height }
            ));
        }
    }, [windowDimension.width]);

    const tablePaginationRef = useCallback((node: HTMLDivElement) => {
        if (node !== null) setComponentHeight((prevVals) => (
            { ...prevVals, tablePaginationHeight: node.getBoundingClientRect().height }
        ));
    }, [windowDimension.width]);

    const cardPaginationRef = useCallback((node: HTMLDivElement) => {
        if (node !== null) setComponentHeight((prevVals) => (
            { ...prevVals, cardPagiantionHeight: node.getBoundingClientRect().height }
        ));
    }, [windowDimension.width]);

    const tableHeight = useMemo(() => {
        const allGap = 20 * 4;
        const additionalExcessHeight = 50;
        return windowDimension.height - navbarHeight - componentHeight.contentHeaderHeight - componentHeight.tablePaginationHeight - allGap - additionalExcessHeight;
    }, [windowDimension.height, componentHeight]);

    const cardContentHeight = useMemo(() => {
        const allGap = 20 * 4;
        return windowDimension.height - navbarHeight - componentHeight.contentHeaderHeight - componentHeight.cardPagiantionHeight - allGap;
    }, [windowDimension.height, componentHeight]);

    const cardData = useMemo(() => {
        let dataQuery = userListResponse?.data?.data?.userList;
        let finalData: UserInfoInterface[] = [];
        
        if (dataQuery) {
            finalData = [...dataQuery];
        }

        let numColumns;
        switch (true) {
            case windowDimension.width <= 491 && windowDimension.width >= 491 && windowDimension.width <= 494 :
                numColumns = 1;
                break;
            case windowDimension.width >= 495 && windowDimension.width <= 732 :
                numColumns = 2;
                break;
            case windowDimension.width > 732 :
                numColumns = 3;
                break;
            default:
                numColumns = 1;
                break;
        };

        const numberOfFullRows = Math.floor((dataQuery?.length || 0) / (numColumns || 0));
        let numOfElementsLastRow = (dataQuery?.length || 0) - (numberOfFullRows * (numColumns || 0));
        // console.log(dataQuery);
        // console.log("NUM COLUMNS: ", numColumns);

        if (numOfElementsLastRow !== numColumns && numOfElementsLastRow !== 0) {
            finalData?.push({ id: `blank-${numOfElementsLastRow}`, empty: true }, { id: `blank-${numOfElementsLastRow}`, empty: true });
            numOfElementsLastRow = numOfElementsLastRow + 1;
        }
        else {
            finalData = userListResponse?.data?.data?.userList || [];
            numOfElementsLastRow = numOfElementsLastRow - 1;
        }

        return finalData;
    }, [userListResponse, windowDimension.width]);

    const onClickCardMenu = (key: string, data: UserInfoInterface) => {
        setSelectedUserData(data);
        if (key === "edit") setIsModalEditOpen(!isModalEditOpen);
        else setIsModalDeleteOpen(!isModalDeleteOpen);
    };

    const onClickTableEdit = (record: UserInfoInterface) => {
        setSelectedUserData(record);
        setIsModalEditOpen(!isModalEditOpen);
    };
    // console.log("CONTENT HEADER HEIGHT: ", componentHeight);

    useEffect(() => {
        navigateTo({ search: `?limit=${limitPerPage}&page=${page}&per_page=${limitPerPage}&q=${searchValue}` }, { replace: true });
    }, [page, limitPerPage, searchValue]);

    useEffect(() => {
        if (isModalEditOpen === false) return setSelectedUserData(undefined);
    }, [isModalEditOpen]);

    useEffect(() => {
        if (isModalDeleteOpen === false) return setSelectedUserData(undefined);
    }, [isModalDeleteOpen]);

    return {
        page,
        setPage,
        setLimitPerPage,
        debounceSave,
        setSearchValue,
        userListResponse,
        cardData,
        contentHeaderRef,
        tablePaginationRef,
        cardPaginationRef,
        tableHeight,
        cardContentHeight,
        onClickCardMenu,
        onClickTableEdit,
        selectedUserData,
        isModalEditOpen, 
        setIsModalEditOpen,
        isModalDeleteOpen, 
        setIsModalDeleteOpen
    };
};