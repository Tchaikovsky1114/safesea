import React from 'react';


interface PlaceTypes {
  beach_knd: string;
  beach_len: number
  beach_wid: number
  gugun_nm: string;
  lat: string;
  lon: string;
  num: number
  sido_nm: string;
  sta_nm: string;
  x:string;
  y: string;
}
interface BeachItemProps {
  index: number;
  place: PlaceTypes;
  map: any;
  kakao:any
}

const BeachItem = ({ index, place,map,kakao }: BeachItemProps) => {
  const beachItemClickHandler = (place:any) => {
    console.log(place)
    const customOverlay = new window.kakao.maps.CustomOverlay({
      map: map.current,
      clickable:true,
      content: /* html */ `<div class="customOverlay" class="font-bold text-xs p-4">${place.sta_nm} 해수욕장🔻</div>`,
      xAnchor: 0.5,
      yAnchor: 1.1,
      zIndex:3,
      position: new window.kakao.maps.LatLng(place.lat,place.lon)
    })
    customOverlay.setMap(map.current);
  }
  return (
    <li key={'markerbg marker_' + index + 1} className="item" onClick={() => beachItemClickHandler(place)}>
      <span className={'markerbg marker_' + (index + 1)}></span>
      <div className="info">
        <h5>{place.sta_nm} 해수욕장</h5>
        <span className="jibun gray">
          {place.sido_nm} {place.gugun_nm}
        </span>
      </div>
    </li>
  );
};

export default BeachItem;
