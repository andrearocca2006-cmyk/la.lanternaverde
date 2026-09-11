'use client';

import {useEffect, useState} from 'react';
import {ArrowUpRight} from 'lucide-react';

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
