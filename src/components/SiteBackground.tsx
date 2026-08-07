import { Knot } from "./Knot";

/**
 * Site-wide ambient background — sits fixed behind every page (mounted once
 * in the root layout) so every route gets the same premium glow + grain +
 * watermark treatment without each page needing its own copy.
 */
export function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg" />
      <div className="grain-overlay" />
      <Knot className="absolute -right-32 -top-24 w-[460px] h-[460px] opacity-[0.05]" />
      <Knot className="absolute -left-40 top-[60vh] w-[380px] h-[380px] opacity-[0.04]" spin={false} />
      <Knot className="absolute right-[-10%] bottom-[-10%] w-[420px] h-[420px] opacity-[0.05]" />
    </div>
  );
}
