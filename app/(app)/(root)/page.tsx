import { CommandBox } from "@/components/command-box";
import { HomeCtas } from "@/components/home-ctas";
import { ROUTES } from "@/constants/routes";
import { EmojiReaction } from "@/components/ui/emoji-reaction";
import { BreadcrumbJsonLd } from "@/seo/json-ld";

export const dynamic = "force-static";
export const revalidate = false;

export default function IndexPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", path: ROUTES.HOME }]} />
      <section className="relative container-wrapper">
        <div className="container flex flex-col items-center gap-4 py-16 text-center md:py-20 lg:py-24">
          <h1 className="max-w-7xl bg-linear-to-b from-foreground via-foreground to-foreground/65 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            startercn
          </h1>

          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A starter kit for building and publishing your own shadcn registry
            components. Fork, customize, and deploy.
          </p>

          <CommandBox className="mt-4 w-full max-w-xl" />

          <HomeCtas className="mt-4" />
        </div>
      </section>

      <section className="container-wrapper pb-8 lg:pb-12">
        <div className="container flex flex-col items-center gap-6">
          <EmojiReaction
            className="justify-center"
            defaultReactions={[
              { count: 12, emoji: "👍", reacted: true },
              { count: 5, emoji: "🎉" },
              { count: 3, emoji: "❤️" },
            ]}
          />
        </div>
      </section>
    </>
  );
}
