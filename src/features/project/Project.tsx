import { ProjectFragment } from '@/types/takeshape';
import { isDefined } from '@/utils/types';
import { getImageUrl } from '@takeshape/routing';

export interface ProjectProps {
  project: ProjectFragment;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  const images = project.gallery?.filter(isDefined) ?? [];
  const featuredImage = project.featuredImage;
  return (
    <div className="container mx-auto">
      {featuredImage && (
        <section className="w-full h-screen">
          <img src={getImageUrl(featuredImage.path)} className="object-cover w-full h-full" alt="Image alt text" />
        </section>
      )}
      <h1 className="mt-6 text-3xl font-bold underline">{project.title}</h1>
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

export default Project;
