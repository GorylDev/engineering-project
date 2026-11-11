"use client";

import Form from "next/form";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useId, useRef, useState } from "react";
import { ActionButton } from "@/components/motion-ui";
import { concentrations, families, occasions } from "@/modules/catalog/preview-types";
import type { PreviewFilters } from "../preview-search";

const selects = [
  { name: "family", label: "Rodzina zapachowa", options: families },
  { name: "occasion", label: "Okazja", options: occasions },
  { name: "concentration", label: "Koncentracja", options: concentrations },
] as const;

function FilterForm({ filters, onSubmit }: { filters: PreviewFilters; onSubmit?: () => void }) {
  const prefix = useId();

  return (
    <Form action="/szukaj" className="filter-form" onSubmit={onSubmit}>
      <label htmlFor={`${prefix}-q`}>
        Nazwa perfum lub nuta
        <input id={`${prefix}-q`} type="search" name="q" defaultValue={filters.q} maxLength={80} />
      </label>
      {selects.map(({ name, label, options }) => (
        <label htmlFor={`${prefix}-${name}`} key={name}>
          {label}
          <select id={`${prefix}-${name}`} name={name} defaultValue={filters[name]}>
            <option value="">Dowolna</option>
            {Object.entries(options).map(([value, text]) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))}
          </select>
        </label>
      ))}
      <label htmlFor={`${prefix}-note`}>
        Wymagana nuta
        <input
          id={`${prefix}-note`}
          name="note"
          defaultValue={filters.note}
          maxLength={80}
          placeholder="np. wanilia"
        />
      </label>
      <label htmlFor={`${prefix}-exclude`}>
        Wykluczona nuta
        <input
          id={`${prefix}-exclude`}
          name="exclude"
          defaultValue={filters.exclude}
          maxLength={80}
          placeholder="np. piżmo"
        />
      </label>
      <div className="filter-actions">
        <ActionButton type="submit" className="button button-primary">
          Zastosuj filtry
        </ActionButton>
        {Object.values(filters).some(Boolean) && (
          <Link href="/szukaj" className="text-link" onClick={() => onSubmit?.()}>
            Wyczyść filtry
          </Link>
        )}
      </div>
    </Form>
  );
}

export function PreviewFiltersPanel({
  filters,
  activeCount,
}: {
  filters: PreviewFilters;
  activeCount: number;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <>
      <aside className="filters-sidebar" aria-label="Filtry wyszukiwania">
        <h2>Filtry</h2>
        <FilterForm filters={filters} />
      </aside>
      <div className="filters-mobile">
        <ActionButton
          className="button button-outline filters-trigger"
          aria-haspopup="dialog"
          aria-label={`Filtry, aktywne warunki: ${activeCount}`}
          onClick={() => {
            dialog.current?.showModal();
            setIsOpen(true);
            close.current?.focus();
          }}
        >
          Filtry{" "}
          <span className="count" aria-hidden="true">
            {activeCount}
          </span>
        </ActionButton>
        <dialog
          ref={dialog}
          className="filters-dialog"
          aria-labelledby={titleId}
          onClose={() => setIsOpen(false)}
        >
          <motion.div
            className="filters-dialog-body"
            initial={false}
            animate={
              isOpen && !reducedMotion ? { opacity: [0.85, 1], y: [8, 0] } : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="dialog-header">
              <h2 id={titleId}>Filtry</h2>
              <button
                ref={close}
                className="button button-outline"
                onClick={() => dialog.current?.close()}
              >
                Zamknij
              </button>
            </div>
            <p className="filters-count">Aktywne warunki: {activeCount}</p>
            <FilterForm filters={filters} onSubmit={() => dialog.current?.close()} />
          </motion.div>
        </dialog>
      </div>
    </>
  );
}
