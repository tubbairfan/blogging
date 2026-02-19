"use client";

import { FC } from "react";
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalItems: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ totalItems, page, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  return (
    <div className="mt-6 sm:flex-row sm:items-center sm:justify-between gap-2">
    
      <p className="text-sm text-gray-500">
        Showing {startItem} to {endItem} of {totalItems} 
      </p>

      {totalPages > 1 && (
        <ShadcnPagination className="flex justify-center sm:justify-end sm:mt-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={() => onPageChange(Math.max(page - 1, 1))} />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => onPageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext onClick={() => onPageChange(Math.min(page + 1, totalPages))} />
            </PaginationItem>
          </PaginationContent>
        </ShadcnPagination>
      )}
    </div>
  );
};

export default Pagination;
