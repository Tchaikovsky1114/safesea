import React from 'react';

interface PlacesItemProps {
  index: number;
  place: any;
}

const PlacesItem = ({ index, place }: PlacesItemProps) => {
  return (
    <li className="item">
      <span className={'markerbg marker_' + (index + 1)}></span>
      <div className="info">
        <h5>{place.place_name}</h5>
        {place.road_address_name ? (
          <>
            <span>{place.road_address_name}</span>
            <span className="jibun gray">{place.address_name}</span>
          </>
        ) : (
          <>
            <span>{place.address_name}</span>
          </>
        )}
        <span className="tel">{place.phone}</span>
      </div>
    </li>
  );
};

export default PlacesItem;
