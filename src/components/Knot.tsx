"use client";
import { motion } from "framer-motion";
import Image from "next/image";

/**
 * Signature motif — the actual Shrandha Labs logo mark, used ambiently
 * across the site (hero backdrop, loader, section dividers) so the brand's
 * own symbol becomes the site's recurring visual language, instead of a
 * generic abstract shape.
 *
 * The caller's className controls sizing AND positioning (e.g. "absolute
 * -right-24 -top-16 w-[420px] h-[420px]"). It's applied directly to the
 * motion.div with no inline style override, so it never fights Tailwind's
 * "absolute"/"relative" utilities. The inner wrapper is what gives the
 * Image's `fill` prop a properly-scoped positioning context.
 */
export function Knot({ className = "", spin = true }: { className?: string; spin?: boolean }) {
  return (
    <motion.div
      className={className}
      animate={spin ? { rotate: 360 } : undefined}
      transition={spin ? { duration: 50, repeat: Infinity, ease: "linear" } : undefined}
    >
      <div className="relative w-full h-full">
        <Image
          src="/images/logo-mark.png"
          alt=""
          fill
          sizes="(max-width: 768px) 300px, 600px"
          style={{ objectFit: "contain" }}
          priority={false}
        />
      </div>
    </motion.div>
  );
}
