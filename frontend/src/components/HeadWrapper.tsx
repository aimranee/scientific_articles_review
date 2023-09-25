import Head from "next/head";
import logo from "../../public/short-logo.png";
import { type FC } from "react";
import { ChildrenProps } from "@/interfaces";

const HeadWrapper: FC<ChildrenProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>
          Paper Checker | Your all-in-one Solution for Writing Scientific
          Articles
        </title>
        <meta
          name="description"
          content="Paper checker is a platform that provides a suite of cheking tools, including a grammar checker, text summarizer, plagiarism system and detecter for vocabulary and definitions . Improve your paper scientific with our tools. Try our solution today and take your writing to the next level."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={logo.src} />
      </Head>
      {children}
    </>
  );
};

export default HeadWrapper;
