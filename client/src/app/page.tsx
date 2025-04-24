import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/custom/components/footer";
import { H1 } from "@/custom/components/typography";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="w-full h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center space-y-6 px-4">
          <H1 className="text-4xl md:text-6xl font-bold text-center">
            Skidoodle
          </H1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/sign-in"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Register
            </Link>
          </div>
        </div>
      </section>

      <section className="w-full py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Something interesting
                  </h2>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc tortor lorem, faucibus non nunc vitae, blandit lacinia
                    ante. Aliquam iaculis cursus felis, et vestibulum urna
                    elementum eu. Aenean malesuada convallis convallis.
                  </p>
                </div>
                <div className="order-1 md:order-2 bg-slate-100 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
                  <p className="text-lg text-center">Feature Highlight</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-slate-100 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
                  <p className="text-lg text-center">Feature Highlight</p>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Something interesting
                  </h2>
                  <p className="text-muted-foreground">
                    Mauris et velit sit amet leo laoreet consequat efficitur in
                    arcu. Praesent blandit dui felis, at sodales tortor
                    consectetur ac. Phasellus sed diam laoreet, eleifend velit
                    quis, venenatis dui. Aliquam euismod ex eleifend urna
                    fringilla, eu porta felis porta. Vestibulum sagittis
                    vestibulum sapien, pretium posuere nisl viverra eget.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Something interesting
                  </h2>
                  <p className="text-muted-foreground">
                    Pellentesque sit amet consectetur purus. In vitae ornare
                    libero. Vivamus quam sapien, aliquet vel libero ac, semper
                    pulvinar erat. Maecenas semper mollis lorem ac condimentum.
                    Suspendisse potenti.
                  </p>
                </div>
                <div className="order-1 md:order-2 bg-slate-100 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
                  <p className="text-lg text-center">Feature Highlight</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-none">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-slate-100 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
                  <p className="text-lg text-center">Feature Highlight</p>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Something interesting
                  </h2>
                  <p className="text-muted-foreground">
                    Donec pretium felis leo, ut fermentum nisl rutrum quis.
                    Maecenas in imperdiet sapien, ac dignissim nunc. Aliquam in
                    tortor ultrices, porttitor est quis, sollicitudin tellus.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </div>
  );
}
