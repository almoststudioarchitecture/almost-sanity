import Image from "next/image";
import Link from "next/link";
import Logo from "../../icons/logo.png";

export default function Navbar() {
  return (
    // <header id="nav" className="py-2 px-4 border-b border-zinc-800 z-30 md:mb-28 mb-20">
    <header id="nav" className="py-2 px-4 border-b z-30">
      <nav>      
          <ul className="flex items-center gap-x-8">
            <li>
              <Link href="/">
                {/* <Image src={Logo} width={25} height={25} alt="logo" /> */}
                Almost Studio
              </Link>
            </li>
            <li>
              <Link
                href="/information"
                // className="hover:text-purple-400 duration-300"
              >
                Information
              </Link>
            </li>
            <li>
              <Link
                href="/projects"
                // className="hover:text-purple-400 duration-300"
              >
                Projects
              </Link>
            </li>
          </ul>
      </nav>
    </header>
  );
}
