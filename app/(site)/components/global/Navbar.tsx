import Image from "next/image";
import Link from "next/link";
import LogoGif from "../../icons/almost-favicon-1.gif";
import InfoIcon from "../../icons/info-icon.png";
import ProjectsBtn from "../ProjectsBtn";

export default function Navbar() {
  return (
    // <header id="nav" className="py-2 px-4 border-b border-zinc-800 z-30 md:mb-28 mb-20">
    <header id="nav" className="px-2 py-2 border-b z-30">
      <nav>      
          <ul className="flex items-center gap-x-6">
            <li>
              <Link href="/" className="logo" id="navLink_draw">
                Almost Studio
                <Image className="nav-icon" id="icon-draw" src={LogoGif} width={25} height={25} alt="logo" />
              </Link>
            </li>
            
            <li>
              <Link
                href="/projects" id="navLink_projects"
              >
                Projects
                <span id="icon-grid" className="nav-icon"></span>
              </Link>
            </li>
            <li>
              <Link
                href="/information"
              >
                Profile
                <Image className="nav-icon icon-info" src={InfoIcon} width={16} height={16} alt="info" />
              </Link>
            </li>
          </ul>
      </nav>
    </header>
  );
}
