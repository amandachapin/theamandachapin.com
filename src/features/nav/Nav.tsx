import Image from 'next/image';
import Link from 'next/link';

const Nav: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full h-20 bg-[#f7f2e5] p-5 flex shadow-lg z-10">
      <Link href="/">
        <Image src="/nav-logo.png" width={300} height={42} alt="Amanda Chapin" />
      </Link>
      <div className="ml-auto mt-3">
        <a href="#" className="font-bold mr-4">
          Experiential
        </a>{' '}
        <a href="#">Design</a> | <a href="#">Production</a> | <a href="#">Retail</a>
      </div>
    </nav>
  );
};

export default Nav;
