import React from 'react';
import TextButton from '../common/button/TextButton';

interface MapAddOnsProps {
  map: React.MutableRefObject<any>;
}

const MapAddOns = ({ map }: MapAddOnsProps) => {
  return (
    <div className='mt-2 flex justify-center items-center'>
      <TextButton
        onClick={() => map.current.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC)}
        text='실시간 교통상황'
        />
      <TextButton
        onClick={() => map.current.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADMAP)}
        text='일반도로'
      />
      <TextButton
        onClick={() => map.current.addOverlayMapTypeId(window.kakao.maps.MapTypeId.SKYVIEW)}
        text='스카이뷰'
      />
    </div>
  );
};

export default MapAddOns;
