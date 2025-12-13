import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const GlassCard: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-40 max-w-2xl mx-auto"
    >
      <div
        className="relative p-8 md:p-10 rounded-2xl md:rounded-3xl backdrop-blur-2xl border"
        style={{
          background: "hsl(220 20% 98% / 0.06)",
          backdropFilter: "blur(24px)",
          borderColor: "hsl(220 20% 98% / 0.1)",
          boxShadow: `
            0 8px 32px hsl(220 80% 5% / 0.5),
            0 0 0 1px hsl(220 20% 100% / 0.05) inset
          `,
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 text-center"
        >
          <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Stop juggling 10 tools.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-lg lg:text-xl text-on-dark leading-relaxed font-light mb-8 md:mb-10 text-center max-w-xl mx-auto"
        >
          Replace Sheets + Slack + Notion + Zapier + n8n with ONE platform built for how your team actually works.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 max-w-lg mx-auto"
        >
          <Link to="/contact" className="flex-1 sm:flex-initial">
            <Button
              variant="premium"
              size="xl"
              className="w-full sm:w-auto min-w-[180px]"
            >
              Start Building →
            </Button>
          </Link>
          <Button
            variant="outline"
            size="xl"
            className="w-full sm:w-auto min-w-[180px]"
          >
            Watch Demo
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

