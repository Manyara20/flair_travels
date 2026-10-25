import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="survey-grid relative flex min-h-[90svh] items-center overflow-hidden bg-ink pt-24">
      <div aria-hidden className="absolute inset-x-0 top-1/2 text-laterite">
        <div className="dashed-line w-full" />
      </div>
      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-8">
        <p className="font-mono text-xs tracking-[0.3em] text-volt uppercase">● Signal lost · Error 404</p>
        <h1 className="mt-6 font-display text-[28vw] leading-[0.8] font-black uppercase lg:text-[18rem]">
          Off <span className="text-outline">grid</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-bone/70">
          These coordinates don’t match any route we run. Head back to the map.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/">Return to base</ButtonLink>
          <ButtonLink href="/destinations" variant="ghost">
            Destination index
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
