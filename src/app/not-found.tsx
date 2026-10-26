import Image from "next/image";
import { photos } from "@/assets/photos";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[90svh] items-center overflow-hidden bg-navy-deep pt-24 text-white">
      <Image src={photos.uganda} alt="" fill sizes="100vw" className="photo-grade object-cover opacity-40" />
      <div aria-hidden className="survey-grid absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute inset-x-0 top-1/2 text-pink">
        <div className="dashed-line w-full" />
      </div>
      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-8">
        <p className="font-mono text-xs tracking-[0.3em] text-cyan uppercase">● Signal lost · Error 404</p>
        <h1 className="mt-6 font-display text-[28vw] leading-[0.8] font-black uppercase lg:text-[18rem]">
          Off <span className="text-outline [--stroke:var(--color-pink)]">grid</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-white/80">
          These coordinates don’t match any page we have. Head back to the map.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/destinations" variant="light">
            Destinations
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
