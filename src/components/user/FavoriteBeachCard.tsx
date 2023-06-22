import { Link } from 'react-router-dom'
import { BeachTypes } from './MyFavorites';
import BeachInfo from './BeachInfo';

interface Props {
  beach: BeachTypes;
  index: number;
}

function FavoriteBeachCard({beach,index}:Props) {
  return (
    <ul
    className="border p-8 bg-sky-100 rounded-md mx-auto md:min-w-[360px] w-full"
    key={beach.data().sta_nm}
  >
    <Link
      className="text-sm font-bold flex flex-col justify-center space-y-4"
      to={`/beaches/${beach.data().sta_nm}`}
    >
      <li className="text-center">{beach.data().sta_nm} 해수욕장</li>
      <li>
        <img
          className="w-24 h-24 rounded-full mx-auto"
          src={`/beach${index + 1}.jpg`}
        />
      </li>
      <BeachInfo addStyle='text-center text-sm py-2' info={beach.data().gugun_nm} text='해수욕장의 길이'>
      {beach.data().sido_nm}{' '}
      </BeachInfo>
      <BeachInfo info={beach.data().beach_len} text='해수욕장의 길이' />
      <BeachInfo info={beach.data().beach_width} text='해수욕장의 폭' />
      <BeachInfo info={beach.data().beach_tel} text='긴급전화' />
    </Link>
  </ul>
  )
}

export default FavoriteBeachCard