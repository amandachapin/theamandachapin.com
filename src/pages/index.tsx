import { InferGetStaticPropsType, NextPage } from 'next';
import { createAnonymousTakeshapeApolloClient } from '@/utils/takeshape';
import { gql } from '@apollo/client';
import { HomepageQueryResponse } from '@/types/takeshape';
import { getImageUrl } from '@takeshape/routing';
import Image from 'next/image';

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
  const imagePath = homepage?.splashImages?.[0]?.path;
  const imageUrl = imagePath && getImageUrl(imagePath);
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0">
        {imageUrl && <Image src={imageUrl} alt="background image" fill style={{ objectFit: 'cover' }} />}
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-bold text-gray-200 uppercase">Enter</h1>
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
