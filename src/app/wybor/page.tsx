import type { Metadata } from "next";
import { ChoiceWizard } from "@/modules/search/ui/choice-wizard";

export const metadata: Metadata = { title: "Pomóż mi wybrać" };

export default function ChoicePage() {
  return (
    <main id="tresc" tabIndex={-1} className="shell inner-page wizard-page">
      <p className="eyebrow">Kreator demonstracyjny</p>
      <h1>Pomóż mi wybrać</h1>
      <p className="page-intro">
        Dwa krótkie pytania pomogą zawęzić wybór w katalogu demonstracyjnym. Możesz pominąć każdą
        odpowiedź.
      </p>
      <ChoiceWizard />
    </main>
  );
}
