import { Moon, Sun } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";

const Navbar = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
  },
}) => {
  return (
    <div className="mx-4 mt-6 sticky top-6 z-[9999]">
      <div className="container mx-auto max-w-screen-md px-6 py-4 rounded-full bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/5">
        <nav className="hidden justify-between lg:flex items-center">
          <div className="flex items-center gap-8">
            <a href={logo.url} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={logo.src} className="max-h-10" alt={logo.alt} />
              <span className="text-2xl font-bold tracking-tight">
                Path<span className="text-primary">Weather</span>
              </span>
            </a>
            <div className="h-4 w-[1px] bg-border/50" />
            <a href="/weather-guide" className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              Weather Guide
            </a>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </nav>

        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href={logo.url} className="flex items-center gap-2">
                <img src={logo.src} className="max-h-9" alt={logo.alt} />
                <span className="text-xl font-bold tracking-tight">
                  Path<span className="text-primary">Weather</span>
                </span>
              </a>
              <div className="h-4 w-[1px] bg-border/50" />
              <a href="/weather-guide" className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors">
                Guide
              </a>
            </div>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
