import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "About", path: "/", icon: "User" },
    { name: "Projects", path: "/projects", icon: "Code" },
    { name: "Awards", path: "/awards", icon: "Trophy" },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const Logo = () => (
    <Link to="/" className="flex items-center space-x-3 group">
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center glow-primary group-hover:glow-strong transition-all duration-300">
          <span className="text-primary-foreground font-space-grotesk font-bold text-lg">
          AP
          </span>
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-space-grotesk font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
          Anish Pandey
        </h1>
      </div>
    </Link>
  );

  const NavLink = ({ item, isMobile = false }) => (
    <Link
      to={item?.path}
      className={`
        relative flex items-center space-x-2 px-4 py-2 rounded-lg font-space-grotesk font-medium
        transition-all duration-300 group
        ${
          isActivePath(item?.path)
            ? "text-primary bg-primary/10 glow-primary"
            : "text-text-secondary hover:text-primary hover:bg-primary/5"
        }
        ${isMobile ? "w-full justify-start" : ""}
      `}
      onClick={() => isMobile && setIsMobileMenuOpen(false)}
    >
      <Icon
        name={item?.icon}
        size={18}
        className={`transition-colors duration-300 ${
          isActivePath(item?.path)
            ? "text-primary"
            : "text-text-secondary group-hover:text-primary"
        }`}
      />
      <span>{item?.name}</span>
      {isActivePath(item?.path) && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-glow-pulse"></div>
      )}
    </Link>
  );

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            isScrolled
              ? "bg-background/80 backdrop-blur-glass border-b border-border shadow-card-elevated"
              : "bg-transparent"
          }
        `}
      >
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                iconName="Linkedin"
                iconPosition="left"
                className="glow-primary hover:glow-strong"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/anishpandey2/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                LinkedIn
              </Button>

              <Button
                variant="default"
                size="sm"
                iconName="Mail"
                iconPosition="left"
                className="glow-primary hover:glow-strong"
                onClick={() =>
                  (window.location.href =
                    "mailto:apandey2@caldwell.edu?subject=Inquiry%20from%20Portfolio&body=Hi%20Anish,%0A%0AI%20wanted%20to%20reach%20out%20regarding...")
                }
              >
                Contact
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-text-secondary hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`
            lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-glass
            border-b border-border shadow-card-elevated transition-all duration-300 overflow-hidden
            ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <nav className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => (
              <NavLink key={item.path} item={item} isMobile />
            ))}

            {/* Mobile CTA Buttons */}
            <div className="pt-4 border-t border-border space-y-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Linkedin"
                iconPosition="left"
                fullWidth
                className="justify-start text-text-secondary hover:text-primary"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/anishpandey2/",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                LinkedIn
              </Button>

              <Button
                variant="default"
                size="sm"
                iconName="Mail"
                iconPosition="left"
                fullWidth
                className="justify-start glow-primary hover:glow-strong"
                onClick={() =>
                  (window.location.href =
                    "mailto:apandey2@caldwell.edu?subject=Inquiry%20from%20Portfolio&body=Hi%20Anish,%0A%0AI%20wanted%20to%20reach%20out%20regarding...")
                }
              >
                Contact
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Orbital Navigation Ring */}
      <div className="hidden xl:block fixed top-20 right-8 z-40">
        <div className="relative w-32 h-32 perspective-1000">
          <div className="absolute inset-0 animate-orbit">
            {navigationItems.slice(0, 3).map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  absolute w-8 h-8 rounded-full flex items-center justify-center
                  transition-all duration-300 group
                  ${
                    isActivePath(item.path)
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "bg-surface text-text-secondary hover:bg-primary hover:text-primary-foreground hover:glow-primary"
                  }
                `}
                style={{
                  transform: `rotate(${index * 120}deg) translateX(50px) rotate(-${
                    index * 120
                  }deg)`,
                }}
                title={item.name}
              >
                <Icon name={item.icon} size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Particle Trail Effect */}
      <div className="fixed inset-0 pointer-events-none z-30">
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-particle-float"></div>
        <div
          className="absolute top-12 right-1/3 w-1 h-1 bg-accent/40 rounded-full animate-particle-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-8 left-2/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-particle-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </>
  );
};

export default Header;
