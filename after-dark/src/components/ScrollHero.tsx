import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Slide = {
  tag: string;
  accent: string;
  line: string;
  description: string;
};

type ScrollHeroProps = {
  current: Slide;
  slide: number;
  slides: Slide[];
  onBrowse: () => void;
  onSlideChange: (slide: number) => void;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function ScrollHero({
  current,
  slide,
  slides,
  onBrowse,
  onSlideChange,
}: ScrollHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = reduceMotion.matches;

    const update = () => {
      frameRef.current = null;
      const bounds = section.getBoundingClientRect();
      const stickyHero = section.firstElementChild as HTMLElement | null;
      const stickyOffset =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--site-header-height",
          ),
        ) || 0;
      const sectionTop = bounds.top + window.scrollY;
      const scrollDistance = Math.max(
        section.offsetHeight - (stickyHero?.offsetHeight ?? window.innerHeight),
        1,
      );
      const nextProgress = reduced
        ? 0
        : clamp(
            (window.scrollY - (sectionTop - stickyOffset)) / scrollDistance,
          );
      setProgress(nextProgress);

      const video = videoRef.current;
      if (!video || !videoReady || !Number.isFinite(video.duration) || reduced)
        return;
      // Seeking makes the long hero feel like a cinematic scrubber instead of a
      // video that disappears while the visitor is reading the copy.
      const nextTime = Math.min(
        video.duration - 0.05,
        nextProgress * video.duration,
      );
      if (Math.abs(video.currentTime - nextTime) > 0.08)
        video.currentTime = Math.max(0, nextTime);
    };

    const requestUpdate = () => {
      if (frameRef.current === null)
        frameRef.current = window.requestAnimationFrame(update);
    };
    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      reduced = event.matches;
      requestUpdate();
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reduceMotion.addEventListener("change", onReducedMotionChange);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reduceMotion.removeEventListener("change", onReducedMotionChange);
      if (frameRef.current !== null)
        window.cancelAnimationFrame(frameRef.current);
    };
  }, [videoReady]);

  const videoScale = 1.06 + progress * 0.09;
  const videoTranslate = `${progress * -2}% ${progress * 2}%`;
  const contentTransform = `translate3d(0, ${progress * -18}px, 0) scale(${1 - progress * 0.035})`;

  return (
    <section
      className="hero-scroll"
      ref={sectionRef}
      aria-label="After dark fireworks"
    >
      <div className="hero-sticky">
        <video
          ref={videoRef}
          className="hero-video"
          src="/video/video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedMetadata={() => setVideoReady(true)}
          onCanPlay={() => {
            setVideoReady(true);
            void videoRef.current?.play().catch(() => undefined);
          }}
          style={{
            transform: `translate(${videoTranslate}) scale(${videoScale})`,
          }}
        />
        <div className="hero-video-overlay" aria-hidden="true" />
        <div className="hero-video-vignette" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-top-note">
          <span className="live-dot" />
          <span>Scroll the night into focus</span>
        </div>

        <div
          className="hero-progress"
          aria-label={`Hero progress ${Math.round(progress * 100)} percent`}
        >
          <div className="hero-progress-track">
            <span style={{ transform: `scaleY(${progress})` }} />
          </div>
          <span className="hero-progress-value">
            {String(Math.round(progress * 100)).padStart(2, "0")}
          </span>
        </div>

        <div
          className="hero-content shop-container"
          key={slide}
          style={{ transform: contentTransform }}
        >
          <div className="eyebrow">
            <span className="status-dot" />
            {current.tag}
          </div>
          <h1 className="hero-title">
            <span>{current.accent}</span>
            <span className="outline-word">{current.line}</span>
          </h1>
          <p className="hero-description">{current.description}</p>
          <div className="hero-actions">
            <Button className="hero-action" onClick={onBrowse}>
              Shop the drop <ArrowRight size={15} />
            </Button>
            <Button
              variant="outline"
              className="hero-action hero-secondary"
              onClick={onBrowse}
            >
              Explore the edit <ArrowDown size={15} />
            </Button>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-bottom-label">
            <BadgeCheck /> Big night. Bigger energy.
          </div>
          <div className="slide-controls">
            {slides.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                aria-label={`Celebration slide ${index + 1}`}
                aria-pressed={index === slide}
                onClick={() => onSlideChange(index)}
              >
                <span
                  className={`slide-indicator ${index === slide ? "active" : ""}`}
                />
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Scroll to collection"
            onClick={onBrowse}
          >
            <ArrowDown size={16} />
          </Button>
        </div>

        <div className="hero-scroll-cue" aria-hidden="true">
          <span>Keep scrolling</span>
          <span
            className="hero-scroll-cue-line"
            style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }}
          />
        </div>
      </div>
    </section>
  );
}
