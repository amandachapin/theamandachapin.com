import { ProjectFragment } from '@/types/takeshape';
import { isDefined } from '@/utils/types';
import { getImageUrl } from '@takeshape/routing';
import Image from 'next/image';
import Nav from '@/features/nav/Nav';

export interface ProjectProps {
  project: ProjectFragment;
}

const Project: React.FC<ProjectProps> = ({ project }) => {
  const images = project.gallery?.filter(isDefined) ?? [];
  const featuredImage = project.featuredImage;
  return (
    <div>
      <Nav />
      <div className="container mx-auto mt-24">
        {featuredImage && (
          <section className="relative w-full h-[80vh]">
            <Image src={getImageUrl(featuredImage.path)} fill className="object-cover" alt="Image alt text" />
          </section>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 sm:gap-x-10 lg:gap-x-20">
          <div>
            <h1 className="font-bold text-3xl">{project.head}</h1>
            <h2
              className="text-4xl uppercase"
              style={{
                color: '#a2f2fd',
                textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, -4px -2px 0 #000'
              }}
            >
              {project.subhead}
            </h2>
          </div>
          <div>
            <div className="font-bold uppercase">
              {project.location}, {project.year}
            </div>
            <div dangerouslySetInnerHTML={{ __html: project.description }}></div>
          </div>
          {images.map((image) => (
            <div key={image.path} className="group relative">
              <div className="min-h-80 aspect-w-3 aspect-h-2 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
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
    </div>
  );
};

export default Project;
