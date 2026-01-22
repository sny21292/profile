import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "About", to: "about" },
  { name: "Portfolio", to: "portfolio" },
  { name: "Skills", to: "skills" },
  { name: "Contact", to: "contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen ? "glass py-4 shadow-lg" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link
            to="hero"
            smooth={true}
            duration={500}
            className="text-2xl font-display font-bold cursor-pointer hover:opacity-80 transition-opacity"
          >
            Sunil<span className="text-primary">.dev</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                smooth={true}
                duration={500}
                offset={-80}
                className="text-sm font-medium text-muted-foreground hover:text-primary cursor-pointer transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Button 
              variant="outline" 
              className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <a href="mailto:sunilkumar@example.com">Resume</a>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[72px] left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-80}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground/80 hover:text-primary cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
              <Button className="w-full bg-primary text-primary-foreground">
                Download Resume
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
