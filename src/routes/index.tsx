import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  MapPin,
  Phone,
  MessageCircle,
  Wifi,
  UtensilsCrossed,
  Sparkles,
  ShieldCheck,
  Moon,
  Sun,
  ArrowUp,
} from "lucide-react";

import roomImg from "@/assets/room.jpg";
import kitchenImg from "@/assets/kitchen.jpg";
import loungeImg from "@/assets/lounge.jpg";
import deskImg from "@/assets/desk.jpg";

const WHATSAPP_NUMBER = "917593940072";
const MAPS_URL = "https://maps.app.goo.gl/LrrM3Kz8hAumjjYY7";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Contact" },
];

const AMENITIES = [
  { icon: Wifi, label: "Fast Wi-Fi", desc: "Stable connection in every room." },
  { icon: UtensilsCrossed, label: "Shared kitchen", desc: "Cook anytime, fully equipped." },
  { icon: Sparkles, label: "Weekly cleaning", desc: "Rooms kept fresh and tidy." },
  { icon: ShieldCheck, label: "Safe & secure", desc: "Doors and entry you can trust." },
];

const GALLERY = [
  { src: roomImg, alt: "Bright shared bedroom at Rent House men's hostel" },
  { src: kitchenImg, alt: "Shared kitchen with plants at Rent House men's hostel" },
  { src: loungeImg, alt: "Sunlit lounge area at Rent House men's hostel" },
  { src: deskImg, alt: "Study desk by the window at Rent House men's hostel" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rent House — Men's Hostel Rooms & Sharing Options" },
      {
        name: "description",
        content:
          "Rent House is a comfortable men's hostel with 2, 3 and 4 share rooms. Check availability and enquire instantly on WhatsApp.",
      },
      { property: "og:title", content: "Rent House — Men's Hostel Rooms & Sharing Options" },
      {
        property: "og:description",
        content:
          "Comfortable 2, 3 and 4 share rooms for men. Check availability and enquire instantly on WhatsApp.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [room, setRoom] = useState("3 Share");
  const [error, setError] = useState("");
  const [dark, setDark] = useState(
    () =>
      typeof window !== "undefined" &&
      (localStorage.getItem("rent-house-theme") === "dark" ||
        (!localStorage.getItem("rent-house-theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)),
  );
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("rent-house-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanMobile = mobile.trim();
    if (!cleanName || cleanName.length > 100) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[+]?[\d\s-]{10,15}$/.test(cleanMobile)) {
      setError("Please enter a valid mobile number.");
      return;
    }
    setError("");
    const message = [
      "Hi, I want to know the availability of a room at Rent House (Men's Hostel).",
      "",
      `Name: ${cleanName}`,
      `Contact: ${cleanMobile}`,
      `My requirement: ${room} room`,
      "",
      "Please let me know the availability and rent details. Thank you!",
    ].join("\n");
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div id="top" className="relative min-h-screen overflow-hidden text-ink antialiased">
      {/* soft pastel glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-brand/20 blur-3xl floaty" />
      <div className="pointer-events-none absolute top-24 -right-20 size-64 rounded-full bg-accent-teal/20 blur-3xl floaty-reverse" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 size-72 rounded-full bg-blush/25 blur-3xl floaty" />

      <div className="relative mx-auto max-w-[420px] px-5 pb-16 pt-6 md:max-w-3xl">
        {/* Header */}
        <header className="sticky top-3 z-40 flex items-center justify-between rounded-2xl bg-surface/70 px-4 py-3 shadow-[0_12px_30px_-16px_rgba(124,109,242,.6)] outline outline-ink/5 backdrop-blur-xl">
          <a href="#top" className="flex items-center gap-2">
            <div className="grid size-10 place-items-center rounded-2xl bg-surface/80 text-brand shadow-[0_8px_20px_-8px_rgba(124,109,242,.6)] outline outline-ink/5">
              <span className="font-display text-lg font-bold">R</span>
            </div>
            <div>
              <p className="font-display text-base font-semibold leading-none">Rent House</p>
              <p className="text-[11px] font-medium text-soft">Men's Hostel</p>
            </div>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-2 text-sm font-semibold text-soft transition hover:bg-surface/70 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-1 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[0_10px_24px_-8px_rgba(124,109,242,.8)]"
            >
              Enquire
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
              onClick={() => setDark((v) => !v)}
              className="grid size-10 place-items-center rounded-xl bg-surface/70 text-ink outline outline-ink/5"
            >
              {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-xl bg-surface/70 text-ink outline outline-ink/5 md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          </div>
        </header>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="fixed inset-x-5 top-24 z-40 rounded-2xl bg-surface/90 p-3 shadow-[0_24px_60px_-24px_rgba(43,37,64,.5)] outline outline-ink/5 backdrop-blur-xl md:hidden">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-semibold text-ink transition hover:bg-brand/10"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}

        {/* Hero */}
        <section className="mt-8 rounded-[32px] bg-surface/60 p-6 shadow-[0_24px_60px_-24px_rgba(124,109,242,.5)] outline outline-ink/5 backdrop-blur-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-teal/15 px-3 py-1 text-xs font-semibold text-accent-teal">
            ● Rooms available now
          </span>
          <h1 className="mt-4 font-display text-[34px] font-semibold leading-[1.05] md:text-[44px]">
            Find your
            <br />
            new home base
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-soft">
            Bright, friendly shared rooms for men in the heart of the city. Move in this week —
            bring your bags, we'll handle the rest.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["2 Share", "3 Share", "4 Share"].map((t) => (
              <span key={t} className="rounded-full bg-surface/80 px-3 py-1.5 font-display text-xs font-semibold">
                {t}
              </span>
            ))}
          </div>
          <a
            href="#contact"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand py-4 text-base font-semibold text-primary-foreground shadow-[0_14px_30px_-10px_rgba(124,109,242,.9)]"
          >
            Check availability →
          </a>
        </section>

        {/* About */}
        <section
          id="about"
          className="mt-5 scroll-mt-24 rounded-[28px] bg-surface/55 p-5 shadow-[0_18px_44px_-24px_rgba(43,37,64,.5)] outline outline-ink/5 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">About Rent House</h2>
            <span className="text-xs font-semibold text-soft">For men</span>
          </div>
          <p className="mt-2 text-[14px] leading-relaxed text-soft">
            A calm, community-first men's hostel. Fast Wi-Fi, a shared kitchen, weekly cleaning,
            and roommates who actually say hi. No hidden fees, no drama.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-2xl bg-brand/10 py-3">
              <p className="font-display text-lg font-bold text-brand">40+</p>
              <p className="text-[11px] font-medium text-soft">Residents</p>
            </div>
            <div className="rounded-2xl bg-accent-teal/10 py-3">
              <p className="font-display text-lg font-bold text-accent-teal">5.0</p>
              <p className="text-[11px] font-medium text-soft">Rating</p>
            </div>
            <div className="rounded-2xl bg-blush/15 py-3">
              <p className="font-display text-lg font-bold text-blush">24/7</p>
              <p className="text-[11px] font-medium text-soft">Support</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {AMENITIES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="rounded-2xl bg-surface/70 p-3 outline outline-ink/5">
                <Icon className="size-4 text-brand" />
                <p className="mt-2 text-sm font-semibold">{label}</p>
                <p className="text-[12px] text-soft">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section id="gallery" className="mt-5 scroll-mt-24">
          <h2 className="mb-3 px-1 font-display text-lg font-semibold">A look inside</h2>
          <div className="grid grid-cols-2 gap-3">
            {GALLERY.map((g) => (
              <img
                key={g.src}
                src={g.src}
                alt={g.alt}
                width={1024}
                height={1024}
                loading="lazy"
                className="aspect-square rounded-3xl object-cover outline-1 -outline-offset-1 outline-ink/5"
              />
            ))}
          </div>
        </section>

        {/* Location */}
        <section
          id="location"
          className="mt-5 scroll-mt-24 rounded-[28px] bg-surface/55 p-5 shadow-[0_18px_44px_-24px_rgba(43,37,64,.5)] outline outline-ink/5 backdrop-blur-xl"
        >
          <h2 className="font-display text-lg font-semibold">Location</h2>
          <p className="mt-1 text-[14px] text-soft">
            Easy to reach — surrounded by shops, eateries and daily essentials.
          </p>
          <div className="mt-4 flex gap-3 rounded-2xl bg-brand/10 p-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground">
              <MapPin className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">Rent House — Men's Hostel</p>
              <p className="text-[12px] text-soft">Tap below for the exact spot on Google Maps</p>
            </div>
          </div>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink/90 py-3.5 text-sm font-semibold text-primary-foreground"
          >
            <MapPin className="size-4" /> Open in Maps
          </a>
        </section>

        {/* Contact form */}
        <section
          id="contact"
          className="mt-5 scroll-mt-24 rounded-[28px] bg-surface/60 p-6 shadow-[0_24px_60px_-24px_rgba(124,109,242,.5)] outline outline-ink/5 backdrop-blur-xl"
        >
          <h2 className="font-display text-xl font-semibold">Reserve your room</h2>
          <p className="mt-1 text-[14px] text-soft">
            Tap a preference and we'll send your enquiry to the hostel admin on WhatsApp.
          </p>

          <form className="mt-4 space-y-4" onSubmit={sendToWhatsApp} noValidate>
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-soft">
                Your name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                placeholder="e.g. Aarav Shah"
                className="w-full rounded-2xl border border-ink/5 bg-surface/80 px-4 py-3.5 text-[15px] outline-none placeholder:text-soft/60 focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="mb-1.5 block text-xs font-semibold text-soft">
                Mobile number
              </label>
              <input
                id="mobile"
                type="tel"
                inputMode="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={15}
                placeholder="+91 98765 43210"
                className="w-full rounded-2xl border border-ink/5 bg-surface/80 px-4 py-3.5 text-[15px] outline-none placeholder:text-soft/60 focus:border-brand focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <div>
              <span className="mb-1.5 block text-xs font-semibold text-soft">Room preference</span>
              <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Room preference">
                {["2 Share", "3 Share", "4 Share"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={room === opt}
                    onClick={() => setRoom(opt)}
                    className={`rounded-2xl border py-3.5 text-center text-sm font-semibold transition ${
                      room === opt
                        ? "border-brand bg-brand text-primary-foreground shadow-[0_10px_22px_-8px_rgba(124,109,242,.9)]"
                        : "border-ink/5 bg-surface/70 text-soft"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent-teal py-4 text-base font-semibold text-primary-foreground shadow-[0_14px_30px_-10px_rgba(20,184,166,.9)]"
            >
              <MessageCircle className="size-5" /> Send on WhatsApp
            </button>
            <p className="text-center text-[11px] text-soft">
              Your message opens in WhatsApp, ready to send to the admin 🌿
            </p>
          </form>
        </section>

        {/* Footer */}
        <footer className="mt-8 flex items-center justify-between px-1">
          <p className="font-display text-xs font-semibold">Rent House — Men's Hostel</p>
          <div className="flex gap-2">
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              aria-label="Call the hostel"
              className="grid size-9 place-items-center rounded-full bg-surface/70 text-ink outline outline-ink/5"
            >
              <Phone className="size-4" />
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp the hostel"
              className="grid size-9 place-items-center rounded-full bg-accent-teal text-primary-foreground"
            >
              <MessageCircle className="size-4" />
            </a>
            <a href="#top" className="self-center pl-1 text-xs font-medium text-soft">
              Top ↑
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
