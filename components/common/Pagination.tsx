import React from "react";

interface PaginationProps {
  actualPage: number;
  numPages: number;
  totalResults: number;
  onClickPrevious: () => void;
  onClickNext: () => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
}

function Pagination({
  actualPage,
  numPages,
  totalResults,
  onClickNext,
  onClickPrevious,
  nextDisabled,
  prevDisabled,
}: PaginationProps) {
  return (
    <nav
      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          <span className="font-bold">{actualPage}</span> to <span className="font-bold">{numPages}</span> of{" "}
          <span className="font-bold">{totalResults}</span> results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end">
        <button
          onClick={onClickPrevious}
          disabled={prevDisabled}
          className="relative disabled:bg-main/50 inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md bg-main text-white"
        >
          Previous
        </button>
        <button
          onClick={onClickNext}
          disabled={nextDisabled}
          className="ml-3 relative disabled:bg-main/50 inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md bg-main text-white"
        >
          Next
        </button>
      </div>
    </nav>
  );
}

export default Pagination;
