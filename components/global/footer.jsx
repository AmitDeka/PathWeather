const Footer = ({
  copyright = {
    year: new Date().getFullYear(),
    name: "PathWeather",
    text: "All rights reserved.",
  },
}) => {
  return (
    <div className="container px-6">
      <footer>
        <div className="text-muted-foreground flex justify-center gap-4 border-t py-4 text-sm font-sans">
          <p>
            &copy;&nbsp;{copyright.year}&nbsp;{copyright.name}.&nbsp;
            {copyright.text}
          </p>
        </div>
      </footer>
    </div>
  );
};

export { Footer };
