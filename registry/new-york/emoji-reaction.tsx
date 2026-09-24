"use client";

import type { Ref } from "react";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { SmilePlusIcon } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useCallback, useState } from "react";

import { cn } from "@/lib/utils";

export interface Reaction {
  emoji: string;
  count: number;
  reacted?: boolean;
}

export interface EmojiReactionProps {
  className?: string;
  /** Controlled list of reactions. */
  reactions?: Reaction[];
  /** Initial reactions when uncontrolled. */
  defaultReactions?: Reaction[];
  /** Called with the next list whenever the user toggles a reaction. */
  onReactionsChange?: (reactions: Reaction[]) => void;
  /** Emojis offered in the picker. */
  emojis?: string[];
  /** Hide the "add reaction" picker button. */
  hidePicker?: boolean;
  disabled?: boolean;
}

const DEFAULT_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🎉", "🔥", "👀"];

const EMPTY_REACTIONS: Reaction[] = [];

const spring = { bounce: 0.3, duration: 0.35, type: "spring" } as const;

const toggleReaction = (reactions: Reaction[], emoji: string): Reaction[] => {
  const existing = reactions.find((reaction) => reaction.emoji === emoji);

  if (!existing) {
    return [...reactions, { count: 1, emoji, reacted: true }];
  }

  return reactions
    .map((reaction) => {
      if (reaction.emoji !== emoji) {
        return reaction;
      }
      const reacted = !reaction.reacted;
      return {
        ...reaction,
        count: Math.max(0, reaction.count + (reacted ? 1 : -1)),
        reacted,
      };
    })
    .filter((reaction) => reaction.count > 0);
};

const AnimatedCount = ({ value }: { value: number }) => {
  const [prev, setPrev] = useState(value);
  const [direction, setDirection] = useState(1);

  if (value !== prev) {
    setDirection(value > prev ? 1 : -1);
    setPrev(value);
  }

  return (
    <span className="relative inline-flex overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.span
          key={value}
          custom={direction}
          variants={{
            animate: { opacity: 1, y: 0 },
            exit: (dir: number) => ({ opacity: 0, y: dir * -12 }),
            initial: (dir: number) => ({ opacity: 0, y: dir * 12 }),
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={spring}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

const ReactionPill = ({
  ref,
  reaction,
  disabled,
  onToggle,
}: {
  ref?: Ref<HTMLButtonElement>;
  reaction: Reaction;
  disabled?: boolean;
  onToggle: (emoji: string) => void;
}) => (
  <motion.button
    ref={ref}
    layout
    type="button"
    data-slot="emoji-reaction-item"
    data-reacted={reaction.reacted ? "" : undefined}
    aria-pressed={reaction.reacted ?? false}
    aria-label={`${reaction.emoji} ${reaction.count}`}
    disabled={disabled}
    onClick={() => onToggle(reaction.emoji)}
    initial={{ opacity: 0, scale: 0.6 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.6 }}
    whileTap={{ scale: 0.9 }}
    transition={spring}
    className={cn(
      "inline-flex h-7 items-center gap-1.5 rounded-full border bg-background px-2.5 text-xs font-medium text-muted-foreground transition-colors outline-none select-none",
      "hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-reacted:border-primary/40 data-reacted:bg-primary/10 data-reacted:text-primary"
    )}
  >
    <motion.span
      key={reaction.reacted ? "on" : "off"}
      aria-hidden
      className="text-sm leading-none"
      initial={reaction.reacted ? { rotate: -20, scale: 0.4 } : false}
      animate={{ rotate: 0, scale: 1 }}
      transition={{ bounce: 0.6, duration: 0.45, type: "spring" }}
    >
      {reaction.emoji}
    </motion.span>
    <AnimatedCount value={reaction.count} />
  </motion.button>
);

const EmojiPicker = ({
  emojis,
  reactions,
  disabled,
  onSelect,
}: {
  emojis: string[];
  reactions: Reaction[];
  disabled?: boolean;
  onSelect: (emoji: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        data-slot="emoji-reaction-trigger"
        aria-label="Add reaction"
        disabled={disabled}
        render={
          <motion.button
            layout
            type="button"
            whileTap={{ scale: 0.9 }}
            transition={spring}
          />
        }
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-full border border-dashed bg-background text-muted-foreground transition-colors outline-none",
          "hover:border-solid hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50",
          "disabled:pointer-events-none disabled:opacity-50 data-popup-open:border-solid data-popup-open:bg-accent"
        )}
      >
        <SmilePlusIcon className="size-3.5" />
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          side="top"
          align="start"
          sideOffset={6}
          className="isolate z-50"
        >
          <PopoverPrimitive.Popup
            data-slot="emoji-reaction-picker"
            aria-label="Pick a reaction"
            className="flex origin-(--transform-origin) gap-0.5 rounded-full bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          >
            {emojis.map((emoji, index) => {
              const reacted = reactions.some(
                (reaction) => reaction.emoji === emoji && reaction.reacted
              );

              return (
                <motion.button
                  key={emoji}
                  type="button"
                  aria-label={`React with ${emoji}`}
                  aria-pressed={reacted}
                  data-reacted={reacted ? "" : undefined}
                  onClick={() => {
                    onSelect(emoji);
                    setOpen(false);
                  }}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...spring, delay: index * 0.02 }}
                  whileHover={{ scale: 1.25, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex size-8 items-center justify-center rounded-full text-lg leading-none outline-none hover:bg-accent focus-visible:bg-accent data-reacted:bg-primary/10"
                >
                  {emoji}
                </motion.button>
              );
            })}
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export const EmojiReaction = ({
  className,
  reactions: reactionsProp,
  defaultReactions = EMPTY_REACTIONS,
  onReactionsChange,
  emojis = DEFAULT_EMOJIS,
  hidePicker = false,
  disabled = false,
}: EmojiReactionProps) => {
  const [internalReactions, setInternalReactions] = useState(defaultReactions);
  const isControlled = reactionsProp !== undefined;
  const reactions = isControlled ? reactionsProp : internalReactions;

  const handleToggle = useCallback(
    (emoji: string) => {
      const next = toggleReaction(reactions, emoji);
      if (!isControlled) {
        setInternalReactions(next);
      }
      onReactionsChange?.(next);
    },
    [isControlled, onReactionsChange, reactions]
  );

  return (
    <MotionConfig reducedMotion="user">
      <motion.fieldset
        layout
        aria-label="Reactions"
        data-slot="emoji-reaction"
        className={cn(
          "m-0 flex min-w-0 flex-wrap items-center gap-1.5 border-0 p-0",
          className
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {reactions.map((reaction) => (
            <ReactionPill
              key={reaction.emoji}
              reaction={reaction}
              disabled={disabled}
              onToggle={handleToggle}
            />
          ))}
        </AnimatePresence>
        {hidePicker ? null : (
          <EmojiPicker
            emojis={emojis}
            reactions={reactions}
            disabled={disabled}
            onSelect={handleToggle}
          />
        )}
      </motion.fieldset>
    </MotionConfig>
  );
};
