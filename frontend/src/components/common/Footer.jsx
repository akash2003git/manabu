import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-altBg text-txt py-10 mt-[100px]">
      <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-accent">学ぶ Manabu</h2>
          <p className="text-sm mt-2">Learn. Build. Succeed.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <Link to="/" className="hover:text-accent">
            Home
          </Link>
          <Link to="/courses" className="hover:text-accent">
            Courses
          </Link>
          <Link to="/about" className="hover:text-accent">
            About
          </Link>
          <Link to="/contact" className="hover:text-accent">
            Contact
          </Link>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Follow Me</p>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://github.com/akash2003git/manabu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/akash-tayade-/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com/akash2003_dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm mt-8 border-t border-secondary pt-4">
        © 2025 Manabu. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
