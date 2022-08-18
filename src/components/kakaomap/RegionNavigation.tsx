import React from 'react';

const SIDO_NM_ARRAY: string[] = [
  '인천',
  '강원',
  '충남',
  '경북',
  '경남',
  '전북',
  '전남',
  '울산',
  '부산',
  '제주',
];

interface RegionNavigationProps {
  sidoClickHandler: (sido: string, currentPage?: number) => Promise<void>;
}

const RegionNavigation = ({ sidoClickHandler }: RegionNavigationProps) => {
  return (
    <>
      {SIDO_NM_ARRAY.map((sido) => (
        <li key={sido}>
          <button
            className="border border-white px-2 text-xs font-bold py-1 hover:border hover:border-transparent hover:bg-orange-400 hover:text-white shadow-lg rounded-md"
            onClick={() => sidoClickHandler(sido)}
          >
            {sido}
          </button>
        </li>
      ))}
    </>
  );
};

export default RegionNavigation;
