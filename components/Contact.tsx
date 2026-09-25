import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import SectionShell from "@/components/SectionShell";
import { siteContent } from "@/lib/content";

export default function Contact() {
  const { contact } = siteContent;

  return (
    <SectionShell
      id="contact"
      labelledBy="contact-heading"
      align="start"
      layout="split-lg"
      spacing="compact"
    >
        <Reveal className="lg:sticky lg:top-24 lg:self-start xl:top-28 2xl:top-[7.5rem]">
          <h2
            id="contact-heading"
            className="font-display text-[clamp(2.5rem,2rem+2.5vw,3.75rem)] leading-[1.02] font-bold tracking-tight uppercase xl:text-[4.25rem] 2xl:text-[4.5rem]"
          >
            <span className="block text-foreground">
              {contact.headingLines[0]}
            </span>
            <span className="block text-primary">
              {contact.headingLines[1]}
            </span>
            <span className="block text-foreground">
              {contact.headingLines[2]}
            </span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted xl:mt-8 xl:max-w-lg xl:text-base 2xl:max-w-xl 2xl:text-lg">
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
        </Reveal>
        <Reveal
          delay={90}
          className="rounded-2xl border border-line bg-surface p-5 sm:p-6 lg:p-7 xl:p-8 2xl:p-10"
        >
          <ContactForm />
        </Reveal>
    </SectionShell>
  );
}
