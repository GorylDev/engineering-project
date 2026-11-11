"use client";

import Form from "next/form";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ActionButton, ViewTransition } from "@/components/motion-ui";

const questions = [
  {
    field: "occasion",
    title: "Kiedy chcesz nosić ten zapach?",
    options: [
      ["everyday", "Na co dzień"],
      ["work", "Do pracy"],
      ["evening", "Na wieczór"],
      ["outdoors", "W ciepłe dni"],
      ["", "Jeszcze nie wiem"],
    ],
  },
  {
    field: "family",
    title: "Jaki zapach lubisz?",
    options: [
      ["fresh", "Świeży, jak cytrusy i zielone liście"],
      ["floral", "Kwiatowy, jak piwonia lub jaśmin"],
      ["woody", "Drzewny, jak cedr i suche drewno"],
      ["amber", "Ciepły, jak wanilia i przyprawy"],
      ["", "Jeszcze nie wiem"],
    ],
  },
] as const;

export function ChoiceWizard() {
  const [step, setStep] = useState<0 | 1>(0);
  const [answers, setAnswers] = useState({ occasion: "", family: "" });
  const question = questions[step];
  const legend = useRef<HTMLLegendElement>(null);
  const stepChanged = useRef(false);

  useEffect(() => {
    if (stepChanged.current) legend.current?.focus();
  }, [step]);

  function changeStep(nextStep: 0 | 1) {
    stepChanged.current = true;
    setStep(nextStep);
  }

  return (
    <Form
      className="wizard"
      action="/szukaj"
      onSubmit={(event) => {
        if (step === 0) {
          event.preventDefault();
          changeStep(1);
        }
      }}
    >
      {step === 1 && <input type="hidden" name="occasion" value={answers.occasion} />}
      <p className="wizard-progress" aria-live="polite">
        Pytanie {step + 1} z {questions.length}
      </p>
      <ViewTransition key={step}>
        <fieldset className="wizard-fieldset">
          <legend ref={legend} tabIndex={-1}>
            {question.title}
          </legend>
          <div className="wizard-options">
            {question.options.map(([value, label]) => (
              <label className="wizard-option" key={value}>
                <input
                  type="radio"
                  name={question.field}
                  value={value}
                  checked={answers[question.field] === value}
                  onChange={() => setAnswers({ ...answers, [question.field]: value })}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      </ViewTransition>
      <div className="wizard-actions">
        {step === 0 ? (
          <Link className="text-link" href="/szukaj">
            Przejdź do katalogu
          </Link>
        ) : (
          <ActionButton className="button button-outline" onClick={() => changeStep(0)}>
            Wstecz
          </ActionButton>
        )}
        <ActionButton type="submit" className="button button-primary">
          {step === 0 ? "Dalej" : "Pokaż wyniki"} <span aria-hidden="true">→</span>
        </ActionButton>
      </div>
    </Form>
  );
}
