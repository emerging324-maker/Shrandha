import { Knot } from "./Knot";

/**
 * Site-wide ambient background — sits fixed behind every page (mounted once
 * in the root layout) so every route gets the same treatment without each
 * page needing its own copy. Deliberately restrained: one logo watermark,
 * one soft glow, light grain — multiple overlapping marks read as a smudgy
 * blob rather than a premium accent, so we don't repeat it down the page.
 */
export function SiteBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 45% at 82% 8%, rgba(55,211,224,0.07), transparent 70%)",
        }}
      />
      <Knot className="absolute -right-28 -top-20 w-[380px] h-[380px] opacity-[0.05]" />
      <div className="grain-overlay" />
    </div>
  );
}
