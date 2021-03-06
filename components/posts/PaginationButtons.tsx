import React from "react";
import { useCallback } from "react";
import Router from "next/router";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

interface PaginationButtons {
  uri: string;
  hasNext: boolean;
  hasPrevious: boolean;
  actualPage: number;
}

function PaginationButtons({ uri, actualPage, hasNext, hasPrevious }: PaginationButtons) {
  const onPreviousClick = useCallback(() => {
    const previousNum = actualPage - 1;

    Router.push(`${uri}${previousNum > 1 ? previousNum : ""}`);
  }, [uri, actualPage]);

  const onNextClick = useCallback(() => {
    Router.push(`${uri}${actualPage + 1}`);
  }, [uri, actualPage]);

  return (
    <div className="flex md:space-x-4 px-6 justify-between md:justify-center py-10">
      <button
        className="py-3 w-32 uppercase font-khand-headers rounded-[3px] text-white bg-main transition-colors font-bold hover:bg-black flex items-center justify-center disabled:bg-main disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={onPreviousClick}
        disabled={!hasPrevious}
      >
        <FaCaretLeft className="h-4 w-4 mb-[1px]" /> <div>Previous</div>
      </button>
      <button
        className="px-5 w-32 uppercase font-khand-headers rounded-[3px] text-white bg-main transition-colors font-bold hover:bg-black flex items-center justify-center disabled:bg-main disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={onNextClick}
        disabled={!hasNext}
      >
        <div>Next</div> <FaCaretRight className="h-4 w-4 mb-[1px]" />
      </button>
    </div>
  );
}

export default PaginationButtons;
