import { InferGetStaticPropsType, NextPage } from 'next';
import { createAnonymousTakeshapeApolloClient } from '@/utils/takeshape';
import { gql } from '@apollo/client';
import { HomepageQueryResponse } from '@/types/takeshape';

const HomepageQuery = gql`
  query HomepageQuery {
    homepage: getHomepage {
      greeting
    }
  }
`;

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ homepage }) => {
  return <h1 className="text-3xl font-bold underline">{homepage?.greeting ?? 'Coming Soon!!!'}</h1>;
};

const apolloClient = createAnonymousTakeshapeApolloClient();

export const getStaticProps = async () => {
  const { data, error } = await apolloClient.query<HomepageQueryResponse>({
    query: HomepageQuery
  });
  return {
    revalidate: 60,
    props: data
  };
};

export default Home;
