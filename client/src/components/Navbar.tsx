import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const menuItems = [
    { href: "#services", label: "Serviços" },
    { href: "#about", label: "Sobre Nós" },
    { href: "#benefits", label: "Vantagens" },
    { href: "#testimonials", label: "Depoimentos" },
    { href: "#contact", label: "Contato" },
  ];
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-zinc-900/90 backdrop-blur-md shadow-md" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center group">
                <div className={`flex items-center justify-center p-2 rounded-lg mr-2 transition-colors duration-300 ${
                  scrolled ? "bg-primary-900" : "bg-primary-800/60"
                }`}>
                  <BrainCircuit className="h-5 w-5 text-primary-400" />
                </div>
                <span className={`font-bold text-xl transition-colors duration-300 ${
                  scrolled ? "text-white" : "text-white"
                }`}>
                  Nova<span className="text-primary-400">Forge</span>
                </span>
              </a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  scrolled 
                    ? "text-gray-300 hover:text-white hover:bg-primary-900/50" 
                    : "text-gray-100 hover:text-white hover:bg-primary-800/30"
                }`}
              >
                {item.label}
              </a>
            ))}
            
            <Button 
              size="sm"
              className="ml-4 bg-primary-600 hover:bg-primary-700 text-white font-medium"
              asChild
            >
              <a href="#contact">
                Fale Conosco
              </a>
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={toggleMobileMenu}
            className={`md:hidden transition-colors duration-300 ${
              scrolled ? "text-white hover:text-primary-400" : "text-white hover:text-primary-400"
            } focus:outline-none`}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-4 space-y-1 bg-zinc-900/95 backdrop-blur-md rounded-lg mt-2 border border-zinc-800">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-3 rounded-md text-base font-medium text-gray-200 hover:text-white hover:bg-primary-900/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-2 pb-1">
                  <Button 
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                  >
                    <a href="#contact">
                      Fale Conosco
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
