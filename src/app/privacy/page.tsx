import type { Metadata } from "next";
import { LegalPage } from "../legal";

export const metadata: Metadata = {
  title: "Privacy policy — doublespeed",
  description:
    "What doublespeed collects, why, who it is shared with, and how to have it deleted.",
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy" updated="8 September 2026">
      <section>
        <p>
          This policy covers doublespeed.ai and the doublespeed terminal,
          operated by Doublespeed, Inc. It explains what we collect, why we
          collect it, and what you can ask us to delete.
        </p>
      </section>

      <section>
        <h2>What we collect</h2>
        <ul>
          <li>
            <strong>Account details</strong> — name, work email, company, and
            billing contact, given when you sign up or book a call.
          </li>
          <li>
            <strong>Payment data</strong> — handled by our payment processor. We
            store the last four digits and the card brand, never the full
            number.
          </li>
          <li>
            <strong>Content and account data</strong> — the media, captions,
            personas, and social credentials you connect so we can post on your
            behalf.
          </li>
          <li>
            <strong>Usage data</strong> — pages viewed, features used, IP
            address, and browser, used to keep the service working and to
            improve it.
          </li>
        </ul>
      </section>

      <section>
        <h2>Why we collect it</h2>
        <p>
          To run the service you bought, to bill you, to support you, to detect
          abuse, and to meet our legal obligations. We do not sell your personal
          data, and we do not use your content to train models we sell to anyone
          else.
        </p>
      </section>

      <section>
        <h2>Who we share it with</h2>
        <p>
          Only with processors that make the service run: hosting, payment
          processing, error reporting, email delivery, and analytics. Each is
          bound by contract to use the data only on our instructions. We
          disclose data to authorities only where the law requires it.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          Account and content data for as long as your account is active, and up
          to 90 days after you close it so the deletion can be reversed if it
          was a mistake. Billing records are kept for seven years because tax
          law requires it.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          You can ask for a copy of your data, ask us to correct it, or ask us
          to delete it. Email{" "}
          <a href="mailto:privacy@doublespeed.ai">privacy@doublespeed.ai</a> and
          we will respond within 30 days. If you are in the EU or UK, you also
          have the right to complain to your local data protection authority.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          We use cookies to keep you signed in and to measure traffic. You can
          block them in your browser; the marketing site works without them, the
          terminal needs the sign-in cookie to function.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Doublespeed, Inc. —{" "}
          <a href="mailto:privacy@doublespeed.ai">privacy@doublespeed.ai</a>
        </p>
      </section>
    </LegalPage>
  );
}
