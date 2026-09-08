"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import AvatarGroup from "@/components/ui/avatar-group";
import { ReelCard } from "./reel-card";
import { hero } from "@/content/v2";

/**
 * The hero's proof reel as a carousel. Each avatar beneath the cards is one
 * persona; choosing one swaps in that persona's four posts. Cards are keyed
 * by persona so a switch remounts them and they generate in again, faster
 * than the first load so a click feels like a cut rather than a wait.
 */
export function HeroReel() {
  const [activeId, setActiveId] = useState(hero.personas[0].id);
  const [switched, setSwitched] = useState(false);
  const persona = hero.personas.find((p) => p.id === activeId) ?? hero.personas[0];

  const select = (id: number) => {
    if (id === activeId) return;
    setSwitched(true);
    setActiveId(id);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        role="group"
        aria-label={`${persona.handle} posts`}
      >
        {persona.reel.map((post, i) => (
          <ReelCard
            key={`${persona.id}-${post.poster}`}
            src={post.poster}
            delay={switched ? i * 140 : 200 + i * 650}
            duration={switched ? 1100 : 2200}
            daysAgo={persona.reel.length - 1 - i}
          >
            <span className="text-[12px] text-white/70">{persona.handle}</span>
            <span className="flex items-center gap-1.5 text-[15px] font-semibold tabular-nums">
              <Eye className="h-4 w-4" strokeWidth={2} aria-hidden />
              {post.stat}
            </span>
          </ReelCard>
        ))}
      </div>

      <AvatarGroup
        size="lg"
        items={hero.personas.map((p) => ({
          id: p.id,
          name: p.name,
          designation: p.designation,
          image: p.avatar,
        }))}
        activeId={activeId}
        onSelect={select}
      />
    </div>
  );
}
