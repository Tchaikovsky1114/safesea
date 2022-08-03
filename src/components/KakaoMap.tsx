/* global kakao */
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import './KaKaoMap.css';
import axios from 'axios';
import useConvertLatLng, { RsTypes } from '../hooks/useConvertLatLng';
import useTime from '../hooks/useTime';
import Weather from './Weather';

declare global {
  interface Window {
    kakao: any;
  }
}
interface GeoTypes {
  x: number;
  y: number;
}

export interface ResponseDataTypes {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
}

const { kakao } = window;

const KakaoMap = () => {
  const [keywordValue, setKeywordValue] = useState('');
  const [zoomLevel, setZoomLevel] = useState(7);
  const [placeMarkers, setPlaceMarkers] = useState<any[]>([]);
  const [geoSearchValue, setGeoSearchValue] = useState<any>();
  const [weatherResult, setWeatherResult] = useState<ResponseDataTypes[]>([]);
  const [geoResult, setGeoResult] = useState<GeoTypes>({ x: 0, y: 0 });
  const [minMaxTemp, setMinMaxTemp] = useState<ResponseDataTypes[]>([]);
  const calcLatLng = useConvertLatLng();
  const { today, nowNoticeTime } = useTime();

  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const ps = useRef<any>(null);
  const geo = useRef<any>(null);
  const keywordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeywordValue(e.currentTarget.value);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchValue = keywordValue;
    setGeoSearchValue(searchValue);
    setKeywordValue('');
    setPlaceMarkers([]);
    setWeatherResult([]);
    setMinMaxTemp([]);

    geo.current.addressSearch(searchValue, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log(result);
        setGeoResult({
          x: Number(result[0].x),
          y: Number(result[0].y),
        });
        new Promise((resolve, reject) => {
          resolve(calcLatLng(Number(result[0].x), Number(result[0].y)));
        }).then((resolve: any) => {
          axios
            .get(
              `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=MyXj6g1gpARPPgQt0O5yc8MpM%2FArBXMg6GONzjmVoZoIfS4dXMP3ydfWn6IASEBNUXHxiVj9KpOidOwoSWFpBw%3D%3D&numOfRows=1000&pageNo=1&base_date=${today}&base_time=${nowNoticeTime}00&nx=${resolve.x}&ny=${resolve.y}&dataType=json`
            )
            .then((response) => {
              const result: ResponseDataTypes[] =
                response.data.response.body.items.item;

              let detailWeatherArray: ResponseDataTypes[] = [];
              let maxMinWeatherArray: ResponseDataTypes[] = [];
              result.map((item) => {
                if (
                  item.category === 'POP' ||
                  item.category === 'REH' ||
                  item.category === 'PCP' ||
                  item.category === 'POP' ||
                  item.category === 'SKY' ||
                  item.category === 'PTY'
                ) {
                  detailWeatherArray.push(item);
                }
                if (item.category === 'TMN' || item.category === 'TMX') {
                  setMinMaxTemp((prev) => [...prev, item]);
                }
              });
              console.log(detailWeatherArray);
              console.log(minMaxTemp);

              for (let i = 0; i < placeMarkers.length; i++) {
                placeMarkers[i].setMap(null);
              }
              ps.current.keywordSearch(
                searchValue,
                (data: any, status: any, pagination: any) => {
                  if (status === window.kakao.maps.services.Status.OK) {
                    let bounds = new window.kakao.maps.LatLngBounds();
                    for (let i = 0; i < data.length; i++) {
                      displayMarker(data[i]);
                      bounds.extend(
                        new window.kakao.maps.LatLng(data[i].y, data[i].x)
                      );
                    }
                    map.current.setBounds(bounds);
                  }
                }
              );
            });
        });
      }
    });
  };

  const displayMarker = (place: any) => {
    let marker = new window.kakao.maps.Marker({
      map: map.current,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
    setPlaceMarkers((prev) => [...prev, marker]);
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=ed83097570a585f3fb88ba4b8210bf27&libraries=services,clusterer,drawing&autoload=false';
    document.head.appendChild(script);
    script.onload = () => {
      if (!mapRef.current) return;

      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: zoomLevel, // 지도의 확대 레벨
          scrollwheel: false,
        };

        map.current = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴
        ps.current = new window.kakao.maps.services.Places();
        geo.current = new window.kakao.maps.services.Geocoder();

        let infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        // marker
        let imageSrc =
          'https://velog.velcdn.com/images/tchaikovsky/post/ada07148-1190-4dd6-bd2c-e7a22e2237f8/image.png';
        let imageSize = new window.kakao.maps.Size(45, 50);
        let imageOption = { offset: new window.kakao.maps.Point(15, 45) };

        let markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );
      });
    };

    return () => {
      script.remove();
    };
  }, []);

  console.log(minMaxTemp);
  return (
    <>
      <div className="relative">
        <div className="">
          <div ref={mapRef} className="w-full h-[500px]"></div>
        </div>
        <div className="absolute top-0 w-[300px] h-[500px]">
          <div id="menu_wrap" className="">
            <div className="option ">
              <form onSubmit={submitHandler} autoComplete="off">
                찾는 장소를 입력해주세요
                <input
                  className="w-full border border-teal-400 h-8"
                  type="text"
                  value={keywordValue}
                  id="keyword"
                  onChange={keywordChangeHandler}
                />
                <button
                  type="submit"
                  className=" py-2  w-full hover:bg-orange-500 hover:text-white transition-all duration-200"
                >
                  검색하기
                </button>
              </form>
              <ul id="placesList" className=""></ul>
              <div
                id="pagination"
                className="flex justify-center gap-10 font-bold text-sm border border-t-black pt-2"
              ></div>
            </div>
          </div>
        </div>
        <div className=" mt-2">
          <button
            className="text-sm font-bold py-2 px-4 border border-slate-600 my-2  mr-2 hover:bg-orange-500 hover:text-white transition duration-200 hover:border-orange-500"
            onClick={() => {
              map.current.addOverlayMapTypeId(
                window.kakao.maps.MapTypeId.TRAFFIC
              );
            }}
          >
            실시간 교통상황
          </button>
          <button
            className="text-sm font-bold py-2 px-4 border border-slate-600 mt-2 mr-2 hover:bg-orange-500 hover:text-white transition duration-200 hover:border-orange-500"
            onClick={() => {
              map.current.addOverlayMapTypeId(
                window.kakao.maps.MapTypeId.ROADMAP
              );
            }}
          >
            일반지도
          </button>
          <button
            className="text-sm font-bold py-2 px-4 border border-slate-600 mt-2 mr-2 hover:bg-orange-500 hover:text-white transition duration-200 hover:border-orange-500"
            onClick={() => {map.current.addOverlayMapTypeId(window.kakao.maps.MapTypeId.SKYVIEW);}}
            >
            스카이뷰
          </button>
        </div>

        <input
          type="range"
          min="1"
          max="14"
          onChange={(e) => {
            map.current.setLevel(e.currentTarget.value, { animate: true });
          }}
        />
        <div>
          <Weather minMaxTemp={minMaxTemp} geoSearchValue={geoSearchValue} />
        </div>
      </div>
    </>
  );
};

export default KakaoMap;
