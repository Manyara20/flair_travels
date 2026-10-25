import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import credits from "@/data/credits.json";

export const metadata: Metadata = {
  title: "Photo credits",
  description: "Attribution for the photography used on this site.",
};

export default function CreditsPage() {
  return (
    <>
      <PageHero
        index="—"
        eyebrow="Credits"
        title="Photo credits"
        intro="The photographs on this site come from Wikimedia Commons and are used under the Creative Commons licences listed below."
      />
      <section className="bg-ink">
        <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-8 md:py-24">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="font-mono text-[0.6rem] tracking-[0.25em] text-dust uppercase">
              <tr className="border-b border-bone/15">
                <th className="py-3 pr-4 font-normal">Image</th>
                <th className="py-3 pr-4 font-normal">Photographer</th>
                <th className="py-3 font-normal">Licence</th>
              </tr>
            </thead>
            <tbody>
              {credits.map((c) => (
                <tr key={c.slug} className="border-b border-bone/10 align-top">
                  <td className="py-3 pr-4">
                    <a href={c.source} target="_blank" rel="noreferrer" className="hover:text-volt">
                      {c.title.replace(/\.jpe?g$/i, "")}
                    </a>
                  </td>
                  <td className="py-3 pr-4 text-bone/70">{c.artist}</td>
                  <td className="py-3 font-mono text-xs text-bone/70">{c.license}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 text-xs text-dust">Images have been cropped and colour-graded for display.</p>
        </div>
      </section>
    </>
  );
}
