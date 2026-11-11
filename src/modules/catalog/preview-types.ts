export const families = {
  fresh: "Świeża",
  floral: "Kwiatowa",
  woody: "Drzewna",
  amber: "Ambrowa",
} as const;

export const occasions = {
  everyday: "Na co dzień",
  work: "Do pracy",
  evening: "Na wieczór",
  outdoors: "Na ciepłe dni",
} as const;

export const concentrations = {
  edt: "Woda toaletowa (EDT)",
  edp: "Woda perfumowana (EDP)",
} as const;

export type PerfumePreview = {
  slug: string;
  name: string;
  family: keyof typeof families;
  occasions: (keyof typeof occasions)[];
  concentration: keyof typeof concentrations;
  description: string;
  notes: { opening: string; heart: string; base: string };
};
