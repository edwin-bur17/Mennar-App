"use client"
import { createContext, useContext, useState, useCallback } from "react";

const PaginationContext = createContext()

export const PaginationProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(10)

    // Número de página
    const setPage = useCallback((page, callback) => {
        setCurrentPage(page)
        if (callback) callback(page)
    }, [])

    // Paginación (data) actual
    const getPaginatedData = useCallback((data) => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return data.slice(startIndex, startIndex + itemsPerPage)
    }, [currentPage, itemsPerPage])

    const value = {currentPage, itemsPerPage, setPage, getPaginatedData}

    return (
        <PaginationContext.Provider value={value}> {children} </PaginationContext.Provider>
    )
}

export const usePagination = () => useContext(PaginationContext)