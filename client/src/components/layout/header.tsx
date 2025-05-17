import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-xl font-semibold text-primary dark:text-blue-400">
                Alex Smith
              </a>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <a className={`font-medium ${isActive("/") ? "text-primary dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"}`}>
                Home
              </a>
            </Link>
            <Link href="/projects">
              <a className={`font-medium ${isActive("/projects") ? "text-primary dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"}`}>
                Projects
              </a>
            </Link>
            <Link href="/about">
              <a className={`font-medium ${isActive("/about") ? "text-primary dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"}`}>
                About
              </a>
            </Link>
            <Link href="/contact">
              <a className={`font-medium ${isActive("/contact") ? "text-primary dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"}`}>
                Contact
              </a>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/">
              <a 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-blue-400"
                onClick={closeMenu}
              >
                Home
              </a>
            </Link>
            <Link href="/projects">
              <a 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-blue-400"
                onClick={closeMenu}
              >
                Projects
              </a>
            </Link>
            <Link href="/about">
              <a 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-blue-400"
                onClick={closeMenu}
              >
                About
              </a>
            </Link>
            <Link href="/contact">
              <a 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-blue-400"
                onClick={closeMenu}
              >
                Contact
              </a>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
