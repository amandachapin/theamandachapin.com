import { InferGetStaticPropsType, NextPage } from 'next';
import { createAnonymousTakeshapeApolloClient } from '@/utils/takeshape';
import { gql } from '@apollo/client';
import { HomepageQueryResponse } from '@/types/takeshape';
import { getImageUrl } from '@takeshape/routing';
import { isDefined } from '@/utils/types';

const HomepageQuery = gql`
  query HomepageQuery {
    homepage: getHomepage {
      greeting
      splashImages {
        path
      }
    }
  }
`;

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: NextPage<HomeProps> = ({ homepage }) => {
  const images = homepage?.splashImages?.filter(isDefined) ?? [];
  return (
    <div className="container mx-auto">
      <h1 className="mt-6 text-3xl font-bold underline">{homepage?.greeting ?? 'Coming Soon!!!'}</h1>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <div key={image.path} className="group relative">
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
              <img
                src={getImageUrl(image.path)}
                alt=""
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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
