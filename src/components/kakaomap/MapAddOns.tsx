import React from 'react';

interface MapAddOnsProps {
  map: React.MutableRefObject<any>;
}

const MapAddOns = ({ map }: MapAddOnsProps) => {
  return (
    <>
      <button
        className="text-xs font-bold py-2 px-4 border border-slate-600 mr-2 hover:bg-orange-500 hover:text-white transition duration-200 hover:border-orange-500"
        onClick={() => {
          map.current.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC);
        }}
      >
        실시간 교통상황
      </button>
      <button
        className="text-xs font-bold py-2 px-4 border border-slate-600 mr-2 hover:bg-orange-500 hover:text-white transition duration-200 hover:border-orange-500"
        onClick={() => {
          map.current.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADMAP);
        }}
      >
        일반도로
      </button>
      <button
        className="text-xs font-bold py-2 px-4 border border-slate-600 mr-2 hover:bg-orange-500 hover:text-white transition duration-200 hover:border-orange-500"
        onClick={() => {
          map.current.addOverlayMapTypeId(window.kakao.maps.MapTypeId.SKYVIEW);
        }}
      >
        스카이뷰
      </button>
    </>
  );
};

export default MapAddOns;
