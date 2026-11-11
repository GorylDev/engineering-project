import Form from "next/form";
import { ActionButton } from "@/components/motion-ui";

export function SearchBox() {
  return (
    <Form action="/szukaj" className="hero-search" role="search">
      <label htmlFor="home-query">Nazwa perfum lub nuta</label>
      <div className="hero-search-row">
        <input id="home-query" name="q" type="search" maxLength={80} placeholder="np. bergamotka" />
        <ActionButton type="submit" className="button button-primary">
          Szukaj
        </ActionButton>
      </div>
    </Form>
  );
}
