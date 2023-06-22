import { HeartIcon } from '@heroicons/react/outline';
import { HeartIcon as FullHeartIcon } from '@heroicons/react/solid';
import dayjs from 'dayjs';
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { db } from '../../../firebase';
import { useAppSelector } from '../../store/store';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import ReactStars from 'react-rating-stars-component';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {
  faStar as faEmptyStar,
  faStarHalfStroke,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Helmet } from 'react-helmet';
import BoardStatusLine from './BoardStatusLine';

let min = Math.ceil(1);
let max = Math.floor(20);
const nb = Math.ceil(Math.random() * (max - min));

const BeachItem = () => {
  const { beachId } = useParams();

  const [beachesInfo, setBeachesInfo] = useState<DocumentData>();
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState<DocumentData[]>([]);
  const [beachReview, setBeachReview] = useState<DocumentData>([]);
  const userState = useAppSelector((state) => state.user);
  const [latingAverage, setLatingAverage] = useState<number | null>(null);

  const likesHandler = async () => {
    if (!beachId || !userState.userData.email) {
      alert('로그인 후 사용 가능합니다!');
      return;
    }
    setLike((prev) => !prev);
    if (like) {
      await deleteDoc(
        doc(db, 'beaches', beachId, 'likes', userState.userData.username)
      );
      await updateDoc(doc(db, 'beaches', beachId), {
        likes: arrayRemove(userState.userData.email),
      });
    } else {
      await setDoc(
        doc(db, 'beaches', beachId, 'likes', userState.userData.username),
        {
          username: userState.userData.username,
        }
      );
      await updateDoc(doc(db, 'beaches', beachId), {
        likes: arrayUnion(userState.userData.email),
      });
    }
  };
  const fetchRating = async () => {
    if(!beachId) return;
    const querySnapshot = await getDocs(
      collection(db, 'beaches', beachId, 'posts')
    );
    let latingAvg = 0;
    let totalCount = querySnapshot.size;
    let result = 0;
    querySnapshot.forEach((doc) => {
      latingAvg += doc.data().lating;
    });
    result = latingAvg / totalCount;
    setLatingAverage(Math.round(result * 2) / 2);
  };

  useEffect(() => {
    if (!beachId) return;

    const fetchData = async () => {
      const docRef = doc(db, 'beaches', beachId);
      const docSnap = await getDoc(docRef);
      setBeachesInfo(docSnap.data());
    };
    fetchData();
  }, []);

  useEffect(() => {
    dayjs.extend(relativeTime);
    dayjs.locale('ko');
  }, []);

  useEffect(() => {
    if (!beachId) return;
    const unsubscribe = onSnapshot(
      collection(db, 'beaches', beachId, 'likes'),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, [beachId]);

  useEffect(() => {
    if (!beachId) return;
    setLike(
      likes.findIndex((like) => like.id === userState.userData.username) !== -1
    );
  },[likes]);

  useEffect(() => {
    if (!beachId) return;
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'beaches', beachId, 'posts'),
        orderBy('timestamp', 'desc')
      ),
      (snapshot) => {
        setBeachReview(snapshot.docs);
      }
    );
    return () => unsubscribe();
  }, []);
  
  useEffect(() => {
    fetchRating();
  }, []);

  return (
    <>
      <Helmet>
        <title>안전해 - {beachId} 해수욕장</title>
      </Helmet>
      <div className="w-full h-full min-h-screen">
        <div className="text-center pt-4 font-bold text-2xl flex items-center justify-center relative">
          <span className="block flex-1">{beachId} 해수욕장</span>
          {latingAverage ? (
            <div className="absolute right-4">
              <ReactStars
                count={5}
                size={8}
                isHalf={true}
                emptyIcon={<FontAwesomeIcon icon={faEmptyStar} />}
                halfIcon={<FontAwesomeIcon icon={faStarHalfStroke} />}
                filledIcon={<FontAwesomeIcon icon={faStar} />}
                activeColor="#fc6203"
                edit={false}
                value={latingAverage}
              />
            </div>
          ) : (
            <div className="absolute text-xs font-bold border p-2 right-2 hidden md:block">
              <h3>등록된 후기가 없습니다.</h3>
              <p>첫 후기를 작성하시면 평균 평점이 등록됩니다!</p>
            </div>
          )}
        </div>
        <img
          className="mx-auto w-[800px] h-[360px] object-center my-4 rounded-lg"
          src={`/beach${nb}.jpg`}
          alt={`{beachId} 해수욕장 사진`}
        />

        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center">
            {!like && (
              <HeartIcon
                className="w-6 h-6 mr-1 cursor-pointer"
                onClick={likesHandler}
              />
            )}
            {like && (
              <FullHeartIcon
                className="w-6 h-6 mr-1 fill-rose-400 cursor-pointer"
                onClick={likesHandler}
              />
            )}
            <span className="font-bold text-xs pt-2">{likes.length} likes</span>
          </div>
          {!userState.userData.email && (
            <p className="font-bold text-sm text-rose-400 mr-4 border-b pb-1 border-rose-400">
              로그인 후 글 작성이 가능합니다
            </p>
          )}
          {userState.userData.email && (
            <Link
              to={`post`}
              className="border border-transparent w-24 py-1 mb-2 font-bold bg-rose-400 text-white hover:bg-rose-400/80 text-center mr-2 rounded-lg"
            >
              글쓰기
            </Link>
          )}
        </div>
        <h3 className="text-xs font-bold text-left text-rose-500 py-4 mt-4">
          {beachId}해수욕장에서 느낀 생생한 후기를 남겨주세요!
        </h3>
        <ul className=" border-t-2 border-t-gray-200 px-4 pb-10">
          <BoardStatusLine />
          {beachReview.map((review: any, index: number) => (
            <li key={review.data().pid + index} className="py-2">
              <Link
                className="text-sm font-bold border-b-2 border-gray-200"
                to={`${review.data().pid}`}
                state={{
                  data: review.data(),
                  postTime: dayjs
                    .unix(review.data().timestamp?.seconds)
                    .fromNow(),
                }}
              >
                <div className="flex flex-row justify-between gap-2 items-baseline">
                  <div className="md:flex-[1.2] text-center hidden md:block">
                    {beachReview.length - index}
                  </div>
                  {/*  */}
                  <div className="flex-[4] md:flex-[6.5] md:text-xs truncate">
                    {review.data().title}
                  </div>
                  <div className="flex-[1.2] ml-3 text-xs text-[10px] md:flex-[1.2] md:text-xs truncate">
                    {review.data().username}
                  </div>
                  <div className="flex-[1.2] text-[10px] md:flex-[1.2] md:text-xs">
                    {dayjs.unix(review.data().timestamp?.seconds).fromNow()}
                  </div>
                  <div className="flex-[0.6] text-[10px] md:flex-[0.6] md:text-xs ">
                    {!review.data().lating.toString().split('.')[1]
                      ? review.data().lating + '.0'
                      : review.data().lating}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default BeachItem;
