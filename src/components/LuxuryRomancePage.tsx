"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Moon,
  Pause,
  Play,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { couple, dreams, gallery, letters, storyTimeline, voiceMessage } from "@/lib/content";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  initial: { opacity: 0, y: 34 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.8, ease: smoothEase },
};

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-5 flex items-center gap-4 text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-rosewood dark:text-champagne">
      <span className="h-px w-10 bg-current" />
      {children}
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = stored ? stored === "dark" : prefersDark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      aria-label="Toggle color theme"
      onClick={toggle}
      className="fixed right-4 top-4 z-40 grid size-11 place-items-center rounded-full border border-white/30 bg-black/35 text-white shadow-luxury backdrop-blur-xl transition hover:scale-105 dark:border-white/15"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        delay: (index % 7) * 0.7,
        duration: 8 + (index % 5),
        size: 2 + (index % 3),
      })),
    [],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute bottom-[-24px] rounded-full bg-champagne/45"
          style={{
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          animate={{ y: ["0vh", "-110vh"], opacity: [0, 0.8, 0] }}
          transition={{
            repeat: Infinity,
            delay: particle.delay,
            duration: particle.duration,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, 120]);
  const textY = useTransform(scrollY, [0, 700], [0, -70]);

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-night pb-16 pt-28 text-white">
      <motion.img
        src={couple.heroImage}
        alt="Luxury romantic hero"
        style={{ y: imageY }}
        className="absolute inset-0 h-[115%] w-full object-cover object-[58%_50%] opacity-[.82]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.55)_55%,rgba(0,0,0,.88))]" />
      <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <a href="#top" className="font-display text-2xl italic tracking-wide">
          {couple.initials}
        </a>
        <nav className="hidden items-center gap-8 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/80 md:flex">
          <a href="#story" className="transition hover:text-white">
            Story
          </a>
          <a href="#gallery" className="transition hover:text-white">
            Gallery
          </a>
          <a href="#letters" className="transition hover:text-white">
            Letters
          </a>
          <a href="#dreams" className="transition hover:text-white">
            Dreams
          </a>
        </nav>
      </div>
      <motion.div
        id="top"
        style={{ y: textY }}
        className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: smoothEase }}
          className="max-w-4xl"
        >
          <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.38em] text-champagne">
            {couple.date}
          </p>
          <h1 className="font-display text-[4.1rem] font-medium leading-[0.86] tracking-normal sm:text-[6.4rem] lg:text-[9.5rem]">
            {couple.partnerOne}
            <span className="block italic text-champagne">& {couple.partnerTwo}</span>
          </h1>
          <div className="mt-9 h-px w-full max-w-xl luxury-rule" />
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
            A cinematic archive of love, memories, quiet promises, personal letters,
            voice notes, and the beautiful future being designed together.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="bg-ivory px-5 py-24 dark:bg-night sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div {...fadeUp}>
          <SectionLabel>Our Story</SectionLabel>
          <h2 className="font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
            The kind of love that becomes architecture.
          </h2>
        </motion.div>
        <div className="space-y-5">
          {storyTimeline.map((item, index) => (
            <motion.article
              key={item.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              className="group border-t border-ink/[.12] py-8 dark:border-white/[.14]"
            >
              <div className="grid gap-4 sm:grid-cols-[0.35fr_1fr]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rosewood dark:text-champagne">
                  {item.year}
                </p>
                <div>
                  <h3 className="font-display text-3xl leading-tight">{item.title}</h3>
                  <p className="mt-3 max-w-2xl leading-8 text-ink/70 dark:text-white/70">{item.copy}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? null : gallery[active];

  return (
    <section id="gallery" className="bg-pearl px-5 py-24 dark:bg-[#0f0f0f] sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Photo Gallery</SectionLabel>
            <h2 className="max-w-3xl font-display text-5xl leading-none sm:text-6xl">
              A quiet museum of the moments that stayed.
            </h2>
          </div>
          <p className="max-w-sm leading-8 text-ink/60 dark:text-white/60">
            Replace these with your own photographs for the most personal finish.
          </p>
        </motion.div>
        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {gallery.map((image, index) => (
            <motion.button
              key={image.src}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.04 }}
              onClick={() => setActive(index)}
              className={`group relative overflow-hidden rounded-[8px] bg-ink/10 shadow-luxury ${
                index === 0 || index === 3 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/[.88] p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <button
              aria-label="Close image"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur"
            >
              <X size={20} />
            </button>
            <button
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                setActive((active ?? 0) === 0 ? gallery.length - 1 : (active ?? 0) - 1);
              }}
              className="absolute left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur"
            >
              <ChevronLeft size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              src={selected.src}
              alt={selected.alt}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[86vh] w-full max-w-6xl rounded-[8px] object-contain"
            />
            <button
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                setActive((active ?? 0) === gallery.length - 1 ? 0 : (active ?? 0) + 1);
              }}
              className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white backdrop-blur"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function Letters() {
  return (
    <section id="letters" className="bg-ivory px-5 py-24 dark:bg-night sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mb-12 max-w-3xl">
          <SectionLabel>Personal Letters</SectionLabel>
          <h2 className="font-display text-5xl leading-none sm:text-6xl">
            Words kept with the same care as jewelry.
          </h2>
        </motion.div>
        <div className="grid gap-5 md:grid-cols-2">
          {letters.map((letter, index) => (
            <motion.article
              key={letter.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.08 }}
              className="glass rounded-[8px] border border-ink/10 p-8 shadow-luxury dark:border-white/10 sm:p-10"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rosewood dark:text-champagne">
                {letter.label}
              </p>
              <h3 className="mt-8 font-display text-4xl leading-tight">{letter.title}</h3>
              <p className="mt-6 text-lg leading-9 text-ink/70 dark:text-white/70">{letter.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoiceMessage() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function togglePlayback() {
    const audio = audioRef.current;
    if (!voiceMessage.audioSrc || !audio) {
      setPlaying((current) => !current);
      return;
    }

    if (audio.paused) {
      void audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  return (
    <section className="relative overflow-hidden bg-night px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32">
      <div className="absolute inset-0 bg-fine-noise opacity-70" />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div {...fadeUp}>
          <SectionLabel>Voice Message</SectionLabel>
          <h2 className="font-display text-5xl leading-none sm:text-6xl">
            A voice note for the moments words need warmth.
          </h2>
        </motion.div>
        <motion.div
          {...fadeUp}
          className="rounded-[8px] border border-white/[.12] bg-white/[0.06] p-7 shadow-luxury backdrop-blur-xl sm:p-10"
        >
          <div className="flex items-center gap-5">
            <button
              aria-label={playing ? "Pause voice message" : "Play voice message"}
              onClick={togglePlayback}
              className="grid size-16 shrink-0 place-items-center rounded-full bg-champagne text-ink transition hover:scale-105"
            >
              {playing ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
            </button>
            {voiceMessage.audioSrc ? (
              <audio
                ref={audioRef}
                src={voiceMessage.audioSrc}
                onEnded={() => setPlaying(false)}
                preload="metadata"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-champagne">
                {voiceMessage.title}
              </p>
              <div className="mt-4 flex h-12 items-center gap-1">
                {Array.from({ length: 40 }, (_, index) => (
                  <motion.span
                    key={index}
                    className="w-1 rounded-full bg-white/70"
                    animate={{ height: playing ? [8, 34 - (index % 7) * 3, 10] : 12 + (index % 8) * 3 }}
                    transition={{ repeat: playing ? Infinity : 0, duration: 0.9, delay: index * 0.025 }}
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="mt-8 leading-8 text-white/70">
            {voiceMessage.transcript}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function Dreams() {
  return (
    <section id="dreams" className="bg-pearl px-5 py-24 dark:bg-[#0f0f0f] sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div {...fadeUp}>
          <SectionLabel>Future Dreams</SectionLabel>
          <h2 className="font-display text-5xl leading-none sm:text-6xl">
            The bucket list is really a love letter to tomorrow.
          </h2>
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2">
          {dreams.map((dream, index) => (
            <motion.div
              key={dream}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: index * 0.05 }}
              className="flex min-h-28 items-start gap-4 rounded-[8px] border border-ink/10 bg-white/[.55] p-5 dark:border-white/10 dark:bg-white/[0.04]"
            >
              <span className="mt-1 grid size-7 shrink-0 place-items-center rounded-full bg-rosewood text-white dark:bg-champagne dark:text-ink">
                <Check size={15} />
              </span>
              <p className="leading-7 text-ink/75 dark:text-white/75">{dream}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-night px-5 py-24 text-white sm:px-8 lg:px-12">
      <img
        src="https://images.unsplash.com/photo-1529634597503-139d3726fed5?auto=format&fit=crop&w=2000&q=85"
        alt="Elegant evening celebration"
        className="absolute inset-0 h-full w-full object-cover opacity-[.38]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(216,191,147,.18),transparent_28%),linear-gradient(180deg,rgba(0,0,0,.36),rgba(0,0,0,.88))]" />
      <motion.div {...fadeUp} className="relative z-10 mx-auto max-w-4xl text-center">
        <Sparkles className="mx-auto mb-8 text-champagne" size={30} />
        <h2 className="font-display text-5xl leading-none sm:text-7xl lg:text-8xl">
          Thank you, Annie, for becoming the most beautiful part of my life.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/70">
          For every smile, every memory, every little moment, and every dream I now
          see with you in it. Mittu and Suttu is my favorite story, and loving you is
          the promise I want to keep choosing every day.
        </p>
        <div className="mx-auto mt-10 flex w-fit items-center gap-3 text-champagne">
          <Heart size={18} fill="currentColor" />
          <span className="font-display text-2xl italic">{couple.initials}</span>
          <Heart size={18} fill="currentColor" />
        </div>
      </motion.div>
    </section>
  );
}

export default function LuxuryRomancePage() {
  return (
    <main className="relative overflow-hidden">
      <ThemeToggle />
      <Particles />
      <Hero />
      <Story />
      <Gallery />
      <Letters />
      <VoiceMessage />
      <Dreams />
      <Closing />
    </main>
  );
}
