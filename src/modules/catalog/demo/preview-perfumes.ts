import type { PerfumePreview } from "../preview-types";

export const previewPerfumes: PerfumePreview[] = [
  {
    slug: "zielony-swit",
    name: "Zielony świt",
    family: "fresh",
    occasions: ["everyday", "work", "outdoors"],
    concentration: "edt",
    description: "Cytrusowy początek, zielona herbata w sercu i lekkie, piżmowe wykończenie.",
    notes: { opening: "Bergamotka", heart: "Zielona herbata", base: "Białe piżmo" },
  },
  {
    slug: "cichy-cedr",
    name: "Cichy cedr",
    family: "woody",
    occasions: ["work", "evening"],
    concentration: "edp",
    description: "Suchy cedr z akcentem kardamonu i ziemistą nutą wetywerii.",
    notes: { opening: "Kardamon", heart: "Cedr", base: "Wetyweria" },
  },
  {
    slug: "po-zmierzchu",
    name: "Po zmierzchu",
    family: "amber",
    occasions: ["evening"],
    concentration: "edp",
    description: "Przyprawowe otwarcie przechodzi w ciepłą wanilię i żywiczne labdanum.",
    notes: { opening: "Czarny pieprz", heart: "Wanilia", base: "Labdanum" },
  },
  {
    slug: "ogrod-po-deszczu",
    name: "Ogród po deszczu",
    family: "floral",
    occasions: ["everyday", "outdoors"],
    concentration: "edt",
    description: "Lekka kompozycja z liściem fiołka, piwonią i subtelnym piżmem.",
    notes: { opening: "Liść fiołka", heart: "Piwonia", base: "Białe piżmo" },
  },
];
