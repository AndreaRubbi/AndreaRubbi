'use strict';

/* ============================================================================
   YOUR BLOG POSTS  —  THIS IS THE ONLY FILE YOU NEED TO EDIT TO BLOG
   ----------------------------------------------------------------------------
   Each post is one object in the BLOG_POSTS array below. To publish a new
   post, copy an existing { … } block, paste it at the TOP of the list, and
   change the fields. Posts are shown newest-first automatically (by `date`).

   Fields:
     title    – the headline
     date     – "YYYY-MM-DD"  (used for ordering + shown as e.g. "Jun 2026")
     tag      – short category label shown as a chip
     icon     – an Ionicon name for the card/banner (browse: ionic.io/ionicons)
     excerpt  – 1–2 sentence teaser shown on the card
     body     – the full article, written in **Markdown**
                (use `#`, `##` headings, **bold**, *italic*, - lists,
                 [links](https://…), > quotes, `code`, etc.)

   Tip: keep the body inside the backticks ` ` … ` `. You can write as many
   paragraphs as you want — just leave a blank line between them.
   ============================================================================ */

window.BLOG_POSTS = [

  {
    title: "Why flow matching is a natural fit for perturbation modeling",
    date: "2026-06-01",
    tag: "Machine Learning",
    icon: "git-network-outline",
    excerpt: "Perturbations move cells from one state to another. Flow matching lets us learn that transport directly — here's the intuition, and where it breaks down.",
    body: `
Perturbations — a drug, a knockout, a signal — nudge a cell from one state to
another. If we think of gene-expression profiles as points in a
high-dimensional space, a perturbation is really a **map** between two
distributions of cells.

## The core idea

Flow matching learns a velocity field that continuously transports one
distribution into another. Instead of predicting a single endpoint, we learn
*how the cell moves* along the way.

- It gives us a principled notion of "distance travelled".
- It's simulation-free to train, so it scales to large single-cell datasets.
- The learned field is reusable across conditions.

## Where it breaks down

The clean story assumes the transport is smooth and roughly deterministic.
Real biology is noisy and multi-modal — cells can respond in genuinely
different ways to the same perturbation. That's where mixture-conditioned
bases and stochastic paths start to matter.

> Replace this text with your own writing — this is just a starter post to
> show how the blog renders. Delete or edit freely!
`
  },

  {
    title: "Reading single-cell data as a dynamical system",
    date: "2026-04-15",
    tag: "Single-cell",
    icon: "cellular-outline",
    excerpt: "Treating expression profiles as points on a manifold changes how we think about trajectories, heterogeneity, and what a \"cell state\" really is.",
    body: `
A single-cell dataset is often treated as a static snapshot. But cells are
*always in motion* — differentiating, cycling, responding. What if we read the
data as samples from a **dynamical system**?

## Manifolds, not clusters

Clusters answer "how many types?". Manifolds answer "how are states
connected?". The second question is usually the interesting one.

1. Trajectories become paths on the manifold.
2. Heterogeneity becomes local geometry.
3. A "cell state" becomes a neighbourhood, not a label.

This is placeholder content — swap in your real notes.
`
  },

  {
    title: "Notes on evaluating generative models of gene expression",
    date: "2026-02-10",
    tag: "Evaluation",
    icon: "analytics-outline",
    excerpt: "Good samples aren't enough. A short tour of the metrics that actually correlate with biological usefulness — and the traps I keep falling into.",
    body: `
Generative models of gene expression are easy to build and hard to *trust*.
Pretty UMAPs don't mean the samples are biologically faithful.

## Metrics that matter

- **Distributional distance** on held-out perturbations, not just training data.
- **Calibration** — does the model know when it's unsure?
- **Downstream utility** — do samples help a real analysis?

## Traps I keep falling into

Optimising a metric until it stops measuring what I care about. Every. Single.
Time.

Edit this post with your own take — it's just here to demo the layout.
`
  }

];
