import Image from "next/image";
import React, { useCallback, useState } from "react";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet} from "@/gql/graphql";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Link from "next/link";
import { useCurrentUser } from "@/hooks/user";
import { useDeleteTweet } from "@/hooks/tweet";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  const { user: currentUser } = useCurrentUser();

  const {mutateAsync} = useDeleteTweet();

  const deleteTweet = useCallback(async () => {

    await mutateAsync({ authorId: data.author?.id as string, tweetId: data.id });

  }, [mutateAsync]);


  return (
    <div className="border border-t-0 border-l-0 border-r-0 border-slate-700 w-full h-max flex p-3">
      <div className=" flex w-full">
        <div className="w-[13%] sm:w-[10%]">
          {data.author?.profileImageURL && (
            <Image
              alt="User Image"
              height={40}
              width={40}
              src={data.author?.profileImageURL}
              className="rounded-full"
            />
          )}
        </div>
        <div className="w-[87%] sm:w-[90%] pl-2 sm:pl-0 md:px-2 lg:px-1">
          <div className="mb-2">
            <div className="flex justify-between ">
              <h5 className="text-[12px] sm:text-[16px] font-semibold  ">
                <Link href={`/${data.author?.id}`}>
                  {data.author?.firstName} {data.author?.lastName}
                </Link>
              </h5>
              {currentUser?.id === data.author?.id && (
                <Popup contentStyle={{background: '	#000000'}} overlayStyle={{background: 'rgba(0,0,0,0.4)'}} trigger={<button>...</button>} position="right center">

                <button className=" text-red-600 " onClick={deleteTweet}>Delete</button>
              </Popup>
              )}

            </div>
            <p className="text-[11px] sm:text-[12px]">{data.content}</p>
          </div>
          {data.imageURL && (
            <Image src={data.imageURL} alt="image" width={400} height={400} />
          )}
          <div className="flex justify-between w-[95%]">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
