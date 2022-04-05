import request from 'graphql-request';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import React, { useMemo } from 'react';
import Footer from '../../components/common/Footer';
import Navbar from '../../components/common/Navbar';
import GRAPHQL_QUERIES from '../../services/GraphQLQueries';
import ResultList from '../../components/results/ResultList';
import parse from 'html-react-parser';

interface CategoryPageProps {
  categoryData: { [any: string]: any };
}

function CategoryPage({ categoryData }: CategoryPageProps) {
  const fullHead = useMemo(() => {
    return parse(categoryData?.seo.fullHead);
  }, [categoryData]);

  return (
    <>
      <Head>
        <title>{categoryData.seo.title}</title>
        {fullHead}
      </Head>
      <Navbar />
      <div className="max-w-[1240px] mx-auto h-full">
        <div className="my-8 text-center">
          <div className="text-[#919191] font-semibold text-xs uppercase -mb-2">
            category
          </div>
          <h1 className="text-[41px] text-[#111111] font-black">
            {categoryData.name}
          </h1>
        </div>

        <ResultList
          query={(offset: number) =>
            GRAPHQL_QUERIES.GET_CATEGORY_POSTS(categoryData.databaseId, offset)
          }
        />
      </div>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { categories } = await request(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    GRAPHQL_QUERIES.GET_ALL_CATEGORIES
  );
  const paths = categories.nodes.map((category: { [any: string]: any }) => ({
    params: { category: category.slug },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const categorySlug = params!.category as string;

  const { categories } = await request(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    GRAPHQL_QUERIES.GET_CATEGORY_DATA(categorySlug)
  );
  console.log(
    '🚀 ~ file: index.tsx ~ line 68 ~ constgetStaticProps:GetStaticProps= ~ categories',
    categories
  );

  if (categories.nodes.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      categoryData: categories.nodes[0],
    },
    revalidate: 60,
  };
};

export default CategoryPage;
