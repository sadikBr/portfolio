
import Separator from "./components/separator";

import Logo from "../../assets/Logo.png";

export default function Header() {
  return (
    <header className="hidden lg:block">
      <nav className="w-screen max-w-7xl mx-auto py-12">
        <ul className="flex items-center justify-center gap-14">
          <li className="link"><a href="#about">About</a></li>
          <Separator />
          <li className="link"><a href="#skills">Skills</a></li>
          <Separator />
          <img className="w-[200px] h-auto" src={Logo} alt="Logo Image" />
          <Separator />
          <li className="link"><a href="#work">Work</a></li>
          <Separator />
          <li className="link"><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
