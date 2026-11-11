import { concentrations, families, occasions, type PerfumePreview } from "../catalog/preview-types";

export const filterKeys = ["q", "family", "occasion", "concentration", "note", "exclude"] as const;

export type PreviewFilters = {
  q: string;
  family: keyof typeof families | "";
  occasion: keyof typeof occasions | "";
  concentration: keyof typeof concentrations | "";
  note: string;
  exclude: string;
};
type RawFilters = Record<string, string | string[] | undefined>;

const textLimit = 80;

function readText(value: RawFilters[string]) {
  return typeof value === "string" ? value.trim().slice(0, textLimit) : "";
}

function readOption<Key extends string>(value: RawFilters[string], options: Record<Key, string>) {
  return typeof value === "string" && Object.hasOwn(options, value) ? (value as Key) : "";
}

export function readPreviewFilters(params: RawFilters): PreviewFilters {
  return {
    q: readText(params.q),
    family: readOption(params.family, families),
    occasion: readOption(params.occasion, occasions),
    concentration: readOption(params.concentration, concentrations),
    note: readText(params.note),
    exclude: readText(params.exclude),
  };
}

export function previewSearchHref(filters: Partial<PreviewFilters> = {}) {
  const params = new URLSearchParams();
  for (const key of filterKeys) {
    if (filters[key]) params.set(key, filters[key]);
  }
  return params.size ? `/szukaj?${params}` : "/szukaj";
}

function normalize(value: string) {
  return value.toLocaleLowerCase("pl").normalize("NFD").replace(/\p{M}/gu, "").replaceAll("ł", "l");
}

export function filterPerfumePreviews(perfumes: PerfumePreview[], filters: PreviewFilters) {
  const query = normalize(filters.q).split(/\s+/).filter(Boolean);
  const note = normalize(filters.note);
  const exclude = normalize(filters.exclude);

  return perfumes.filter((perfume) => {
    const notes = Object.values(perfume.notes).map(normalize);
    const searchable = [normalize(perfume.name), ...notes].join(" ");

    return (
      (!filters.family || perfume.family === filters.family) &&
      (!filters.occasion || perfume.occasions.some((occasion) => occasion === filters.occasion)) &&
      (!filters.concentration || perfume.concentration === filters.concentration) &&
      query.every((word) => searchable.includes(word)) &&
      (!note || notes.some((entry) => entry.includes(note))) &&
      (!exclude || !notes.some((entry) => entry.includes(exclude)))
    );
  });
}
