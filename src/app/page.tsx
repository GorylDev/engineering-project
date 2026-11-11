import Image from "next/image";
import Link from "next/link";
import stillLife from "../../public/olfunara-still-life.webp";
import { previewPerfumes } from "@/modules/catalog/demo/preview-perfumes";
import { occasions } from "@/modules/catalog/preview-types";
import { PerfumeCard } from "@/modules/catalog/ui/perfume-card";
import { previewSearchHref } from "@/modules/search/preview-search";
import { SearchBox } from "@/modules/search/ui/search-box";

const occasionDescriptions: Record<keyof typeof occasions, string> = {
  everyday: "Od porannej kawy po spacer",
  work: "Do wspólnej przestrzeni",
  evening: "Na kolację i wyjście",
  outdoors: "Kiedy przydaje się lekkość",
};

const occasionIcons: Record<keyof typeof occasions, string> = {
  everyday: "✳",
  work: "◇",
  evening: "☾",
  outdoors: "☼",
};

const guide = [
  {
    title: "Nuty",
    description:
      "Nuty opisują, co można wyczuć w kompozycji. Otwarcie to pierwsze wrażenie, serce rozwija się później, a baza zwykle zostaje najdłużej.",
  },
  {
    title: "Rodziny",
    description:
      "Rodzina nazywa ogólny charakter zapachu. Drzewne kompozycje mogą przywoływać cedr lub sandałowiec, a świeże często kojarzą się z cytrusami albo zielenią.",
  },
  {
    title: "Koncentracje",
    description:
      "EDT to woda toaletowa, a EDP to woda perfumowana. EDP zwykle ma wyższą koncentrację substancji zapachowych. Trwałość zależy też od kompozycji i skóry.",
  },
];

export default function HomePage() {
  return (
    <main id="tresc" tabIndex={-1} className="shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Odkrywanie perfum</p>
          <h1 id="hero-title">
            Znajdź zapach <em>dla siebie.</em>
          </h1>
          <p className="hero-description">
            Szukaj perfum według nazwy, nut lub okazji. Jeśli dopiero zaczynasz, kreator pomoże Ci
            zawęzić wybór.
          </p>
          <SearchBox />
          <div className="hero-actions">
            <Link href="/wybor" className="text-link">
              Pomóż mi wybrać <span aria-hidden="true">↗</span>
            </Link>
            <Link href="/szukaj" className="text-link">
              Wyszukiwanie zaawansowane <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <figure className="hero-image">
          <Image
            src={stillLife}
            alt=""
            sizes="(min-width: 1280px) 555px, (min-width: 800px) 47vw, 94vw"
            preload
          />
        </figure>
      </section>

      <section id="odkrywaj" className="home-section" aria-labelledby="occasions-title">
        <div className="section-heading">
          <div>
            <h2 id="occasions-title">Zapach na okazję</h2>
            <p>Wybierz sytuację, w której chcesz go nosić.</p>
          </div>
        </div>
        <ul className="occasion-grid">
          {Object.entries(occasions).map(([id, label]) => {
            const occasion = id as keyof typeof occasions;
            return (
              <li key={occasion}>
                <Link className="occasion-card" href={previewSearchHref({ occasion })}>
                  <span className="occasion-icon" aria-hidden="true">
                    {occasionIcons[occasion]}
                  </span>
                  <span>
                    <strong>{label}</strong>
                    <small>{occasionDescriptions[occasion]}</small>
                  </span>
                  <span className="occasion-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="home-section" aria-labelledby="examples-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Katalog demonstracyjny</p>
            <h2 id="examples-title">Cztery różne kompozycje</h2>
            <p>Fikcyjne profile do wypróbowania wyszukiwarki i kart perfum.</p>
          </div>
          <Link href="/szukaj" className="text-link">
            Przejdź do katalogu <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="perfume-grid">
          {previewPerfumes.map((perfume) => (
            <PerfumeCard key={perfume.slug} perfume={perfume} />
          ))}
        </div>
      </section>

      <section id="przewodnik" className="home-section guide" aria-labelledby="guide-title">
        <div className="section-heading">
          <h2 id="guide-title">Krótki przewodnik po perfumach</h2>
        </div>
        <div className="guide-grid">
          {guide.map(({ title, description }) => (
            <article key={title} className="guide-card">
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="oferty" className="home-section offers" aria-labelledby="offers-title">
        <div>
          <h2 id="offers-title">Gdzie kupić?</h2>
          <p>
            Porównanie ofert i sklep Olfunara są planowane. Wersja demonstracyjna nie zawiera cen
            ani ofert sprzedaży.
          </p>
        </div>
        <dl>
          <div>
            <dt>Oferty zewnętrzne</dt>
            <dd>
              Porównanie tej samej pojemności i koncentracji według ceny z dostawą. Przy każdej
              ofercie pojawi się czas sprawdzenia ceny.
            </dd>
          </div>
          <div>
            <dt>Sklep Olfunara</dt>
            <dd>
              Własna oferta będzie oznaczona jako sprzedaż Olfunary. O kolejności ofert zdecyduje
              wybrane kryterium porównania.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
