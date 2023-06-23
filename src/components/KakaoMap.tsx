/* global kakao */
import { ChangeEvent,FormEvent,useCallback,useEffect,useRef,useState } from 'react';
import './KaKaoMap.css';
import axios from 'axios';
import useConvertLatLng from '../hooks/useConvertLatLng';
import useTime from '../hooks/useTime';
import Weather from './weather/Weather';
import InfowindowSkeleton from './UI/InfowindowSkeleton';
import RegionNavigation from './kakaomap/RegionNavigation';
import PlacesItem from './kakaomap/PlacesItem';
import SearchForm from './kakaomap/SearchForm';
import GeneralPagination from './kakaomap/GeneralPagination';
import BeachItem from './kakaomap/BeachMarkers';
import BeachPagination from './kakaomap/BeachPagination';
import MapAddOns from './kakaomap/MapAddOns';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, BEACH_URL, KAKAO_MAP_KEY, WEATHER_API_KEY } from '../constants/api';
import { MiniWeatherDetailsTypes, OceansBeachTypes, ResponseDataTypes, WeatherDetailsTypes } from '../types/interface/weather';
const { kakao } = window;

const KakaoMap = () => {
  const [keywordValue, setKeywordValue] = useState('');
  const [zoomLevel, setZoomLevel] = useState(7);
  const [placeMarkers, setPlaceMarkers] = useState<any[]>([]);
  const [geoSearchValue, setGeoSearchValue] = useState<any>();
  const [isOceansBeachSearch, setIsOceansBeachSearch] = useState<boolean>(false);
  const [minMaxTemp, setMinMaxTemp] = useState<ResponseDataTypes[]>([]);
  const [places, setPlaces] = useState<any>([]);
  const [isGeneralSearch, setIsGeneralSearch] = useState<boolean>(false);
  const [oceansBeachTotalCount, setOceansBeachTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherInMiniPopup, setWeatherInMiniPopup] =useState<MiniWeatherDetailsTypes | null>(null);
  const [weather, setWeather] = useState<WeatherDetailsTypes>({
    pop: [],
    reh: [],
    pcp: [],
    tmp: [],
    sky: [],
  });
  const [sido, setSido] = useState('');
  const calcLatLng = useConvertLatLng();
  const { today, nowNoticeTime } = useTime();

  const mapRef = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const ps = useRef<any>(null);
  const geo = useRef<any>(null);
  const paginationRef = useRef<any>(null);
  const customInfo = useRef<any>(null);
  const navigate = useNavigate();

  const keywordChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeywordValue(e.currentTarget.value);
  },[keywordValue]);

  
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    setIsGeneralSearch(true);
    setIsOceansBeachSearch(false);
    e.preventDefault();
    const searchValue = keywordValue;
    setGeoSearchValue(searchValue);
    setKeywordValue('');
    setPlaceMarkers([]);

    geo.current.addressSearch(searchValue, (result: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {

        new Promise((resolve, reject) => {
          resolve(calcLatLng(Number(result[0].x), Number(result[0].y)));
        }).then((resolve: any) => {
          axios.get(
              `${BEACH_URL}1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${WEATHER_API_KEY}&numOfRows=1000&pageNo=1&base_date=${today}&base_time=${nowNoticeTime}00&nx=${resolve.x}&ny=${resolve.y}&dataType=json`
            )
            .then((response) => {
              const result: ResponseDataTypes[] = response.data.response.body.items.item;
              
              const sortResult = result.reduce((acc:WeatherDetailsTypes, cur) => {
                if(cur.category === 'POP') acc.pop.push(cur);
                if(cur.category === 'REH') acc.reh.push(cur);
                if(cur.category === 'SKY') acc.sky.push(cur);
                if(cur.category === 'PCP') acc.pcp.push(cur);
                if(cur.category === 'TMP') acc.tmp.push(cur);
                
                return acc;
              },{pop:[], reh:[], sky:[], pcp:[], tmp:[]})
              setWeather(() => (sortResult));

              const sortCelcius = result.reduce((acc:ResponseDataTypes[],cur) => {    
                if (cur.category === 'TMN' || cur.category === 'TMX') {
                  acc.push(cur);
                }
                return acc
              },[]);
              setMinMaxTemp(sortCelcius);

              for (let i = 0; i < placeMarkers.length; i++) {
                placeMarkers[i].setMap(null);
              }
              ps.current.keywordSearch(
                searchValue,
                (data: any, status: any, pagination: any) => {
                  if (status === window.kakao.maps.services.Status.OK) {
                    let bounds = new window.kakao.maps.LatLngBounds();

                    setPlaces(data);
                    paginationRef.current = pagination;
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
    if (!weatherInMiniPopup) return;
    setPlaceMarkers((prev) => [...prev, marker]);

    let imageSrc = 'https://i.pinimg.com/originals/d9/7f/ea/d97feac57bebf6007994f6a6286d005b.png';
    let imageSize = new window.kakao.maps.Size(45, 50);
    let imageOption = { offset: new window.kakao.maps.Point(15, 45) };
    let markerImage = new window.kakao.maps.MarkerImage(imageSrc,imageSize,imageOption);
    let marker = new window.kakao.maps.Marker({
      map: map.current,
      position: new window.kakao.maps.LatLng(place.y, place.x),
      clickable: true,
      image: markerImage,
    });

    let hoverInfowindow = new window.kakao.maps.CustomOverlay({
      content: /*html*/ `
        <div class="w-fit p-4 h-full text-center rounded-lg bg-slate-600 text-white">
          <p>${place.place_name}</p>
          <p class="text-xs py-2">${place.address_name}</p>
        </div>
        
        `,
      position: new window.kakao.maps.LatLng(place.y, place.x),
      xAnchor: 0.6,
      yAnchor: 1.5,
    });

    window.kakao.maps.event.addListener(marker, 'mouseover', () => {
      hoverInfowindow.setMap(map.current);
    });
    window.kakao.maps.event.addListener(marker, 'mouseout', () => {
      hoverInfowindow.setMap(null);
    });
    window.kakao.maps.event.addListener(marker, 'click', () =>
      markerClickHandler(place, marker, 'general', '')
    );
  };
  
  const markerClickHandler = (place: any,marker: any,type: string,sido: string) => {
    setIsLoading(true);
    setWeatherInMiniPopup({
      pop: [],
      pcp: [],
      tmp: [],
    });
    new Promise((resolve) => { resolve( calcLatLng( Number(place.x), Number(place.y) ) )})
      .then((resolve: any) =>
        axios.get(`${BEACH_URL}1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${WEATHER_API_KEY}&numOfRows=80&pageNo=1&base_date=${today}&base_time=${nowNoticeTime}00&nx=${resolve.x}&ny=${resolve.y}&dataType=json`))
      .catch((err) => {
        setIsLoading(false);
        console.error(err)
      })
      .then(async (resolve: any) => {
        let filteredOceansWaterQuality;
        let filteredOceansSandQuality;
        try {
          const getSido = sido;
          const response: any = await axios.get(
            `${BASE_URL}OceansBeachSeawaterService/getOceansBeachSeawaterInfo?pageNo=1&numOfRows=1500&resultType=json&SIDO_NM=${getSido}&RES_YEAR=2016&ServiceKey=${WEATHER_API_KEY}&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY`);
          const responseData = response.data.getOceansBeachSeawaterInfo.item;
          filteredOceansWaterQuality = responseData
            .filter((item: any) => item.sta_nm === place.sta_nm)
            .pop();
        } catch (err) {
          console.error(err);
        }
        try {
          const getSido = sido;
          const response: any = await axios.get(`${BASE_URL}OceansBeachSandService/getOceansBeachSandInfo?pageNo=1&numOfRows=1000&resultType=json&SIDO_NM=${getSido}&RES_YEAR=2016&ServiceKey=${WEATHER_API_KEY}&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY`);
          const responseData = response.data.getOceansBeachSandInfo.item;
          filteredOceansSandQuality = responseData
            .filter((item: any) => item.sta_nm === place.sta_nm)
            .pop();
        } catch (error) {}
        
        const weatherInThisPlace: ResponseDataTypes[] = resolve.data.response.body.items.item;
        const tmp: any = [];
        const pcp: any = [];
        weatherInThisPlace.map((item: ResponseDataTypes) => {
          if (item.category === 'PCP') {
            pcp.push(item);
          }
          if (item.category === 'TMP') {
            tmp.push(item);
          }
        });

        if (tmp.length > 5) {
          tmp.length = 5;
          pcp.length = 5;
        }
        let iwContent;
        if (type === 'general') {
          iwContent = /*jsx */ `
        <div class=" w-80 h-96 flex flex-col items-center justify-start gap-4 p-6 bg-sky-900 text-white rounded-md">
        <button id="cb" class="absolute top-0 right-0 cursor-pointer p-2">X</button>
          <p class="text-center font-bold px-4 flex-[3] w-72">${
            place.place_name
          }</p>
        <p class="text-xs font-semibold text-slate-500 flex-[2]">${
          place.address_name
        }</p>
        <p class="text-xs text-gray-400" class="flex-1">${
          place.place_phone || '전화번호가 등록되지 않은 상호입니다'
        }</p>
        <a href=${
          place.place_url
        } target="_blank" class="flex-[2] text-blue-400 hover:text-rose-400">카카오 맵으로 이동</a>
        <div class="flex flex-col items-center justify-center">
          <h3 class="truncate text-xs py-4">오늘의 <span class="font-bold">${
            place.place_name
          }</span> 날씨</h3>
        <div class="flex flex-row justify-start items-center">
          <div class="flex justify-center items-center w-10 h-8"><img src="https://e7.pngegg.com/pngimages/473/569/png-clipart-graphy-clock-clock-icon-angle-number-thumbnail.png" alt="thermometer" class="w-4 mx-auto" /></div>
        ${tmp
          .map((item: ResponseDataTypes) => {
            return `<div class=" max-w-[40px] min-h-[32px] px-2 text-xs flex items-center justify-start"><span class="font-bold">${item.fcstTime.substr(
              0,
              2
            )}</span>시</div>`;
          })
          .join('')}
        </div>
        <div class="flex flex-row justify-start items-center">
          <div class="flex justify-center items-center w-10 h-8"><img src="https://upload.wikimedia.org/wikipedia/en/d/d5/Thermometer_icon.png" alt="thermometer" class="w-4 mx-auto" /></div>
        ${tmp
          .map((item: ResponseDataTypes) => {
            return `<div class=" max-w-[40px] min-h-[32px] px-2 text-xs flex items-center justify-start"><span class="font-bold">${item.fcstValue}</span>도</div>`;
          })
          .join('')}
        </div>
        <div class="flex flex-row justify-start items-center">
          <div class="flex justify-center items-center w-10 h-8"><img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png" alt="thermometer" class="w-4 mx-auto" /></div>
        ${pcp.map((item: ResponseDataTypes) => {
            return `<div class=" max-w-[40px] min-h-[32px] px-2 text-[10px] flex items-center justify-start"><span class="font-bold">${
              item.fcstValue === '강수없음'
                ? '맑음'
                : item.fcstValue.split('.')[0] + 'mm'
            }</span></div>`;
          })
          .join('')}
        </div>
        </div>
      </div>
        `;
        }
        function closeOverlay() {
          customInfo.current.setMap(null);
        }
        let min = Math.ceil(1);
        let max = Math.floor(20);
        const nb = Math.ceil(Math.random() * (max - min));
        
        if (type === 'beach') {
          iwContent = /*html */ `
          <div class="relative w-fit max-h-fit flex flex-col items-center justify-start gap-4 px-6 py-2 bg-sky-900 text-white rounded-md md:min-w-[320px]">
          <button id="cb" class="absolute top-5 right-3 cursor-pointer p-1 border border-white rounded-md">❌</button>
            <p class="text-center font-bold flex-[3] w-full border-transparent border border-b-white py-4">
            ${place.sta_nm} 해수욕장
            </p>
         
          <p><img class="rounded-full w-40 h-40" src="/beach${nb}.jpg" alt="" /></p>
          <a
            href=${place.link_addr}
            target="_blank"
            rel="noopener noreferrer"
            class="flex-[2] text-blue-400 hover:text-rose-400">해당 사이트로 이동</a>
          <p class="text-xs font-semibold text-rose-500 flex-1">가까운 보건소 전화번호</p>
          <p class="text-xs text-gray-400" class="flex-1">${place.link_tel || '전화번호 미등록 해수욕장입니다.'}</p>
  
    <div class="border-b border-gray-200 ">
    <ul class="flex justify-center items-center -mb-px text-sm font-medium text-center">
      <li class="mr-2 overlay-tabs--list active cursor-pointer" data-tab="tab1">
        <a id="weather" class="overlay-tab--btn inline-flex p-2 pb-1  text-green-600 hover:text-yellow-300 group" >날씨</a>
      </li>
      <li class="mr-2 overlay-tabs--list cursor-pointer " data-tab="tab2">
        <a id="water" class="overlay-tab--btn inline-flex p-2 pb-1  rounded-t-lg border-b-2 border-transparent hover:text-yellow-300 text-blue-600 group">수질</a>
      </li>
      <li  class="mr-2 overlay-tabs--list cursor-pointer " data-tab="tab3">
        <a id="sand" class="overlay-tab--btn inline-flex p-2 pb-1 rounded-t-lg border-b-2 border-transparent  hover:text-yellow-300 text-yellow-800 group">모래</a>
      </li>
      <li class="mr-2 overlay-tabs--list cursor-pointer " data-tab="tab4">
        <a id="review" class="overlay-tab--btn inline-flex p-2 pb-1 rounded-t-lg border-b-2 border-transparent  hover:text-yellow-300 text-rose-500 group">후기</a>
      </li>
    </ul>

    <div id="tab1" class="overlay-content flex-col items-center justify-center target">
            <h3 class="truncate text-xs py-2">오늘의 <span class="font-bold">${
              place.sta_nm
            }</span>해수욕장 날씨</h3>
          <div class="flex flex-row justify-start items-center">
            <div class="flex justify-center items-center w-10 h-8"><img src="https://e7.pngegg.com/pngimages/473/569/png-clipart-graphy-clock-clock-icon-angle-number-thumbnail.png" alt="thermometer" class="w-4 mx-auto" /></div>
          ${tmp
            .map((item: ResponseDataTypes) => {
              return `<div class=" max-w-[40px] min-h-[32px] px-2 text-xs flex items-center justify-start"><span class="font-bold">${item.fcstTime.substr(
                0,
                2
              )}</span>시</div>`;
            })
            .join('')}
          </div>
          <div class="flex flex-row justify-start items-center">
            <div class="flex justify-center items-center w-10 h-8"><img src="https://upload.wikimedia.org/wikipedia/en/d/d5/Thermometer_icon.png" alt="thermometer" class="w-4 mx-auto" /></div>
          ${tmp
            .map((item: ResponseDataTypes) => {
              return `<div class=" max-w-[40px] min-h-[32px] px-2 text-xs flex items-center justify-start"><span class="font-bold">${item.fcstValue}</span>도</div>`;
            })
            .join('')}
          </div>
          <div class="flex flex-row justify-start items-center">
            <div class="flex justify-center items-center w-10 h-8"><img src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather07-512.png" alt="thermometer" class="w-4 mx-auto" /></div>
          ${pcp
            .map((item: ResponseDataTypes) => {
              return `<div class=" max-w-[40px] min-h-[32px] px-2 text-xs flex items-center justify-start"><span class="font-bold">${
                item.fcstValue === '강수없음'
                  ? '맑음'
                  : item.fcstValue.split('.')[0] + 'mm'
              }</span></div>`;
            })
            .join('')}
          </div>
          </div>
      <div id="tab2" class="overlay-content" >
      
      <div class="grid grid-flow-col grid-cols-3 mt-2">
      <div class="col-span-2 w-full relative"> ${filteredOceansWaterQuality?.res_yn === '적합' ? "<img class='w-28 h-24' src='/approved.png' />" : '여행금지!'}
      </div>
      <div class="col-span-1 flex flex-col justify-center items-start mx-auto mt-4">
        <div>
        <span class="text-xs font-bold">대장균: ${filteredOceansWaterQuality?.res1}</span>
        </div>
        <div>
        <span class="text-xs font-bold">장구균: ${filteredOceansWaterQuality?.res2}</span>
        </div>
        <div>
        <span class="text-xs font-bold">적합여부: ${filteredOceansWaterQuality?.res_yn}</span>
        </div>
      </div>
    </div>
  </div>
      
      <div id="tab3" class="overlay-content" >

      
        <div class="flex flex-col justify-center items-center w-full text-xs font-bold my-4 gap-2">
          <div>카드뮴: ${filteredOceansSandQuality.res1}</div>
          <div>비소: ${filteredOceansSandQuality.res2}</div>
          <div>수은: ${filteredOceansSandQuality.res3}</div>
          <div>납: ${filteredOceansSandQuality.res4}</div>
          <div>6가크롬: ${filteredOceansSandQuality.res5}</div>
        </div>
      
    </div>
    <div id="tab4" class="overlay-content" >
      <button class="w-full h-16 flex items-center justify-center font-bold hover:bg-orange-500 hover:text-white transition-all duration-150 mt-2 border border-white rounded-md" id="review-button">후기 작성하러 가기</button></div>
    </div>
  </div>
          `;
        }

        customInfo.current = new window.kakao.maps.CustomOverlay({
          content: iwContent,
          position: marker.getPosition(),
          xAnchor: 0.5,
          yAnchor: 0.5,
        });
        map.current.setCenter(marker.getPosition());
        customInfo.current.setMap(map.current);

        const overlayCloseButton = document.getElementById('cb');
        overlayCloseButton?.addEventListener('click', closeOverlay);

        const overlayTabsList = document.querySelectorAll(
          '.overlay-tabs--list'
        );
        const overlayTabsContent =
          document.querySelectorAll('.overlay-content');
        const goToReviewButton = document.getElementById('review-button');

        goToReviewButton?.addEventListener('click', () => {
          navigate(`/beaches/${place.sta_nm}`);
          // location.href = `${DEPLOY_URL}/beaches/${encodeURIComponent(place.sta_nm)}`;
        });

        overlayTabsList.forEach((item) => {
          item.addEventListener('click', (item: any) => {
            const tabTarget = item.currentTarget;
            const target = tabTarget.dataset.tab;
            overlayTabsList.forEach((list) => {
              list.classList.remove('active');
            });
            overlayTabsContent.forEach((target) => {
              target.classList.remove('target');
            });
            document.querySelector('#' + target)?.classList.add('target');
            tabTarget.classList.add('active');
          });
        });

        setIsLoading(false);
      });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&libraries=services,clusterer,drawing&autoload=false`;
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
        let control = new window.kakao.maps.ZoomControl();
        map.current.addControl(
          control,
          window.kakao.maps.ControlPosition.TOPRIGHT
        );

        ps.current = new window.kakao.maps.services.Places();
        geo.current = new window.kakao.maps.services.Geocoder();
        customInfo.current = new window.kakao.maps.CustomOverlay({
          content: 'Hi Welcome!',
          position: new window.kakao.maps.LatLng(33.450701, 126.570667),
          xAnchor: 0.5,
          yAnchor: 1,
        });
      });
    };

    return () => {
      script.remove();
    };
  }, []);

  const sidoClickHandler = async (sido: string, currentPage = 1) => {
    setSido(sido);
    setIsGeneralSearch(false);
    setIsOceansBeachSearch(true);
    try {
      const response = await axios.get(
        `${BASE_URL}OceansBeachInfoService/getOceansBeachInfo?pageNo=${currentPage}&numOfRows=15&resultType=json&SIDO_NM=${sido}&ServiceKey=${WEATHER_API_KEY}&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY`
      );
      for (let i = 0; i < placeMarkers.length; i++) {
        placeMarkers[i].setMap(null);
      }
      const oceansBeachArray: OceansBeachTypes[] = [];

      response.data.getOceansBeachInfo.item.map((item: any) => {
        const obj = {
          ...item,
          x: item.lon,
          y: item.lat,
        };
        oceansBeachArray.push(obj);
      });
      setOceansBeachTotalCount(response.data.getOceansBeachInfo.totalCount);

      setPlaces(oceansBeachArray);

      let bounds = new window.kakao.maps.LatLngBounds();
      let imageSrc =
        'https://velog.velcdn.com/images/tchaikovsky/post/ada07148-1190-4dd6-bd2c-e7a22e2237f8/image.png';
      let imageSize = new window.kakao.maps.Size(45, 50);
      let imageOption = { offset: new window.kakao.maps.Point(15, 45) };
      let markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      oceansBeachArray.map((item) => {
        let marker = new window.kakao.maps.Marker({
          map: map.current,
          position: new window.kakao.maps.LatLng(item.y, item.x),
          clickable: true,
          image: markerImage,
        });

        setPlaceMarkers((prev) => [...prev, marker]);
        marker.setMap(map.current);
        bounds.extend(new window.kakao.maps.LatLng(item.y, item.x));
        window.kakao.maps.event.addListener(marker, 'click', () =>
          markerClickHandler(item, marker, 'beach', sido)
        );

        let hoverInfowindow = new window.kakao.maps.CustomOverlay({
          content: /* jsx */ `
            <div class="w-fit text-center rounded-lg bg-sky-400 text-white p-4 shadow-sm shadow-white">
            <p class="font-bold text-xl py-1">${item.sta_nm}해수욕장</p>
            <p class="text-xs font-bold pt-1">${item.gugun_nm}</p>
            <p class="text-xs font-bold pt-1">해변의 길이: ${
              item.beach_len ? item.beach_len + 'M' : '정보 없음'
            }</p>
            <p class="text-xs font-bold pt-1">해변의 너비: ${
              item.beach_wid ? item.beach_wid + 'M' : '정보 없음'
            }</p>
            </div>`,
          position: new window.kakao.maps.LatLng(item.y, item.x),
          xAnchor: 0.5,
          yAnchor: 1.5,
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          hoverInfowindow.setMap(map.current);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          hoverInfowindow.setMap(null);
        });

      });
      map.current.setBounds(bounds);
    } catch (error) {

      console.error(error);
    }
  };

  return (
    <>
      <h2 className="font-bold  py-2 rounded-tl-lg rounded-tr-lg  border-b shadow-lg shadow-gray-400">
        지역별 해수욕장 찾기
      </h2>
      <ul className="w-full container flex flex-wrap justify-center md:flex-nowrap flex-row md:justify-between md:items-center gap-2 py-2 md:border mx-auto p-4a md:rounded-bl-lg md:rounded-br-lg bg-opacity-60 shadow-lg shadow-gray-400">
        <RegionNavigation sidoClickHandler={sidoClickHandler} />
      </ul>

      <div className="relative">
        {isLoading && <InfowindowSkeleton />}

        <div className="relative h-[600px] mx-auto z-0">
          <div className="">
            <div ref={mapRef} className="h-[580px] mx-auto mt-60 xs:mt-0"></div>
            {/* position:absolute;top:0;left:0;bottom:0;width:250px;margin:10px 0 30px 10px;padding:5px;overflow-y:auto;background:rgba(255, 255, 255, 0.7);z-index: 1;font-size:12px;border-radius: 10px; */}
            <div
              id="menu_wrap"
              className=" -top-60 xs:top-0 w-full xs:w-[240px] h-[200px] xs:h-[90%] xs:bg-opacity-60 bg-white absolute inset-0 mt-[10px] mb-[30px] xs:ml-[10px] p-[5px] overflow-y-auto z-10 text-[12px] border rounded-lg"
            >
              <div className="option md:relative ">
                <SearchForm
                  submitHandler={submitHandler}
                  keywordValue={keywordValue}
                  keywordChangeHandler={keywordChangeHandler}
                />

                {/* placesList - 검색결과 목록 */}
                {isGeneralSearch && (
                  <>
                    <ul id="placesList" className="">
                      {places.map((place: any, index: number) => (
                        <PlacesItem
                          key={'markerbg marker_' + index + 1}
                          index={index}
                          place={place}
                        />
                      ))}
                    </ul>
                    <div id="pagination">
                      {!isOceansBeachSearch &&
                        Array(paginationRef.current?.last)
                          .fill(0)
                          .map((_, index) => (
                            <GeneralPagination
                              key={index}
                              index={index}
                              placeMarkers={placeMarkers}
                              paginationRef={paginationRef}
                            />
                          ))}
                    </div>
                  </>
                )}

                {isOceansBeachSearch && (
                  <ul id="placesList">
                    {places.map((place: any, index: number) => (
                      <BeachItem
                        key={Math.random() + index}
                        kakao={kakao}
                        place={place}
                        index={index}
                        map={map}
                      />
                    ))}
                  </ul>
                )}

                <div
                  id="pagination"
                  className="flex justify-center gap-4 text-xs font-bold border border-t-black pt-2"
                >
                  {isOceansBeachSearch &&
                    Array(Math.ceil(oceansBeachTotalCount / 15))
                      .fill(0)
                      .map((_, index) => (
                        <BeachPagination
                          key={sido + index}
                          sido={sido}
                          index={index}
                          sidoClickHandler={sidoClickHandler}
                        />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex justify-center items-center">
          <MapAddOns map={map} />
        </div>
        <div>
          {geoSearchValue && !isOceansBeachSearch && (
            <Weather
              minMaxTemp={minMaxTemp}
              geoSearchValue={geoSearchValue}
              weather={weather}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default KakaoMap;
