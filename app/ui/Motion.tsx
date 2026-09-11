'use client';

import {useEffect, useRef, useState} from 'react';
import {ArrowDown, ArrowUpRight} from 'lucide-react';

export function MotionHero() {
  return (
    <section className="hero">
      <picture>
        <source media="(max-width: 700px)" srcSet="/motion/hero-chef-mobile.webp" />
        <img
          className="hero-poster"
          src="/motion/hero-chef-desktop.webp"
          alt="Pizzaiolo che prepara l’impasto accanto al forno a legna"
          width="2560"
          height="1440"
          fetchPriority="high"
        />
      </picture>
      <div className="hero-fire-glow" aria-hidden="true" />
      <div className="hero-shade" />
      <div className="hero-copy">
        <p className="eyebrow">VIA NAPOLI 99 · BARI</p>
        <h1>
          Ristorante e pizzeria a Bari,
          <br />
          dove la tradizione
          <br />è <em>di casa.</em>
        </h1>
        <p>
          Cucina italiana, sapori di mare e pizza a lievitazione naturale di 72 ore. Il piacere di
          ritrovarsi, a tavola.
        </p>
        <div className="actions">
          <a className="button" href="/prenota">
            Prenota un tavolo <ArrowUpRight size={18} />
          </a>
          <a className="button ghost" href="#menu">
            Guarda il menù
          </a>
        </div>
        <p className="hero-micro">
          Scegli data, orario e numero di persone.
          <br />
          La richiesta viene gestita direttamente dal ristorante.
        </p>
      </div>
    </section>
  );
}

export function LanternEffects() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches || !matchMedia('(pointer:fine) and (min-width:1024px)').matches) return;
    const glow = document.querySelector<HTMLElement>('.pointer-glow');
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (glow) glow.style.transform = `translate(${event.clientX - 130}px,${event.clientY - 130}px)`;
      });
    };
    window.addEventListener('pointermove', move, {passive: true});
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        }),
      {threshold: 0.08},
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <div className="pointer-glow" aria-hidden="true" />;
}

const pizzaSteps = [
  ['Impasto', 'La base soffice e ben maturata.'],
  ['Pomodoro', 'Il rosso intenso della Margherita.'],
  ['Mozzarella', 'Morbida, distribuita un gesto alla volta.'],
  ['Basilico', 'Il profumo fresco che completa tutto.'],
] as const;

export function PizzaJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const distance = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      const split = reducedMotion.matches ? 0 : Math.min(1, Math.max(0, (progress - 0.08) / 0.78));
      const reveal = Math.min(1, split * 3.2);

      section.style.setProperty('--pizza-progress', progress.toFixed(4));
      section.style.setProperty('--pizza-split', split.toFixed(4));
      section.style.setProperty('--pizza-reveal', reveal.toFixed(4));

      const nextActive = reducedMotion.matches ? 0 : Math.min(3, Math.floor(progress * 4.15));
      if (nextActive !== activeRef.current) {
        activeRef.current = nextActive;
        setActive(nextActive);
      }
    };

    const queueUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', queueUpdate, {passive: true});
    window.addEventListener('resize', queueUpdate, {passive: true});
    reducedMotion.addEventListener('change', queueUpdate);

    return () => {
      window.removeEventListener('scroll', queueUpdate);
      window.removeEventListener('resize', queueUpdate);
      reducedMotion.removeEventListener('change', queueUpdate);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="pizza-scroll" aria-labelledby="pizza-scroll-title">
      <div className="pizza-scroll-sticky">
        <div className="pizza-scroll-copy">
          <p className="eyebrow">DENTRO UNA MARGHERITA</p>
          <h2 id="pizza-scroll-title">
            Pochi ingredienti.
            <br />
            <em>Ognuno al suo posto.</em>
          </h2>
          <p className="pizza-scroll-intro">
            Scorri e guarda la pizza scomporsi: dalla base fino all’ultima foglia di basilico.
          </p>
          <ol className="pizza-scroll-steps">
            {pizzaSteps.map(([title, text], index) => (
              <li
                key={title}
                className={active === index ? 'active' : ''}
                aria-current={active === index ? 'step' : undefined}
              >
                <span>0{index + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="pizza-stack">
          <div className="pizza-aura" aria-hidden="true" />
          <img
            className="pizza-layer pizza-finished"
            src="/motion/pizza-layers/finished.webp"
            alt="Pizza Margherita completa vista dall’alto"
            width="1600"
            height="1600"
            loading="lazy"
          />
          <div className="pizza-components" aria-hidden="true">
            <img className="pizza-layer pizza-base" src="/motion/pizza-layers/base.webp" alt="" width="1600" height="1600" />
            <img className="pizza-layer pizza-tomato" src="/motion/pizza-layers/tomato.webp" alt="" width="1600" height="1600" />
            <img className="pizza-layer pizza-mozzarella" src="/motion/pizza-layers/mozzarella.webp" alt="" width="1600" height="1600" />
            <img className="pizza-layer pizza-basil" src="/motion/pizza-layers/basil.png" alt="" width="1600" height="1600" />
          </div>
          <figcaption>Ricostruzione illustrativa ad alta definizione degli ingredienti.</figcaption>
        </figure>

        <div className="pizza-scroll-cue" aria-hidden="true">
          <span>Scorri per scomporla</span>
          <ArrowDown size={18} />
        </div>
      </div>
    </section>
  );
}

export function Timeline() {
  const [active, setActive] = useState(0);
  return (
    <section className="pizza-section section" id="pizza">
      <div>
        <p className="eyebrow">IL TEMPO È UN INGREDIENTE</p>
        <h2>
          72 ore di attesa.
          <br />
          Pochi minuti per
          <br />
          <em>innamorarsene.</em>
        </h2>
        <p>
          La pizza della Lanterna Verde nasce da un impasto a lievitazione naturale di 72 ore. Un
          tempo dedicato alla preparazione, prima del calore del forno.
        </p>
        <p className="micro">
          Le fasi qui illustrate raccontano il percorso in modo indicativo: il procedimento esatto va
          confermato dal ristorante.
        </p>
        <div className="timeline" aria-label="Fasi indicative della lievitazione">
          {['Preparazione', 'Riposo', 'Maturazione', 'Pronto per il forno'].map((label, index) => (
            <button
              key={label}
              className={index <= active ? 'active' : ''}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              onFocus={() => setActive(index)}
              onMouseEnter={() => setActive(index)}
            >
              <strong>
                {index * 24}
                <small> ORE</small>
              </strong>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <figure className="oven-glow">
        <img
          src={active === 3 ? '/motion/margherita.webp' : '/motion/dough.webp'}
          alt={active === 3 ? 'Illustrazione di una Margherita appena sfornata' : 'Illustrazione del panetto della pizza'}
          width="960"
          height="534"
          loading="lazy"
        />
        <figcaption>Immagini illustrative, da sostituire con riprese autentiche.</figcaption>
      </figure>
    </section>
  );
}
