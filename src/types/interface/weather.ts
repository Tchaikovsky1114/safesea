export interface ResponseDataTypes {
  baseDate: string;
  baseTime: string;
  category: string;
  fcstDate: string;
  fcstTime: string;
  fcstValue: string;
}

export interface WeatherDetailsTypes {
  pop: ResponseDataTypes[];
  reh: ResponseDataTypes[];
  pcp: ResponseDataTypes[];
  tmp: ResponseDataTypes[];
  sky: ResponseDataTypes[];
}

export interface MiniWeatherDetailsTypes {
  pop: ResponseDataTypes[];
  pcp: ResponseDataTypes[];
  tmp: ResponseDataTypes[];
}

export interface OceansBeachTypes {
  num: number;
  sido_nm: string;
  sta_nm: string;
  gugun_nm: string;
  beach_wid: number;
  beach_len: string;
  beach_knd: string | null;
  link_addr: string;
  link_nm: string;
  link_tel: string;
  x: number;
  y: number;
}
export interface WeatherDetailsProps {
  forecastDate:string
  forecastCategory:string
  forecastTime:string
  forecastValue:string;
}

