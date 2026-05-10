import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Privacy Policy | PathWeather",
  description: "Our privacy policy details how we handle your data, cookies, and your rights.",
};

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 min-h-screen">
      <Card className="shadow-lg border-none bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-8 border-b">
          <CardTitle className="text-4xl font-bold tracking-tight">Privacy Policy</CardTitle>
          <p className="text-muted-foreground mt-2">Last updated: May 10, 2026</p>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none space-y-8 pt-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              Welcome to <strong>PathWeather</strong> (accessible from <a href="https://path-weather.vercel.app" className="text-primary hover:underline">path-weather.vercel.app</a>). We respect your privacy and are committed to protecting your personal data. This privacy policy informs you about how we handle your data when you visit our website, your privacy rights, and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Information We Collect</h2>
            <p>
              We do not require user registration. However, we may collect the following information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Log Files:</strong> PathWeather follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.</li>
              <li><strong>Route Data:</strong> The locations you enter are processed to provide the service. This data is processed in real-time and is not stored permanently on our servers.</li>
              <li><strong>Cookies and Web Beacons:</strong> Like any other website, PathWeather uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Google DoubleClick DART Cookie</h2>
            <p>
              Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to PathWeather and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" className="text-primary hover:underline">https://policies.google.com/technologies/ads</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Advertising Partners Privacy Policies</h2>
            <p>
              Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on PathWeather, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p className="italic">Note that PathWeather has no access to or control over these cookies that are used by third-party advertisers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. GDPR Data Protection Rights</h2>
            <p>
              We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Children's Information</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              PathWeather does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
            </p>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-foreground">7. Contact Information</h2>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>amitdeka13@gmail.com</strong>.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
