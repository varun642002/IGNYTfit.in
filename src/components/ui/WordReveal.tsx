import type { CSSProperties } from "react";

/**
 * A heading that rises word by word from behind a clipping edge.
 *
 * A **server** component: it splits a string on whitespace and emits one masked
 * span per word. The motion is the `.word-mask` scroll-driven animation in
 * globals.css, so this costs no JavaScript and needs no measurement — unlike
 * every "split text" library, which measures the DOM on mount and re-measures
 * on every resize.
 *
 * WHERE TO USE IT
 *
 * Marketing section headings, and nothing else. Not on legal documents, not on
 * form labels, not in navigation, not on body copy. Text somebody is trying to
 * *act on* should be still; text that is telling a story can move. Animating
 * everything is how a site stops feeling premium and starts feeling tiring.
 *
 * The words are emitted in document order as ordinary text, so the heading
 * stays selectable, searchable and translatable, and a screen reader announces
 * it normally — the spans are presentational. This is not a substitute for a
 * real heading element: pass the tag you actually mean.
 */
export function WordReveal({
  text,
  className,
  as: Tag = "span",
  id,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  id?: string;
}) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag id={id} className={className}>
      {words.map((word, index) => (
        /* The space lives BETWEEN the masked boxes, never inside one. Inside,
           it would be clipped along with the word and the heading would set
           solid. Keeping it a real text node also means selection and
           copy-and-paste still produce ordinary prose. */
        <span key={`${word}-${index}`}>
          <span
            className="word-mask"
            /* Capped at ten: past that the offset stops reading as rhythm and
               starts reading as a word that will not arrive. */
            style={{ "--i": Math.min(index, 10) } as CSSProperties}
          >
            <span>{word}</span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
