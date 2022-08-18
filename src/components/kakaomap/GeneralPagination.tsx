import React, { forwardRef, Ref, RefObject } from 'react';

interface GeneralPaginationProps {
  index: number;
  placeMarkers: any[];
  paginationRef: React.MutableRefObject<any>;
}

const GeneralPagination = ({
  index,
  placeMarkers,
  paginationRef,
}: GeneralPaginationProps) => {
  return (
    <a
      href="#"
      onClick={() => {
        for (let i = 0; i < placeMarkers.length; i++) {
          placeMarkers[i].setMap(null);
        }
        paginationRef!.current.gotoPage(index + 1);
      }}
    >
      {index + 1}
    </a>
  );
};

export default GeneralPagination;
