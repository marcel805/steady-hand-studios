"use client";

import { useState } from "react";

const CONTACT_EMAIL = "info@steadyhandstudios.co.za";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", brief: "" });

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `New brief from ${form.name || "the website"}`
  )}&body=${encodeURIComponent(
    `${form.brief}\n\n-\n${form.name}\n${form.email}`
  )}`;

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        // Opens the visitor's own mail client with the brief pre-filled -
        // there's no backend on this site to receive submissions directly.
        window.location.href = mailtoHref;
      }}
    >
      <label className="block text-sm">
        <span className="mb-1.5 block text-ink-soft">Your name</span>
        <input
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full rounded-[2px] border border-ink/30 bg-paper-2 px-3 py-2.5 text-ink outline-none focus-visible:border-ink"
          placeholder="Full name"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-ink-soft">Email</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full rounded-[2px] border border-ink/30 bg-paper-2 px-3 py-2.5 text-ink outline-none focus-visible:border-ink"
          placeholder="you@company.com"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-ink-soft">
          What do you need built?
        </span>
        <textarea
          required
          rows={4}
          value={form.brief}
          onChange={(e) => setForm((f) => ({ ...f, brief: e.target.value }))}
          className="w-full rounded-[2px] border border-ink/30 bg-paper-2 px-3 py-2.5 text-ink outline-none focus-visible:border-ink"
          placeholder="A sentence or two is plenty to start"
        />
      </label>
      <button
        type="submit"
        className="cap rounded-[2px] bg-orange px-7 py-3.5 text-[15px] text-white transition-colors hover:bg-orange-ink"
      >
        Open in email
      </button>
      <p className="text-sm text-ink-soft">
        Opens your email app with this pre-filled - nothing sends
        automatically.
      </p>
    </form>
  );
}
