import Image from "next/image";
export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-line bg-teal-dark text-paper"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-white font-display text-lg">
              <Image src="/clinic.png" alt="Clinic" width={32} height={32} />
            </span>
            <span className="font-display text-lg">Harborview Clinic</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-paper/70">
            Family medicine, dental, and diagnostic care, open six days a week
            for walk-ins and scheduled visits.
          </p>
        </div>

        <div>
          <h3 className="font-display text-base">Visit or call us</h3>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li>142 Willow Street, Riverside District</li>
            <li>Open Mon–Sat, 8:00 AM – 7:00 PM</li>
            <li>
              <a href="tel:+18005551234" className="hover:text-amber">
                +1 (800) 555-1234
              </a>
            </li>
            <li>
              <a
                href="mailto:care@harborviewclinic.example"
                className="hover:text-amber"
              >
                care@harborviewclinic.example
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base">Follow along</h3>
          <div className="mt-4 flex gap-3">
            <a
              href="https://www.facebook.com/"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full  hover:border-amber hover:text-amber transition-colors"
            >
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={32}
                height={32}
              />
            </a>
            <a
              href="https://www.instagram.com/"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full  hover:border-amber hover:text-amber transition-colors"
            >
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={32}
                height={32}
              />
            </a>
            <a
              href="https://twitter.com/"
              aria-label="Twitter"
              className="flex h-9 w-9 items-center justify-center rounded-full   hover:border-amber hover:text-amber transition-colors"
            >
              <Image src="/twitter.png" alt="Twitter" width={32} height={32} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-paper/15 px-6 py-5 text-center text-xs text-paper/60">
        © {new Date().getFullYear()} Harborview Clinic. Built for coursework
        demonstration only — not a real medical provider.
      </div>
    </footer>
  );
}
