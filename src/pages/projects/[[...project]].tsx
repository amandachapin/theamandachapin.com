import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType, NextPage } from 'next';
import { createAnonymousTakeshapeApolloClient } from '@/utils/takeshape';
import { gql } from '@apollo/client';
import {
  ListProjectsQueryResponse,
  ListProjectsQueryVariables,
  GetProjectQueryVariables,
  GetProjectQueryResponse
} from '@/types/takeshape';
import { getSingle } from '@/utils/types';
import Project from '@/features/project/Project';

const apolloClient = createAnonymousTakeshapeApolloClient();

const ListProjectsQuery = gql`
  query ListProjectsQuery($from: Int!, $size: Int!) {
    getProjectList(from: $from, size: $size) {
      items {
        slug
      }
      total
    }
  }
`;

const GetProjectQuery = gql`
  fragment ProjectImage on Asset {
    _id
    caption
    credit
    description
    path
    title
    uploadStatus
  }

  fragment ProjectFragment on Project {
    _id
    title
    head
    subhead
    location
    year
    description(format: html)
    featuredImage {
      ...ProjectImage
    }
    gallery {
      ...ProjectImage
    }
    slug
    tags {
      _id
      name
    }
  }

  query GetProjectQuery($slug: String!) {
    project: getProjectBySlug(slug: $slug) {
      ...ProjectFragment
    }
  }
`;

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const slug = getSingle(params?.project);
  if (!slug) {
    throw new Error(`Missing project slug`);
  }
  const { data } = await apolloClient.query<GetProjectQueryResponse, GetProjectQueryVariables>({
    query: GetProjectQuery,
    variables: { slug }
  });

  return {
    revalidate: 60,
    props: data
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let hasMore = true;
  let offset = 0;
  const pageSize = 50;
  const slugs = [];
  while (hasMore) {
    const { data } = await apolloClient.query<ListProjectsQueryResponse, ListProjectsQueryVariables>({
      query: ListProjectsQuery,
      variables: {
        from: offset,
        size: pageSize
      }
    });

    if (data.getProjectList) {
      hasMore = offset + pageSize < data.getProjectList.total;
      slugs.push(...data.getProjectList.items.map((item) => item.slug));
    } else {
      hasMore = false;
    }
  }

  return {
    paths: slugs,
    fallback: true
  };
};

type ProjectPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const ProjectPage: NextPage<ProjectPageProps> = ({ project }) => {
  if (!project) {
    return null;
  }

  return <Project project={project} />;
};

export default ProjectPage;
