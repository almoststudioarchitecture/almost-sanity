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
                {/* <Image src={LogoGif} width={25} height={25} alt="logo" /> */}
                Almost Studio
                {/* <svg className="nav-icon" id="icon-draw" width="45" height="24" viewBox="0 0 45 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M33.4215 11.5446C34.427 11.9118 35.5742 12.2004 36.7748 12.2731C39.0332 12.4098 42.5022 11.7213 44.2843 8.15706C45.5192 5.68717 44.5181 2.6838 42.0482 1.44886C40.2238 0.536651 38.1083 0.844487 36.6295 2.06312C34.5482 1.02539 32.6603 -0.338825 30.1846 0.0791715C27.7805 0.485088 26.5523 2.19577 26.0886 2.93344C25.3458 4.11501 24.7841 5.46909 24.3559 6.79575C23.3857 5.84176 21.9052 4.57565 20.1243 3.929C18.7701 3.43729 16.913 3.17966 14.9612 3.97874C12.4748 4.99668 11.2801 7.29256 9.91544 9.4311C9.48336 7.10938 7.44695 5.35163 5 5.35163C2.23858 5.35163 0 7.59021 0 10.3516C0 12.462 0.872171 14.5703 1.62356 16.017C2.9542 18.579 4.87938 21.1833 7.50367 22.5389C8.51277 23.0602 10.1472 23.6349 12.0672 23.2279C14.1623 22.7839 15.5612 21.4013 16.3569 20.0038C17.2589 18.4194 18 15.9999 18.2544 14.9534C18.9974 15.8531 19.7731 16.7294 20.6342 17.5185C21.3228 18.1495 22.6441 19.2742 24.3535 19.7793C27.1226 20.5975 30.0599 19.4217 31.4944 16.9113C32.4449 15.2479 32.9632 13.3918 33.4215 11.5446Z" fill="#FF0000"/>
                </svg> */}
                <Image className="nav-icon" id="icon-draw" src={LogoGif} width={25} height={25} alt="logo" />
              </Link>
            </li>
            
            <li>
              <Link
                href="/projects" id="navLink_projects"
                // className="hover:text-purple-400 duration-300"
              >
                Projects
                <span id="icon-grid" className="nav-icon"></span>
              </Link>
              {/* <ProjectsBtn /> */}
              {/* <button id="btn_grid" onClick={makeGrid}>Projects</button> */}
            </li>
            <li>
              <Link
                href="/information"
                // className="hover:text-purple-400 duration-300"
              >
                Profile
                <Image className="nav-icon icon-info" src={InfoIcon} width={16} height={16} alt="info" />
              </Link>
            </li>
            {/* <div id="cursorPrompt">Drag Below to Draw</div> */}
          </ul>
      </nav>
    </header>
  );
}
