import { Fragment } from "react";

// Rend les marqueurs « [À CONFIRMER…] » / « [À COMPLÉTER…] » de façon visible,
// pour qu'aucune information non validée ne passe inaperçue.
const SPLIT = /(\[(?:À CONFIRMER|À COMPLÉTER)[^\]]*\])/;
const IS_MARK = /^\[(?:À CONFIRMER|À COMPLÉTER)/;

export function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split(SPLIT).map((part, i) =>
        IS_MARK.test(part) ? (
          <span key={i} className="todo">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
