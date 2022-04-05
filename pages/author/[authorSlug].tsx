import request from "graphql-request";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React, { useMemo } from "react";
import Footer from "../../components/common/Footer";
import Navbar from "../../components/common/Navbar";
import GRAPHQL_QUERIES from "../../services/GraphQLQueries";
import ResultList from "../../components/results/ResultList";
import parse from "html-react-parser";

interface CategoryPageProps {
  authorData: { [any: string]: any };
}

function CategoryPage({ authorData }: CategoryPageProps) {
  const fullHead = useMemo(() => {
    return parse(authorData?.seo.fullHead);
  }, [authorData]);

  return (
    <>
      <Head>
        <title>{authorData.seo.title}</title>
        {fullHead}
      </Head>
      <Navbar />
      <div className="max-w-[1240px] mx-auto h-full">
        <div className="text-center my-8">
          <div className="text-[#919191] font-semibold text-xs uppercase -mb-2">author name</div>
          <h1 className="text-[41px] text-[#111111] font-black">{authorData.name}</h1>
          <p
            className="max-w-2xl mx-auto text-xs font-medium text-gray-500 author-description"
            dangerouslySetInnerHTML={{ __html: authorData.description as string }}
          ></p>
        </div>
        <ResultList query={(offset: number) => GRAPHQL_QUERIES.GET_AUTHOR_POSTS(authorData.databaseId, offset)} />
      </div>
      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { users } = await request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!, GRAPHQL_QUERIES.GET_ALL_AUTHORS);
  const paths = users.nodes.map((author: { [any: string]: any }) => ({
    params: { authorSlug: author.slug },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const authorSlug = params!.authorSlug as string;

  const { users } = await request(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    GRAPHQL_QUERIES.GET_AUTHOR_DATA(authorSlug)
  );

  if (users.nodes.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      authorData: users.nodes[0],
    },
    revalidate: 60,
  };
};

export default CategoryPage;
