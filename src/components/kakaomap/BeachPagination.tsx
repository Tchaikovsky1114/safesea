import React from 'react';

interface BeachPaginationProps {
  index: number;
  sidoClickHandler: (sido: string, currentPage?: number) => Promise<void>;
  sido: string;
}
const BeachPagination = ({
  index,
  sidoClickHandler,
  sido,
}: BeachPaginationProps) => {
  return (
    <button
      key={index + 'oceanbeach-pagination'}
      onClick={() => sidoClickHandler(sido, index + 1)}
      className="focus:text-rose-500"
    >
      {index + 1}
    </button>
  );
};

export default BeachPagination;
