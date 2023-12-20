import Image from "next/image";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import {
  BiHash,
  BiHomeCircle,
  BiImageAlt,
  BiMoney,
  BiUser,
} from "react-icons/bi";
import { SlOptions } from "react-icons/sl";
import FeedCard from "@/components/FeedCard";
import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import React from "react";
import Link from "next/link";

interface TwitterLayoutProps {
  children: React.ReactNode;
}

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const Twitterlayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const sideBarManuItem: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiHomeCircle />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <BiHash />,
        link: "/",
      },
      {
        title: "Notification",
        icon: <BsBell />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link: "/",
      },
      {
        title: "Twitter Blue",
        icon: <BiMoney />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <BiUser />,
        link: `/${user?.id}`,
      },
      {
        title: "More",
        icon: <SlOptions />,
        link: "/",
      },
    ],
    [user?.id]
  );

  const handelLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      console.log(cred);
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("Google Token Not Found");

      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Sucess");

      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries(["current-user"]);
    },
    [queryClient]
  );
  const indexofelement: any = user?.email.indexOf("@");

  return (
    <div className="w-full flex  justify-center ">
      {!user ? (
        <div className=" w-full h-screen justify-center items-center px-5 flex flex-col">
          <div className="flex  flex-row justify-center  items-center hover:text-blue-500 ">
           <BsTwitter className="mb-1 sm:block sm:justify-normal justify-center text-3xl mt-2" />
            <h1 className="mb-1 hidden sm:block sm:justify-normal justify-center text-3xl mt-2 pl-3">Twitter clone</h1>
          </div>
          <div className="p-5 border  h-[50%] w-fit sm:w-[50%] lg:w-[50%]  border-gray-600 hover:bg-slate-800/25 rounded-lg flex justify-center flex-col items-center top-0" >
            <h1 className="my-2 text-2xl">New to Twitter</h1>
            <GoogleLogin onSuccess={handelLoginWithGoogle} />
          <div className="mt-10 w-[90%] flex justify-center items-center">
            <h1>Connect, Share, Explore !</h1>  <BsTwitter className="pl-2 hidden sm:block text-2xl"/>
          </div>
          </div>
        </div>

      ) : (
        <div className="flex w-full md:w-[90%]  justify-center lg:w-[85%] ">
          {/* left */}
          <div className=" w-[20%] sm:w-[20%] h-screen sm:block flex px-2  sm:justify-normal justify-center">
            <div >
              <div >
                <BsTwitter className="hidden mb-1 sm:block sm:justify-normal justify-center text-5xl mt-2 pl-3 hover:text-blue-500 cursor-pointer" />
              </div>

              <div className="mt-16 sm:mt-0">
                <ul>
                  {sideBarManuItem.map((item) => (
                    <li key={item.title}>
                      <Link
                        className="flex text-lg sm:text-[14px] py-1 mb-3 hover:bg-slate-500/20 w-max px-2 sm:px-3 rounded-full"
                        href={item.link}
                      >
                        <span className="flex items-center justify-center pr-2">{item.icon}</span>
                        <span className="sm:block hidden items-center justify-center">{item.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-5">
                  <button className="hidden sm:block bg-[#1d9bf0] font-semibold text-sm py-1 px-6 sm:py-2 rounded-full w-[90%] hover:bg-blue-500 ">
                    Tweet
                  </button>
                  <button className="block sm:hidden bg-[#1d9bf0] font-semibold text-2xs py-2 px-3 rounded-full w-fit justify-center ">
                    <BsTwitter />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute top-2 sm:top-[90%] flex">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full "
                  src={user?.profileImageURL}
                  alt="User-Img"
                  height={40}
                  width={40}
                />
              )}

              <div className="pl-2 hidden sm:block" >
                <h3 className="text-[12px] font-semibold mt-1">{user?.firstName}{" "}{user?.lastName}</h3>
                <h6 className="text-[9px] text-gray-500">{user?.email ? "@" : " "}{user?.email.slice(0, indexofelement)}</h6>
              </div>
            </div>
          </div>
          {/* Mid */}
          <div className=" w-[90%] sm:w-[80%] md:w-[60%] h-screen border border-t-0 border-b-0 border-slate-700">
            {props.children}
          </div>
          {/* right */}
          <div className="w-[30%] lg:w-[40%] hidden md:block p-5">

            <div className="p-2 w-full bg-slate-900 rounded-lg mt-4">
              <h1 className="mt-2 text-sm lg:text-xl text-center font-bold mb-5">User you may know</h1>
              {user?.recommendedUsers?.map((el) => (
                <div className="flex items-center  lg:py-3 mt-2" key={el?.id}>
                  {el?.profileImageURL && (
                    <Image
                      src={el.profileImageURL}
                      alt="User Image"
                      className="rounded-full hidden lg:block"
                      height={50}
                      width={50}
                    />
                  )}
                  <div className="flex justify-between pl-2 w-full">
                    <div className=" text-xs lg:text-lg">{el?.firstName} {el?.lastName}
                      <div className="text-[10px] lg:text-xs text-gray-500">{user?.email ? "@" : " "}{el?.email.slice(0, indexofelement - 1)}</div>
                    </div>

                    <div className="justify-center items-center flex">
                      <Link href={`/${el?.id}`} className="bg-white ml-1 text-black text-[10px] lg:text-sm lg:px-3 px-2 lg:py-1 w-full font-semibold border border-black hover:border-white hover:text-white rounded-[25px] hover:bg-blue-500 ">View</Link>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Twitterlayout;
