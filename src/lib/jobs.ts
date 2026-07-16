import { JobStatus } from "@/components/StatusStamp";

export type Job = {
  ticket: string;
  title: string;
  trade: string;
  location: string;
  dayRate: string;
  duration: string;
  callDate: string;
  brief: string;
  status: JobStatus;
  nominees?: number;
};

// Placeholder data for the mocked jobs board — no live accounts or
// payments are wired up yet. See /jobs for context.
export const JOBS: Job[] = [
  {
    ticket: "SHS-0114",
    title: "CNC operator, 3-day fit-out run",
    trade: "Woodwork / CNC",
    location: "Booysens workshop, Johannesburg",
    dayRate: "R 2 800 / day",
    duration: "3 days",
    callDate: "Starts 21 Jul",
    brief:
      "Cutting and edging fluted MDF panels for a retail counter build. Own PPE, comfortable running a CNC router unsupervised.",
    status: "open",
    nominees: 6,
  },
  {
    ticket: "SHS-0115",
    title: "Rigger for on-site install, Sandton",
    trade: "Rigging / Install",
    location: "Sandton, Johannesburg",
    dayRate: "R 3 200 / day",
    duration: "1 day",
    callDate: "23 Jul, early start",
    brief:
      "Load in and rig an illuminated sign at height on a mall storefront. Valid work-at-height ticket required.",
    status: "open",
    nominees: 11,
  },
  {
    ticket: "SHS-0111",
    title: "Sprayer, automotive-finish panels",
    trade: "Spray finishing",
    location: "Booysens workshop, Johannesburg",
    dayRate: "R 3 000 / day",
    duration: "2 days",
    callDate: "Shortlisting now",
    brief:
      "Base coat and clear over fibreglass cart panels. Booth and materials supplied — bring your own gun.",
    status: "shortlisted",
    nominees: 8,
  },
  {
    ticket: "SHS-0108",
    title: "Welder, mild steel display frames",
    trade: "Welding / Steel",
    location: "Booysens workshop, Johannesburg",
    dayRate: "R 2 900 / day",
    duration: "4 days",
    callDate: "Winner picked",
    brief:
      "MIG welding a run of shelving frames to drawing. Tolerance matters — these frames carry glass.",
    status: "awarded",
  },
  {
    ticket: "SHS-0102",
    title: "Driver + bakkie, cross-town delivery",
    trade: "Logistics",
    location: "Johannesburg metro",
    dayRate: "R 1 600 / day",
    duration: "1 day",
    callDate: "Paid 9 Jul",
    brief:
      "Own bakkie, delivered a finished bar counter from the workshop to a Rosebank venue and helped offload.",
    status: "paid",
  },
];
