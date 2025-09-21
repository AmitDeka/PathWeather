import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme-toggle";

const Navbar = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
  },
}) => {
  return (
    <div className="mx-4 mt-4 sticky top-4 z-[9999]">
      <div className="container border mx-auto max-w-screen-md px-5 py-3 rounded-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-foreground/10 dark:border-foreground/20 ">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-10" alt={logo.alt} />
              <span className="text-xl font-cursiv">
                Path<span className="text-primary">Weather</span>
              </span>
            </a>
          </div>
          <div className="flex items-center justify-center">
            <ThemeToggle />
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="max-h-9" alt={logo.alt} />
              <span className="text-xl font-cursiv">
                Path<span className="text-primary">Weather</span>
              </span>
            </a>
            <div className="flex items-center justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
