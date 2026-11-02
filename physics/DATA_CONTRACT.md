# Higher Paper 1 learning corpus

Source PDFs and extracted per-page text are in `.source-cache/` (ignored).
`data/sources.json` records the eighteen source URLs and SHA-256 hashes.
The published repository contains factual analysis and original practice, not
redistributed PDFs or transcriptions of the exam questions/mark schemes.

## Per-paper files

`data/papers/<year>.json` (year is 2018..2025 or specimen):

```json
{
  "paper": "2018",
  "totalMarks": 100,
  "reviewStatus": "question-and-mark-scheme-reviewed",
  "rows": [
    {
      "id": "2018-1ai",
      "question": "1(a)(i)",
      "marks": 1,
      "topic": "motion",
      "skill": "speed-distance-time",
      "answer": "Factual answer, in original wording, including numerical working/units if relevant.",
      "learning": "What the question is testing and how to approach that type of question.",
      "questionPage": 3,
      "markSchemePage": 6,
      "card": {
        "id": "2018-1ai",
        "title": "Distance, time and speed",
        "kind": "number",
        "prompt": "A NEW scenario and numbers, never a copy of the source question.",
        "marks": 2,
        "answer": 12,
        "unit": "m/s",
        "tolerance": 0.01,
        "modelAnswer": "A complete NEW model answer to the practice question.",
        "explanation": "Age 14-16 explanation of WHY the physics works, not just an answer.",
        "hint": "A small useful nudge without revealing the answer.",
        "steps": ["Choose the equation.", "Substitute in SI units.", "Calculate and state the unit."],
        "misconception": "A common error to avoid."
      }
    }
  ]
}
```

Each separately marked source part is one row. Include top-level parts such as
1(a), not only parts with Roman numerals. A row must have one PRIMARY topic
so marks are never double counted. All rows must sum to 100 per paper.
Page numbers are one-based PDF pages, not necessarily printed page numbers.
Read the full QP AND MS; use visual inspection for graphs, diagrams and tables.
Do not infer unreadable graph answers. Every row requires a new practice card.

Topics (use only these): `motion`, `forces`, `energy`, `waves`, `light`,
`electromagnetic`, `radioactivity`, `astronomy`, `skills`.
Assign experimental/graph skills to the physical topic when possible; `skills`
is for generic units, vector/scalar and measurement questions.

`kind: choice`: add `options` (array of four distinct strings) and `correctIndex`
(0..3); omit numeric answer/unit. Correct letters from a source are not an
analysis: explain the fact selected. The new question's options must not depend
on diagrams we have not provided. Describe a new diagram in words or use data.

`kind: text`: add `rubric` array, each `{ "point": "Clear creditworthy idea",
"patterns": ["regex alternative", "another alternative"] }`. Each criterion
earns one practice mark; number of criteria MUST equal the practice `marks`.
Use regex alternatives as short meaningful phrases; avoid broad one-word
matching. The app labels this automatic practice feedback and lets the learner
review unrecognised equivalent wording. Extended answers are practice estimates,
never labelled official examiner grades.

`kind: number`: correct numerical answer and reasonable absolute tolerance.
Single quantity per card; if the source had multiple quantities, teach one and
explain the other in the model answer. Default practice marks are 1 for choice,
2-3 for calculations, 2-4 for text, 6 for extended reasoning. Source marks and
practice marks need not match: source marks alone determine historical weights.

`kind: number` can optionally supply `variants`, an array of at least 2 fully
worked NEW `{prompt, answer, modelAnswer}` objects with the same unit/mark count.
This provides repeated numerical practice without recycling the source item.

Use plain strings and Unicode units (m/s², N, J, Hz); no HTML or Markdown needed.
Do not claim a complete paper if marks or parts remain unreviewed; record any
uncertainty in `notes` and report it to the owner.
