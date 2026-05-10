import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Github, Twitter } from "lucide-react";

export const metadata = {
  title: "Contact Us | PathWeather",
  description: "Get in touch with the PathWeather team.",
};

export default function ContactUs() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 min-h-screen">
      <Card className="shadow-lg border-none bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl font-bold tracking-tight">
            Contact Us
          </CardTitle>
          <p className="text-muted-foreground mt-2">
            Have a question or feedback? We&apos;d love to hear from you.
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <a
              href="mailto:amitdeka13@gmail.com"
              className="flex items-center p-6 rounded-xl border border-border bg-card hover:bg-accent transition-colors group">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">Email Us</h3>
                <p className="text-sm text-muted-foreground">
                  amitdeka13@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://github.com/AmitDeka/PathWeather"
              target="_blank"
              className="flex items-center p-6 rounded-xl border border-border bg-card hover:bg-accent transition-colors group">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Github className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">GitHub</h3>
                <p className="text-sm text-muted-foreground">
                  Follow our development
                </p>
              </div>
            </a>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none text-center text-foreground/70">
            <p>
              We typically respond to emails within 24-48 hours. Please include
              as much detail as possible so we can better assist you.
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
