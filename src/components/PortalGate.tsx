"use client";

import { useState } from "react";
import Link from "next/link";
import JobsBoard from "@/components/JobsBoard";
import SectionLabel from "@/components/SectionLabel";
import { JOBS } from "@/lib/jobs";

export default function PortalGate() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  if (loggedIn) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10">
        <SectionLabel label="Open tickets" />
        <div className="mb-8 rounded-md border border-stamp/40 bg-card px-5 py-4 text-sm leading-relaxed text-ink-soft">
          <span className="text-mono-label text-stamp-ink">Preview —</span>{" "}
          this is a working mock-up of the portal so you can see the flow.
          Real logins haven&rsquo;t been issued yet, so nothing here is a
          live job.
        </div>
        <JobsBoard jobs={JOBS} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <p className="text-mono-label mb-4 text-xs text-ink-soft">
        Contractor portal
      </p>
      <h1 className="font-display text-4xl leading-tight text-ink">
        Log in to see open jobs.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-soft">
        This portal is for vetted tradespeople only. If you haven&rsquo;t
        been sent a login,{" "}
        <Link href="/careers" className="text-ink underline hover:no-underline">
          send us your portfolio
        </Link>{" "}
        first.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setLoggedIn(true);
        }}
        className="mt-8 space-y-4"
      >
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Username</span>
          <input
            required
            value={credentials.username}
            onChange={(e) =>
              setCredentials((c) => ({ ...c, username: e.target.value }))
            }
            className="w-full rounded-md border border-ink/20 bg-card px-3 py-2.5 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block text-ink-soft">Password</span>
          <input
            required
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((c) => ({ ...c, password: e.target.value }))
            }
            className="w-full rounded-md border border-ink/20 bg-card px-3 py-2.5 text-ink outline-none focus-visible:border-ink"
          />
        </label>
        <button
          type="submit"
          className="text-mono-label w-full rounded-full bg-ink px-6 py-3 text-xs text-paper-2 transition-colors hover:bg-ink-soft"
        >
          Log in
        </button>
      </form>
      <p className="text-mono-label mt-6 text-[11px] text-ink-soft">
        Preview only — this demonstrates how the locked portal will work.
        No accounts exist yet, so any input passes through.
      </p>
    </div>
  );
}
