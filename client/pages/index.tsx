import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import FeedCard from "@/components/FeedCard";
import { useCallback, useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/user";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import Twitterlayout from "@/components/FeedCard/Layout/TwitterLayout";
import { GetServerSideProps } from "next";
import { graphqlClient } from "@/clients/api";
import {
  getAllTweetsQuery,
  getSignedURLForTweetQuery,
} from "@/graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";

interface HomeProps {
  tweets?: Tweet[];
}

export default function Home(props: HomeProps) {
  const { user } = useCurrentUser();
  const { mutateAsync } = useCreateTweet();
  const { tweets = props.tweets as Tweet[] } = useGetAllTweets();

  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handelInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      console.log(input.files);

      const file: File | null | undefined = input.files?.[0];

      if (!file) return;

      const { getSignedURLForTweet } = await graphqlClient.request(
        getSignedURLForTweetQuery,
        {
          imageName: file.name,
          imageType: file.type,
        }
      );

      if (getSignedURLForTweet) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Upload Completed", { id: "2" });

        const url = new URL(getSignedURLForTweet);
        const myFilePath = `${url.origin}${url.pathname}`;
        setImageURL(myFilePath);
      }
    };
  }, []);
  const handelSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handelInputChangeFile(input);

    input.addEventListener("change", handlerFn);
    input.click();
  }, [handelInputChangeFile]);

  const handelCreateTweet = useCallback(async () => {
    if (!content) return;

     mutateAsync({ content: content, imageURL });
    setContent("");
    setImageURL("");
  }, [content, mutateAsync, imageURL]);
 

  return (
    // mid
    <div>
      <Twitterlayout>
        <div>
          <h1 className="font-bold text-xl p-2" >Home</h1>
          <div className=" p-3 border border-l-0 border-r-0 border-slate-700">
            <div className="flex w-full" >
              <div className="sm:w-[10%]">
                {user?.profileImageURL && (
                  <Image
                    className="rounded-full hidden sm:block"
                    alt="User Image"
                    height={50}
                    width={50}
                    src={user?.profileImageURL}
                  />
                )}
              </div>
              <div className="w-full sm:w-[90%]">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's happening?"
                  rows={3}
                  className=" w-full resize-none bg-transparent text-xl px-3 border-b border-slate-700"
                ></textarea>
                {imageURL && (
                  <Image
                    src={imageURL}
                    alt="Tweet Image"
                    className="cursor-pointer"
                    height={400}
                    width={400}
                  />
                )}
                <div className="mt-2 flex justify-between items-center">
                  <BiImageAlt onClick={handelSelectImage} className="text-xl" />
                  <button
                    onClick={handelCreateTweet} style={  content ==""?{backgroundColor:""}: {backgroundColor:"#2596be",color:"white"}}
                  
                    className="bg-blue-600/50 text-white/25 font-semibold text-sm py-1 sm:py-2 px-4 rounded-full "
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div >
        {tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
        </div>
      </Twitterlayout>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const allTweet = await graphqlClient.request(getAllTweetsQuery);
  return {
    props: { tweets: allTweet.getAllTweets as Tweet[] },
  };
};
