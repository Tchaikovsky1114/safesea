import React from 'react';

interface BeachItemProps {
  index: number;
  place: any;
}

const BeachItem = ({ index, place }: BeachItemProps) => {
  const beachItemClickHandler = (place:any) => {
    console.log(place)
  }
  return (
    <li key={'markerbg marker_' + index + 1} className="item" onClick={() => beachItemClickHandler(place)}>
      <span className={'markerbg marker_' + (index + 1)}></span>
      <div className="info">
        <h5>{place.sta_nm} 해수욕장</h5>
        
        <span className="jibun gray">
          {place.sido_nm} {place.gugun_nm}
        </span>
        <span className="tel">{place.phone}</span>
      </div>
    </li>
  );
};

export default BeachItem;
