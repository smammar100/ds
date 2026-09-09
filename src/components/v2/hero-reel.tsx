"use client";

import { useState } from "react";
import { Eye, Heart, MessageCircle, Send } from "lucide-react";
import AvatarGroup from "@/components/ui/avatar-group";
import { ReelCard } from "./reel-card";
import { hero } from "@/content/v2";
import { cn } from "@/lib/utils";

/**
 * The hero's proof reel as a carousel. Each avatar beneath the cards is one
 * persona; choosing one swaps in that persona's four posts.
 */
export function HeroReel() {
  const [activeId, setActiveId] = useState(hero.personas[0].id);
  const persona = hero.personas.find((p) => p.id === activeId) ?? hero.personas[0];

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className={cn(
          "grid w-full grid-cols-2 gap-3 sm:gap-4",
          persona.reel.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-4",
        )}
        role="group"
        aria-label={`${persona.handle} posts`}
      >
        {persona.reel.map((post, i) => (
          <ReelCard
            key={`${persona.id}-${post.poster}`}
            src={post.poster}
            daysAgo={persona.reel.length - 1 - i}
          >
            <span className="text-[12px] text-white/70">{persona.handle}</span>
            {/* Number in the display face, unit small beside it. */}
            <span className="flex items-baseline gap-1.5">
              <Eye className="h-4 w-4 self-center" strokeWidth={2} aria-hidden />
              <span className="font-display text-[26px] leading-none tracking-[-0.01em]">
                {post.stat}
              </span>
              <span className="text-[12.5px] text-white/65">views</span>
            </span>
            {/* The engagement row the terminal shows under each post. */}
            <span className="flex items-center gap-3.5 text-[11.5px] text-white/65">
              <span className="flex items-center gap-1.5">
                <Heart className="h-3 w-3" strokeWidth={2} aria-hidden />
                <span className="sr-only">likes </span>
                {post.likes}
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-3 w-3" strokeWidth={2} aria-hidden />
                <span className="sr-only">comments </span>
                {post.comments}
              </span>
              <span className="flex items-center gap-1.5">
                <Send className="h-3 w-3" strokeWidth={2} aria-hidden />
                <span className="sr-only">shares </span>
                {post.shares}
              </span>
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
        onSelect={setActiveId}
      />
    </div>
  );
}
