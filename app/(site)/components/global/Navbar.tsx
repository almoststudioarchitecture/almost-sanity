import Image from "next/image";
import Link from "next/link";
import LogoGif from "../../icons/almost-favicon-1.gif";
import InfoIcon from "../../icons/info-icon.png";
import ProjectsBtn from "../ProjectsBtn";

export default function Navbar() {
  return (
    // <header id="nav" className="py-2 px-4 border-b border-zinc-800 z-30 md:mb-28 mb-20">
    // <header id="nav" className="px-2 py-2 border-b z-30">
    <header id="nav" className="border-b z-30">
      <nav>      
          <ul className="flex items-center">
            <li>
              <a href="/" className="px-2 py-2 logo" id="navLink_draw">
                <span>A</span>
                <span>l</span>
                <span>m</span>
                <span>o</span>
                <span>s</span>
                <span>t</span>
                <span> </span>
                <span>S</span>
                <span>t</span>
                <span>u</span>
                <span>d</span>
                <span>i</span>
                <span>o</span>
                <Image className="nav-icon" id="icon-draw" src={LogoGif} width={25} height={25} alt="logo" />
              </a>
            </li>
            
            <li>
              <a
                href="/projects" id="navLink_projects" className="px-2 py-2">
                <span>P</span>
                <span>r</span>
                <span>o</span>
                <span>j</span>
                <span>e</span>
                <span>c</span>
                <span>t</span>
                <span>s</span>
                <span id="icon-grid" className="nav-icon"></span>
              </a>
            </li>
            <li>
              <a
                href="/information" className="px-2 py-2">
                <span>P</span>
                <span>r</span>
                <span>o</span>
                <span>f</span>
                <span>i</span>
                <span>l</span>
                <span>e</span>
                <Image className="nav-icon icon-info" src={InfoIcon} width={16} height={16} alt="info" />
              </a>
            </li>
          </ul>
      </nav>
    </header>
  );
}
