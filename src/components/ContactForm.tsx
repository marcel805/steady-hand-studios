"use client";

import { useState } from "react";

const CONTACT_EMAIL = "info@steadyhandstudios.co.za";

type Status = "idle" | "sending" | "success" | "error";

const FIELD =
  "w-full rounded-[2px] border border-ink/30 bg-paper-2 px-3 py-2.5 text-ink outline-none focus-visible:border-ink";
const BUTTON =
  "cap rounded-[2px] bg-orange px-7 py-3.5 text-[15px] text-white transition-colors hover:bg-orange-ink disabled:cursor-wait disabled:opacity-70";

/**
 * Brief form. When the site can send mail (`canSubmit`) it posts to
 * /api/contact; otherwise it falls back to opening the visitor's own email
 * app, so the page always works.
 */
export default function ContactForm({ canSubmit }: { canSubmit: boolean }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    brief: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `New brief from ${form.name || "the website"}`
  )}&body=${encodeURIComponent(
    `${form.brief}\n\n-\n${form.name}\n${form.email}`
  )}`;

  const set =
    (key: "name" | "email" | "brief" | "website") =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) {
      // No mail service configured: open the visitor's email app instead.
      window.location.href = mailtoHref;
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: AbortSignal.timeout(15_000),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) {
        throw new Error(
          res.status === 400 && typeof body.error === "string" ? body.error : ""
        );
      }
      setStatus("success");
    } catch (err) {
      // Keep everything the visitor typed so they can retry.
      setError(err instanceof Error ? err.message : "");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="space-y-4">
        <p className="disp text-4xl sm:text-5xl">Brief received.</p>
        <p className="text-lg text-ink-soft">
          Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. We&rsquo;ve
          got your message and will reply to {form.email}.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm({ name: "", email: "", brief: "", website: "" });
            setStatus("idle");
          }}
          className="cap border-b-2 border-orange pb-0.5 text-sm hover:text-orange-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <label className="block text-sm">
        <span className="mb-1.5 block text-ink-soft">Your name</span>
        <input
          required
          name="name"
          autoComplete="name"
          maxLength={120}
          value={form.name}
          onChange={set("name")}
          className={FIELD}
          placeholder="Full name"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-ink-soft">Email</span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          maxLength={254}
          value={form.email}
          onChange={set("email")}
          className={FIELD}
          placeholder="you@company.com"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-ink-soft">
          What do you need built?
        </span>
        <textarea
          required
          name="brief"
          rows={5}
          maxLength={5000}
          value={form.brief}
          onChange={set("brief")}
          className={FIELD}
          placeholder="A sentence or two is plenty to start"
        />
      </label>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={form.website}
            onChange={set("website")}
          />
        </label>
      </div>

      <button type="submit" disabled={sending} className={BUTTON}>
        {canSubmit ? (sending ? "Sending..." : "Send brief") : "Open in email"}
      </button>

      {!canSubmit && (
        <p className="text-sm text-ink-soft">
          Opens your email app with this pre-filled - nothing sends
          automatically.
        </p>
      )}

      {status === "error" && (
        <div
          role="alert"
          className="border-l-[3px] border-orange-ink bg-paper-2 px-4 py-3 text-ink"
        >
          <p className="font-semibold">
            {error || "We couldn’t send that."} Nothing has been lost.
          </p>
          <p className="mt-1 text-ink-soft">
            Try again, or{" "}
            <a
              href={mailtoHref}
              className="text-ink underline underline-offset-4 hover:text-orange-ink"
            >
              send it from your email app
            </a>
            , or call +27 66 473 9575.
          </p>
        </div>
      )}
    </form>
  );
}
