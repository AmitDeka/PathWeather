import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Terms of Service | PathWeather",
  description: "Read our terms of service, usage conditions, and legal disclaimers.",
};

export default function TermsOfService() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-12 min-h-screen">
      <Card className="shadow-lg border-none bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center pb-8 border-b">
          <CardTitle className="text-4xl font-bold tracking-tight">Terms of Service</CardTitle>
          <p className="text-muted-foreground mt-2">Effective Date: May 10, 2026</p>
        </CardHeader>
        <CardContent className="prose prose-slate dark:prose-invert max-w-none space-y-8 pt-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold text-foreground">1. Introduction</h2>
            <p>
              By accessing the website at <a href="https://path-weather.vercel.app" className="text-primary hover:underline">path-weather.vercel.app</a>, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">2. Use License</h2>
            <p>
              Permission is granted to temporarily use PathWeather's service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license, you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials.</li>
              <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial).</li>
              <li>Attempt to decompile or reverse engineer any software contained on PathWeather's website.</li>
              <li>Remove any copyright or other proprietary notations from the materials.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">3. Disclaimer</h2>
            <p>
              The materials on PathWeather's website are provided on an 'as is' basis. PathWeather makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              Further, PathWeather does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">4. Limitations</h2>
            <p>
              In no event shall PathWeather or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on PathWeather's website, even if PathWeather or a PathWeather authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on PathWeather's website could include technical, typographical, or photographic errors. PathWeather does not warrant that any of the materials on its website are accurate, complete or current. PathWeather may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground">6. Links</h2>
            <p>
              PathWeather has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by PathWeather of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="border-t pt-8">
            <h2 className="text-2xl font-semibold text-foreground">7. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
