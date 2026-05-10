import Link from "next/link";

const Footer = ({
  copyright = {
    year: new Date().getFullYear(),
    name: "PathWeather",
    text: "All rights reserved.",
  },
}) => {
  return (
    <footer className="container mx-auto px-6 border-t py-8 mt-12">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-muted-foreground text-sm font-sans order-2 md:order-1">
          <p>
            &copy;&nbsp;{copyright.year}&nbsp;{copyright.name}.&nbsp;
            {copyright.text}
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-muted-foreground order-1 md:order-2">
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/weather-guide" className="hover:text-primary transition-colors font-bold">Weather Guide</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
        </nav>
      </div>
    </footer>
  );
};

export { Footer };
