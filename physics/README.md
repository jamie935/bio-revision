# Avi Tru's Physics Learning — made by Dad

A public, account-free revision site for Pearson Edexcel GCSE Physics Higher
Paper 1 (`1PH0/1H`). A separate static Vercel project lives in this folder; the
existing biology application elsewhere in this repository is unchanged.

## What Avi can do

- Answer original exam-style questions, press Enter, read feedback, go next.
- Practise all topics, choose a topic, use a paper-weighted mix or revisit due cards.
- See the model answer, underlying physics, worked method and common misconception.
- Browse/search the exam question bank and inspect source references. After marking, optionally save a principle to My learning cards.
- Try 25-, 50- or 100-mark timed practice (26:15, 52:30 or 105:00).
- Flag/revisit questions; answers and the running deadline survive a refresh.
- Review a marked paper, use an equation sheet and a local arithmetic calculator.
- Keep progress in the browser and export/import a JSON backup between devices.

The visual reference is [Atom Learning's GCSE site](https://www.atomlearning.com/gcse):
royal blue, navy, white cards, condensed headings and clear learning navigation.
Code, illustrations, identity and practice content are original. The fonts are
open-licensed Google Fonts; licences are included alongside their local assets.

## Source collection and coverage

The corpus is all **nine Higher question papers** and their paired mark schemes
linked on the [PMT Edexcel Paper 1 page](https://www.physicsandmathstutor.com/past-papers/gcse-physics/edexcel-paper-1/):
2018–2025 and the specimen. Foundation papers are excluded.

`data/sources.json` records the eighteen source links, retrieval time, byte sizes,
page counts and SHA-256 checksums. `data/papers/*.json` maps every separately
marked source part to its answer, learning objective, primary topic, marks,
one-based PDF pages and a newly written exam-style question. The internal `card` record is the question plus its feedback, not the default learning experience. Diagrams and graphs were
checked visually when needed. Source discrepancies are recorded in each paper's
`notes`; labels are not silently treated as proof of an exam date or correct answer.

The source PDFs and extracts stay in `.source-cache/` and are **not committed or
deployed**. They remain copyright Pearson. Public links let the learner inspect
the originals; published material contains original practice and factual analysis.

To reproduce the download, install Python 3 and Poppler (`pdftotext`), then:

```sh
python3 scripts/download-sources.py
```

The downloader rejects an unexpected index count for review instead of silently
changing the corpus. The collected set is a dated snapshot, not an automatic feed.

## Weighting and learning system

Every source part contributes its actual marks **once** to one primary topic.
Every paper reconciles to 100 marks; all nine, including the specimen, sum to
900. Practice sampling weights the source part by those marks, rather than by
the number of questions. Thus a six-mark explanation carries more selection
weight than a one-mark fact. The site shows the observed topic proportions.

Smart practice adjusts the base weights for unseen questions, due reviews and
previous errors. Missed questions become due after five minutes. Fully correct
answers are scheduled after 1, 3, 7, 14 and 30 days. The user can choose the plain
paper-weighted mix. Timed papers select unique questions up to exactly the
requested practice marks, balancing the topic deficits against the source mix.
These historic weights are not predictions of a future paper.

## Marking, accuracy and limits

- Multiple choice checks the correct statement, not the original source letter.
- Numerical answers support standard form, fractions, tolerances and unit aliases.
  A correct value with a missing/wrong unit can lose a practice mark. Automatic
  checking does not infer method marks from handwritten working.
- Written answers use explicit, visible criteria with phrase alternatives and a
  conservative negation check. Scores are labelled **suggested**. Equivalent
  wording can be missed; the learner can compare with the model and review each
  criterion. This is transparent practice feedback, not a human examiner or a
  semantic AI assessment. Reviewed scores are labelled separately in progress.
- Every model answer and numeric variant must earn full marks in validation;
  blank answers and choice distractors must earn zero. Data was checked against
  the supplied schemes but has not had an independent qualified teacher sign-off.
- Practice papers use fresh questions and the real 105-minutes-per-100-marks
  pace. They do not reproduce official multi-part layout, handwriting/drawing
  assessment or grade boundaries. No predicted GCSE grade is displayed.

## Run and test

Node.js 24 is used for deployment and CI. There are no runtime or build-package dependencies.

```sh
npm run build
npm test
npm run dev
```

Open `http://localhost:4173`. The build validates all nine files before generating
`dist/data/corpus.json`; missing coverage or invalid model answers fail the build.
Tests cover all correct answers, blank responses, distractors, tiny numerical
tolerances, weighted selection, timed-paper mark totals, deadlines and saved progress.

## Hosting and privacy

Vercel project: `avi-physics-learning` in `jamie935s-projects`.
For Git builds use repository `jamie935/bio-revision`, production branch `main`,
root directory `physics`, framework Other, build `npm run build`, output `dist`.
`vercel.json` supplies the build settings and basic response headers.

The site is publicly accessible with no login. No student answers leave the
browser, no API keys or external model calls are needed, and there are no app
analytics or advertising scripts. Progress is device/browser specific. Clearing
site data clears it; use Export to keep a backup. Hosting access logs are managed
by Vercel. The public site and repository contain Avi's branding as requested,
but no profile, contact details or learner history.

Future content changes should use a task branch and PR. Run the full validation
and tests, deploy from the merged source, and verify the real public destination.
`DATA_CONTRACT.md` documents the data format for adding or correcting questions.
