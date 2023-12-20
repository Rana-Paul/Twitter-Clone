import { graphqlClient } from "@/clients/api";
import FeedCard from "@/components/FeedCard";
import Twitterlayout from "@/components/FeedCard/Layout/TwitterLayout";
import { Tweet, User } from "@/gql/graphql";
import {
  UnFollowUserMutation,
  followUserMutation,
} from "@/graphql/mutation/user";
import { getUserByIdQuery } from "@/graphql/query/user";
import { useCurrentUser, useGetUserId } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import type { NextPage, GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { userInfo } from "os";
import { useCallback, useMemo, useState } from "react";
import { BsArrowLeftShort } from "react-icons/bs";

interface ServerProps {
  userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props) => {
  const router = useRouter();
  const id = router.query.id;

  const [isDisable, setIsDisable] = useState(false);
  

  const { user: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();
  const amIFollowing = useMemo(() => {
    if (!props.userInfo) return false;
    return (
      (currentUser?.following?.findIndex(
        (el) => el?.id === props.userInfo?.id
      ) ?? -1) >= 0
    );
  }, [currentUser?.following, props.userInfo]);


    const { user = props.userInfo as User } = useGetUserId(id as string);
    



  const handelFollowUser = useCallback(async () => {
    setIsDisable(true)
    if (!props.userInfo) return;
    await graphqlClient.request(followUserMutation, { to: props.userInfo?.id });
    await queryClient.invalidateQueries(["current-user"]);
    await queryClient.invalidateQueries(["current-user-by-id"]);
    setIsDisable(false)
  }, [queryClient]);


  const handelUnFollowUser = useCallback(async () => {
    setIsDisable(true);
    if (!props.userInfo) return;
    await graphqlClient.request(UnFollowUserMutation, {
      to: props.userInfo?.id,
    });
    await queryClient.invalidateQueries(["current-user"]);
    await queryClient.invalidateQueries(["current-user-by-id"]);
    setIsDisable(false);
  }, [queryClient]);

  const handelLogoutUser = useCallback(() => {
    window.localStorage.removeItem("__twitter_token");
    router.push("/");
  }, []);


  const indexofelement: any = currentUser?.email.indexOf("@");
  return (
    <div>
      <Twitterlayout>
        <div>
          <nav className="flex w-full pb-1 mt-1 border border-r-0 border-slate-700 border-l-0 border-t-0 ">
            <BsArrowLeftShort
              onClick={() => router.back()}
              className="w-max rounded-full text-3xl ml-1 items-center hover:bg-gray-500/20"
            />
            <div className=" w-[90%] pl-3">
              <h1 className="text-[15px]">
                {props.userInfo?.firstName} {props.userInfo?.lastName}
              </h1>
              <h1 className="text-[10px] text-gray-500">
                {props.userInfo?.tweets?.length} Tweets
              </h1>
            </div>
          </nav>
          <div className=" z-[-1] h-[100px] sm:h-[150px] bg-slate-500/20 w-full font-bold text-xl sm:text-5xl justify-center items-center flex text-white/20 tracking-widest">
            COVER PIC
          </div>

          <div className="mt-[-10%] ml-3">
            {props.userInfo?.profileImageURL && (
              <Image
                className="rounded-full border-3 border-black sm:w-[18%] w-[25%]"
                src={props.userInfo?.profileImageURL}
                alt="User Image"
                width={100}
                height={100}
              />
            )}
            <div className="flex justify-between items-center px-1">
              <div>
                <h1 className="text-[13px] sm:text-[16px] font-semibold  mt-1 ">
                  {props.userInfo?.firstName} {props.userInfo?.lastName}
                </h1>
                <h6 className="text-[10px] sm:text-[12px] text-gray-500">
                  @{props.userInfo?.email.slice(0, indexofelement)}
                </h6>
              </div>
              {currentUser && (
                <>
                  {currentUser?.id !== props.userInfo?.id ? (
                    <>
                      {amIFollowing ? (
                        <button
                        disabled={isDisable}
                          onClick={handelUnFollowUser}
                          className=" text-[10px] sm:text-[12px] bg-white px-3  py-1 sm:py-2 h-fit border border-black  hover:text-white flex justify-center items-center  hover:bg-blue-500 rounded-full text-black "
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          onClick={handelFollowUser}
                          disabled={isDisable}
                          className=" text-[10px] sm:text-[12px] bg-white px-3 py-1 sm:py-2 h-fit border border-black hover:text-white  hover:bg-blue-500 rounded-full text-black  flex justify-center items-center"
                        >
                          Follow
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handelLogoutUser}
                        className=" text-[10px] sm:text-[12px] bg-white px-3  border py-1 sm:py-2 h-fit border-black hover:text-white  hover:bg-blue-500 rounded-full text-black font-semibold flex justify-center items-center"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="flex  justify-between w-[98%] mb-2">
              <div>
                <span className="text-[10px] sm:text-[13px] pr-3 text-gray-300">
                  {user?.followers?.length} followers
                </span>
                <span className="text-[10px] sm:text-[13px] pr-3 text-gray-300">
                  {user?.following?.length} following
                </span>
              </div>
            </div>
          </div>

          <div className="border border-l-0 border-r-0 border-b-0 border-slate-700">
            {props.userInfo?.tweets?.map((tweet) => (
              <FeedCard data={tweet as Tweet} key={tweet?.id} />
            ))}
          </div>
        </div>
      </Twitterlayout>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query.id as string | undefined;

  if (!id) {
    return { notFound: true, props: { userInfo: undefined } };
  }

  const userInfo = await graphqlClient.request(getUserByIdQuery, { id });

  if (!userInfo?.getUserById) {
    return { notFound: true };
  }

  return {
    props: { userInfo: userInfo.getUserById as User },
  };
};

export default UserProfilePage;
