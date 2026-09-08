"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AvatarItem {
  id: number;
  name: string;
  designation: string;
  image: string;
}

interface AvatarGroupProps {
  items: AvatarItem[];
  className?: string;
  maxVisible?: number;
  size?: "sm" | "md" | "lg";
  /** When set, the group acts as a selector: the active avatar is ringed. */
  activeId?: number;
  onSelect?: (id: number) => void;
}

const SIZE = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

// Individual Avatar Component
const Avatar = ({
  item,
  index,
  totalItems,
  size,
  isHovered,
  isActive,
  selectable,
  onHover,
  onLeave,
  onSelect,
}: {
  item: AvatarItem;
  index: number;
  totalItems: number;
  size: "sm" | "md" | "lg";
  isHovered: boolean;
  isActive: boolean;
  selectable: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect?: () => void;
}) => {
  const Wrapper = selectable ? "button" : "div";
  return (
    <Wrapper
      type={selectable ? "button" : undefined}
      aria-pressed={selectable ? isActive : undefined}
      aria-label={selectable ? `${item.name}, ${item.designation}` : undefined}
      className="group relative flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onSelect}
      style={{
        marginLeft: index === 0 ? 0 : "-0.5rem",
        zIndex: isActive ? totalItems + 1 : totalItems - index,
      }}
    >
      <AnimatePresence mode="popLayout">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { type: "spring", stiffness: 200, damping: 20 },
            }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="pointer-events-none absolute -top-16 z-50 flex min-w-max flex-col items-center justify-center whitespace-nowrap rounded-xl border border-hairline bg-surface px-4 py-2 text-xs shadow-[0_8px_24px_rgba(0,0,0,0.5)]"
          >
            <div className="relative z-30 text-center text-[14px] font-medium text-foreground">
              {item.name}
            </div>
            <div className="text-center text-[11.5px] text-muted-foreground">
              {item.designation}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.05, zIndex: 100 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        <Image
          height={100}
          width={100}
          src={item.image}
          alt={item.name}
          className={cn(
            "!rounded-full border-2 border-black object-cover transition duration-300",
            SIZE[size],
            selectable && !isActive && "opacity-55 grayscale-[0.4] group-hover:opacity-90",
            selectable && isActive && "ring-2 ring-white ring-offset-2 ring-offset-black",
          )}
        />
      </motion.div>
    </Wrapper>
  );
};

const AvatarGroup = ({
  items,
  className,
  maxVisible = 5,
  size = "md",
  activeId,
  onSelect,
}: AvatarGroupProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const selectable = typeof onSelect === "function";

  const visibleItems = items.slice(0, maxVisible);
  const remainingCount = items.length - maxVisible;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {visibleItems.map((item, index) => (
        <Avatar
          key={item.id}
          item={item}
          index={index}
          totalItems={visibleItems.length}
          size={size}
          isHovered={hoveredIndex === item.id}
          isActive={activeId === item.id}
          selectable={selectable}
          onHover={() => setHoveredIndex(item.id)}
          onLeave={() => setHoveredIndex(null)}
          onSelect={selectable ? () => onSelect(item.id) : undefined}
        />
      ))}

      {remainingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "flex items-center justify-center rounded-full border-2 border-black bg-surface font-medium text-muted-foreground",
            SIZE[size],
            "ml-[-0.5rem]",
          )}
        >
          +{remainingCount}
        </motion.div>
      )}
    </div>
  );
};

export default AvatarGroup;
