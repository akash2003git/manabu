function Footer() {
  return (
    <footer className="bg-altBg text-txt py-10 mt-[200px]">
      <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-accent">学ぶ Manabu</h2>
          <p className="text-sm mt-2">Learn. Build. Succeed.</p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-2">
          <a href="#" className="hover:text-accent">
            Home
          </a>
          <a href="#" className="hover:text-accent">
            Courses
          </a>
          <a href="#" className="hover:text-accent">
            About
          </a>
          <a href="#" className="hover:text-accent">
            Contact
          </a>
        </div>

        {/* Socials */}
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Follow Me</p>
          <div className="flex gap-3">
            <a href="#" className="hover:text-accent">
              GitHub
            </a>
            <a href="#" className="hover:text-accent">
              LinkedIn
            </a>
            <a href="#" className="hover:text-accent">
              Twitter
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
