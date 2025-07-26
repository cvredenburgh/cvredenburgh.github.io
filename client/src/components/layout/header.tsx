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
              <div className="text-xl font-semibold text-primary dark:text-blue-400 cursor-pointer">
                Chris Vredenburgh
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/">
              <div className={`font-medium cursor-pointer ${isActive("/") ? "text-primary dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"}`}>
                Home
              </div>
            </Link>
            <Link href="/projects">
              <div className={`font-medium cursor-pointer ${isActive("/projects") ? "text-primary dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"}`}>
                Projects & Writings
              </div>
            </Link>
            <Link href="/about">
              <div className={`font-medium cursor-pointer ${isActive("/about") ? "text-primary dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"}`}>
                About
              </div>
            </Link>
            <Link href="/contact">
              <div className={`font-medium cursor-pointer ${isActive("/contact") ? "text-primary dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400"}`}>
                Contact
              </div>
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
              <div 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-blue-400 cursor-pointer"
                onClick={closeMenu}
              >
                Home
              </div>
            </Link>
            <Link href="/projects">
              <div 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-blue-400 cursor-pointer"
                onClick={closeMenu}
              >
                Projects & Writings
              </div>
            </Link>
            <Link href="/about">
              <div 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-blue-400 cursor-pointer"
                onClick={closeMenu}
              >
                About
              </div>
            </Link>
            <Link href="/contact">
              <div 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-blue-400 cursor-pointer"
                onClick={closeMenu}
              >
                Contact
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
