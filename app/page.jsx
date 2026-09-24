import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import ScheduleGraphic from "@/components/ScheduleGraphic";

const services = [
  {
    service: "General Medicine",
    title: "General Medicine",
    accent: "#1F5C55",
    description:
      "Same-week visits for check-ups, ongoing conditions, and anything that doesn't feel right yet.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M12 3v6M9 6h6M12 13a4 4 0 0 0 4-4H8a4 4 0 0 0 4 4Zm-6 8a6 6 0 0 1 12 0" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    service: "Dental Care",
    title: "Dental Care",
    accent: "#C1893D",
    description:
      "Cleanings, fillings, and check-ups from a team that explains every step before touching a tool.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M8 4c1 0 1.5 1 2 1s1-1 2-1 1.5 1 2 1 2-1 3 0c1.5 1.5 1 5-.5 8-1 2-1 5-2.5 5s-1.5-3-2-5c-.2-.8-1.3-.8-1.5 0-.5 2-1 5-2 5s-1.5-3-2.5-5C4.5 10 4 6.5 5.5 5c1-1 1.5 0 2.5-1Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    service: "Pediatrics",
    title: "Pediatrics",
    accent: "#7FA98E",
    description:
      "Growth checks, vaccinations, and a waiting room designed so kids feel calm, not cornered.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <circle cx="12" cy="8" r="3" />
        <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    service: "Lab & Diagnostics",
    title: "Lab & Diagnostics",
    accent: "#16302C",
    description:
      "Bloodwork and imaging with results sent to your record, usually within one business day.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <path d="M9 2v6L4.5 17a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L15 8V2M9 2h6M9 13h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="text-sm font-medium text-amber-dark">Riverside District · walk-ins welcome</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink md:text-5xl">
            See a clinician on a day that actually works for you.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink/70">
            Harborview Clinic brings general medicine, dental, pediatrics, and
            lab work under one roof. Pick a time online in under two
            minutes — no phone hold music required.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="rounded-md bg-amber px-6 py-3 text-sm font-medium text-white hover:bg-amber-dark transition-colors"
            >
              Book Now
            </Link>
            <a
              href="#services"
              className="rounded-md border border-teal px-6 py-3 text-sm font-medium text-teal hover:bg-teal-light transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
        <ScheduleGraphic />
      </section>

      {/* Services */}
      <section id="services" className="border-y border-line bg-white/40 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl text-ink">Care, organized by what you need</h2>
          <p className="mt-2 max-w-xl text-ink/70">
            Every department keeps its own calendar, so booking a dental
            cleaning doesn't wait behind someone else's check-up.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.service} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-4xl text-teal">12</p>
            <p className="mt-1 text-sm text-ink/70">Clinicians on staff across four departments</p>
          </div>
          <div>
            <p className="font-display text-4xl text-teal">6 days</p>
            <p className="mt-1 text-sm text-ink/70">Open Monday through Saturday, 8 AM to 7 PM</p>
          </div>
          <div>
            <p className="font-display text-4xl text-teal">&lt; 2 min</p>
            <p className="mt-1 text-sm text-ink/70">Average time to complete an online booking</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
