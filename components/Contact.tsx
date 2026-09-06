import ContactForm from "@/components/ContactForm";
import { siteContent } from "@/lib/content";

export default function Contact() {
  const { contact } = siteContent;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-16">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:items-start md:py-28">
        <div>
          <h2
            id="contact-heading"
            className="font-display text-5xl leading-[1.02] font-bold tracking-tight uppercase sm:text-6xl"
          >
            <span className="block text-foreground">{contact.headingLines[0]}</span>
            <span className="block text-primary">{contact.headingLines[1]}</span>
            <span className="block text-foreground">{contact.headingLines[2]}</span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted">
            {contact.subcopy}
          </p>
          <ul role="list" className="mt-8 space-y-3 text-sm">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                {contact.email}
              </a>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
