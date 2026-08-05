"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Knot } from "./Knot";

export function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Knot className="w-20 h-20" />
          <motion.p
            className="mt-4 font-mono text-xs tracking-[0.3em] text-muted uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Shrandha Labs
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
