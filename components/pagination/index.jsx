import { cn } from "@/utils/utils";
import React from "react";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize); // 100/10
  if (pagesCount === 1) return null;

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div>
      <ul className="flex justify-center gap-3 items-center">
        {pages.map((page) => (
          <li
            key={page}
            className={cn(
              "flex justify-center text-white items-center w-8 h-8 border rounded-lg cursor-pointer",
              page === currentPage ? "bg-indigo-500" : "bg-gray-200"
            )}
          >
            <a
              className="cursor-pointer w-full flex items-center justify-center"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
