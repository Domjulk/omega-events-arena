import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Clock3,
  Copy,
  Flower2,
  Goal,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  buildInspectionMessage,
  inspectionRequestSchema,
} from "@/lib/inspection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Omega Events Arena | Events in Maitama, Abuja" },
      {
        name: "description",
        content:
          "Host your event at Omega Events Arena in Maitama, Abuja. Explore the marquee hall, outdoor event space and futsal court, and arrange an inspection on WhatsApp.",
      },
      { property: "og:title", content: "Omega Events Arena | Maitama, Abuja" },
      {
        property: "og:description",
        content: "An event marquee, outdoor space and sports court on Minister's Hill, Maitama, Abuja.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const phone = "0803 314 5553";
const phoneLink = "tel:+2348033145553";
const whatsappLink = "https://wa.me/2348033145553";
const address = "Minister's Hill, Omega Events Arena, Ibrahim Babangida Blvd, Maitama, Abuja 900271, Federal Capital Territory";
const mapLink = "https://maps.google.com/?q=Omega+Events+Arena+Maitama+Abuja";

const highlights = [
  {
    icon: MapPin,
    number: "01",
    title: "Prime Maitama location",
    description: "Find Omega Events Arena at Minister's Hill on Ibrahim Babangida Boulevard, Abuja.",
  },
  {
    icon: Flower2,
    number: "02",
    title: "Marquee hall & outdoor space",
    description: "Choose the event marquee or outdoor event space, with capacity for 150–200 guests.",
  },
  {
    icon: Goal,
    number: "03",
    title: "Sports & futsal court",
    description: "An on-site sports court and futsal pitch add more ways for guests to gather and play.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Guest-controlled invitations",
    description: "Keep guest access private with events managed strictly by invitation.",
  },
];

const inspiration = [
  {
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=82",
    alt: "A warmly lit dining table arranged for an intimate event",
    className: "inspiration-image inspiration-image-large",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-888cb2e9e6da?auto=format&fit=crop&w=900&q=80",
    alt: "Wedding table setting and floral details",
    className: "inspiration-image inspiration-image-small",
  },
];

const reviewers = [
  {
    name: "Michael Awo Ejeh",
    rating: 4,
    detail: "Google Maps reviewer",
    quote: "Event Place in the good location within the city of Abuja. It has halls, sports centers, and beautiful ambience",
  },
  {
    name: "Olatunji Olasehinde",
    rating: 5,
    detail: "Google Maps reviewer",
    quote: "Its an awesome place to chill, work, play, network and have general fun",
  },
  {
    name: "Ugochukwu Eneanya",
    rating: 5,
    detail: "Local Guide · 15",
    quote: "A very good venue for an event... Especially for a guest-controlled event which is strictly on invitation.",
  },
];

function Index() {
  const [inspectionOpen, setInspectionOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const openInspection = () => setInspectionOpen(true);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const parsed = inspectionRequestSchema.safeParse({
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      eventType: formData.get("eventType"),
      guests: formData.get("guests"),
      preferredDate: formData.get("preferredDate"),
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check your details and try again.");
      return;
    }
    if (parsed.data.preferredDate < getLocalDateString()) {
      toast.error("Choose a date that is today or later.");
      return;
    }

    const url = `${whatsappLink}?text=${encodeURIComponent(buildInspectionMessage(parsed.data))}`;
    toast.success("Your request is ready in WhatsApp.");
    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
    setInspectionOpen(false);
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied.");
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy the address. Please select and copy it instead.");
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden pb-20 sm:pb-0">
      <header className="site-header">
        <div className="site-nav">
          <a className="brand-mark" href="#top" aria-label="Omega Events Arena home">
            <span className="brand-symbol">O</span>
            <span className="brand-word">OMEGA<span>EVENTS ARENA</span></span>
          </a>

          <nav className={`desktop-links ${menuOpen ? "mobile-menu-open" : ""}`} aria-label="Main navigation">
            <a href="#specs" onClick={() => setMenuOpen(false)}>The space</a>
            <a href="#amenities" onClick={() => setMenuOpen(false)}>Amenities</a>
            <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>
            <a href="#location" onClick={() => setMenuOpen(false)}>Location</a>
            <a className="mobile-menu-call" href={phoneLink}><Phone size={15} /> Call the venue</a>
          </nav>

          <div className="nav-actions">
            <a className="nav-phone" href={phoneLink}><Phone size={15} /> {phone}</a>
            <Button className="nav-cta" onClick={openInspection}>Book an inspection <ArrowUpRight size={15} /></Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-rule" /> Prime location · Minister's Hill, Maitama, Abuja</div>
          <h1>Room to gather.<br /><em>Space to celebrate.</em></h1>
          <p className="hero-text">A marquee hall, outdoor event space, and sports/futsal court at Omega Events Arena on Minister's Hill.</p>

          <div className="hero-rating">
            <span className="stars" aria-label="4.0 out of 5 stars"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star /></span>
            <strong>4.0</strong><span className="rating-divider" />
            <a href="#reviews">320+ Google reviews <ChevronRight size={14} /></a>
          </div>

          <div className="hero-pills">
            <span><MapPin /> Minister's Hill</span>
            <span><Flower2 /> Marquee + outdoor space</span>
            <span><UsersRound /> 150–200 guests</span>
          </div>

          <div className="hero-actions">
            <Button className="button-dark" onClick={openInspection}>Arrange an inspection <ArrowRight size={17} /></Button>
            <Button asChild variant="outline" className="button-outline"><a href="#specs">Explore the venue <ArrowDown size={15} /></a></Button>
            <Button asChild variant="outline" className="button-outline"><a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Chat with Omega Events Arena on WhatsApp">Chat on WhatsApp <ArrowUpRight size={15} /></a></Button>
          </div>
          <div className="hero-footnote"><MapPin size={15} /> Maitama, Abuja · FCT</div>
        </div>

        <div className="hero-visual" aria-label="Event venue inspiration gallery">
          <div className="photo-frame photo-main"><img src={inspiration[0].src} alt={inspiration[0].alt} fetchPriority="high" /></div>
          <div className="photo-frame photo-inset"><img src={inspiration[1].src} alt={inspiration[1].alt} /></div>
          <div className="photo-note"><span className="photo-note-icon"><Flower2 size={19} /></span><span><strong>A setting for your story</strong><small>Event inspiration · venue photos welcome</small></span></div>
          <span className="image-caption">GATHER HERE <span>—</span> CELEBRATE WELL</span>
        </div>
      </section>

      <div className="quick-facts" aria-label="Venue quick facts">
        <div className="quick-fact"><span className="fact-icon"><MapPin /></span><span><small>ON MINISTER'S HILL</small><strong>Maitama, Abuja</strong></span></div>
        <span className="fact-divider" />
        <div className="quick-fact"><span className="fact-icon"><UsersRound /></span><span><small>GUEST CAPACITY</small><strong>150–200 guests</strong></span></div>
        <span className="fact-divider" />
        <a className="quick-fact quick-hours" href="#hours"><span className="fact-icon"><Clock3 /></span><span><small>OPEN DAILY</small><strong>Hours vary by day</strong></span><ArrowUpRight size={15} /></a>
      </div>

      <section id="specs" className="space-section section-wrap">
        <div className="section-heading">
          <div><p className="eyebrow section-eyebrow">A little more room for what matters</p><h2>Space to make<br /><em>it your own.</em></h2></div>
          <p className="section-intro">From a joyful wedding to a focused conference, find the space, privacy and practical details that make a gathering feel right.</p>
        </div>
        <div id="amenities" className="amenities-grid">
          {highlights.map(({ icon: Icon, number, title, description }) => (
            <article className="amenity-item" key={number}>
              <div className="amenity-top"><span className="amenity-icon"><Icon size={21} /></span><span className="amenity-number">{number}</span></div>
              <h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reviews" className="reviews-section">
        <div className="section-wrap reviews-inner">
          <div className="reviews-overview">
            <p className="eyebrow light-eyebrow"><span className="eyebrow-rule" /> Guest reviews, shared</p>
            <div className="review-score"><span>4.0</span><div><span className="stars" aria-label="4.0 out of 5 stars"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star /></span><small>320+ Google reviews</small></div></div>
            <a href={mapLink} target="_blank" rel="noreferrer">See reviews on Google Maps <ArrowUpRight size={15} /></a>
          </div>
          <div className="reviewer-list" aria-label="Google Maps guest reviews">
            {reviewers.map(({ name, rating, detail, quote }) => (
              <article className="reviewer-row" key={name}>
                <span className="reviewer-mark" aria-hidden="true">{name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
                <div>
                  <strong>{name}</strong>
                  <span>{detail}</span>
                  <p className="text-xs leading-relaxed text-primary-foreground">{quote}</p>
                </div>
                <span className="reviewer-stars" aria-label={`${rating} out of 5 stars`}>{"★".repeat(rating)}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="hours" className="hours-section section-wrap">
        <div className="hours-heading"><p className="eyebrow section-eyebrow">Come see for yourself</p><h2>Let’s find your<br /><em>perfect setting.</em></h2><p>Schedule an inspection during the venue’s opening hours and discover the space in person.</p><Button className="button-dark" onClick={openInspection}>Plan your visit <ArrowRight size={17} /></Button></div>
        <div className="hours-table"><div className="hours-title"><span className="hours-clock"><Clock3 size={19} /></span><div><small>PLAN YOUR VISIT</small><h3>Opening hours</h3></div></div><div className="hours-row"><span>Monday – Tuesday</span><strong>8:00 AM – 6:00 PM</strong></div><div className="hours-row"><span>Wednesday – Saturday</span><strong>8:00 AM – 8:00 PM</strong></div><div className="hours-row"><span>Sunday</span><strong>1:00 PM – 8:00 PM</strong></div><a className="hours-contact" href={phoneLink}>Questions before you visit? <strong>Give us a call <ArrowRight size={14} /></strong></a></div>
      </section>

      <section id="location" className="location-section">
        <div className="section-wrap location-inner"><div className="location-copy"><p className="eyebrow section-eyebrow">Easy to find, worth the visit</p><h2>On Minister's Hill.<br /><em>In Maitama, Abuja.</em></h2><div className="address-line"><span className="location-pin"><MapPin size={19} /></span><p><strong>Omega Events Arena</strong><span>{address}</span><small>Plus Code: 4F4P+2C Abuja</small></p></div><div className="location-actions"><Button asChild className="button-dark"><a href={mapLink} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16} /></a></Button><Button className="copy-button" variant="outline" onClick={copyAddress}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? "Copied" : "Copy address"}</Button></div></div>
          <a className="map-illustration" href={mapLink} target="_blank" rel="noreferrer" aria-label="Open directions to Omega Events Arena in Google Maps"><span className="map-road road-one" /><span className="map-road road-two" /><span className="map-green patch-one" /><span className="map-green patch-two" /><span className="map-route" /><span className="map-pin"><MapPin size={21} fill="currentColor" /></span><span className="map-label"><MapPin size={15} /> OMEGA EVENTS ARENA</span><span className="map-link">Open in Google Maps <ArrowUpRight size={13} /></span><span className="map-plus">4F4P+2C</span></a>
        </div>
      </section>

      <footer className="site-footer"><div className="footer-inner"><a className="brand-mark footer-brand" href="#top"><span className="brand-symbol">O</span><span className="brand-word">OMEGA<span>EVENTS ARENA</span></span></a><span className="footer-note">A place to gather, celebrate, and connect.</span><div className="footer-links"><a href={phoneLink}><Phone size={14} /> {phone}</a><a href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13} /></a></div><span className="footer-copyright">MAITAMA · ABUJA</span></div></footer>

      <div className="mobile-contact-bar"><a href={phoneLink}><Phone size={17} /> Call</a><Button onClick={openInspection}>Book an inspection <ArrowRight size={17} /></Button><a href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Message Omega Events Arena on WhatsApp"><span>WA</span></a></div>

      <Dialog open={inspectionOpen} onOpenChange={setInspectionOpen}>
        <DialogContent className="inspection-dialog">
          <DialogHeader className="inspection-header"><span className="inspection-icon"><Flower2 size={21} /></span><span className="eyebrow section-eyebrow">A visit is the best way to know</span><DialogTitle className="font-display">Come see Omega Events Arena.</DialogTitle><DialogDescription>Tell us a little about your plans and we’ll help arrange your visit.</DialogDescription></DialogHeader>
          <form className="inspection-form" onSubmit={handleSubmit} noValidate>
            <label>Full name<Input name="fullName" placeholder="Your name" autoComplete="name" maxLength={100} required /></label>
            <label>Phone number<Input name="phone" type="tel" placeholder="e.g. 080 1234 5678" autoComplete="tel" maxLength={24} required /></label>
            <label>What are you planning?
              <select name="eventType" defaultValue="" required><option value="" disabled>Select event type</option><option>Wedding</option><option>Birthday celebration</option><option>Conference or meeting</option><option>Family gathering</option><option>Other event</option></select>
            </label>
            <div className="form-row"><label>Estimated guests<Input name="guests" type="number" inputMode="numeric" placeholder="e.g. 100" min="1" max="10000" required /></label><label>Preferred date<Input name="preferredDate" type="date" min={getLocalDateString()} required /></label></div>
            <p className="form-assurance"><Check size={14} /> Your request opens as a message to Omega Events Arena on WhatsApp.</p>
            <Button className="button-dark form-submit" type="submit">Continue to WhatsApp <ArrowUpRight size={17} /></Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function getLocalDateString() {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}
