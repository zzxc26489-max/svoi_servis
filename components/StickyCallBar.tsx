"use client";

import { useEffect, useState } from "react";
import { BUSINESS, MASTERS } from "@/lib/business";
import { PhoneIcon, WhatsAppIcon } from "./icons";

// Липкая полоса звонка — только на мобильном. Страница длинная, и без
// неё человек, не долиставший до контактов, остаётся без способа
// связаться. Прячем её в двух случаях:
//   1) пока виден первый экран — там своя форма прямо перед глазами;
//   2) пока видна секция заявки — иначе полоса перекрывает ту самую
//      форму, ради которой человек долистал.
export default function StickyCallBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const order = document.getElementById("order");
    const targets = [hero, order].filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const blocking = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) blocking.add(entry.target);
          else blocking.delete(entry.target);
        }
        setVisible(blocking.size === 0);
      },
      // Небольшой отрицательный отступ снизу: полоса считается
      // мешающей, только когда секция реально в поле зрения.
      { rootMargin: "0px 0px -25% 0px" },
    );

    for (const target of targets) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const master = MASTERS[0];

  return (
    <div
      // visibility (а не только сдвиг) — чтобы скрытая полоса не ловила
      // фокус с клавиатуры и не читалась скринридером.
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/95 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        visible ? "visible translate-y-0" : "invisible translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div
        className="flex gap-2.5 px-4 py-3"
        // Отступ под системную полосу жестов на iPhone.
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <a
          href={`tel:${master.phoneHref}`}
          className="btn-primary flex-1 shadow-cta"
        >
          <PhoneIcon className="h-5 w-5 shrink-0" />
          Позвонить
        </a>
        <a
          href={BUSINESS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
          className="btn-ghost-light !px-4"
        >
          <WhatsAppIcon className="h-5 w-5 shrink-0 text-[#25D366]" />
        </a>
      </div>
    </div>
  );
}
