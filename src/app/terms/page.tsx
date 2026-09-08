import type { Metadata } from "next";
import { LegalPage } from "../legal";

export const metadata: Metadata = {
  title: "Terms of service — doublespeed",
  description:
    "The terms covering doublespeed subscriptions: billing, cancellation, account ownership, and acceptable use.",
};

export default function Terms() {
  return (
    <LegalPage title="Terms of service" updated="8 September 2026">
      <section>
        <p>
          These terms govern your use of doublespeed, operated by Doublespeed,
          Inc. Using the service means you accept them.
        </p>
      </section>

      <section>
        <h2>The service</h2>
        <p>
          doublespeed provides content generation tooling and hosted social
          accounts running on real US devices. Plans, prices, and inclusions are
          described on our pricing page and confirmed in your order.
        </p>
      </section>

      <section>
        <h2>Billing and cancellation</h2>
        <ul>
          <li>Subscriptions are billed monthly in advance.</li>
          <li>
            Hosted plans carry a 10-account minimum unless your order says
            otherwise.
          </li>
          <li>
            You can cancel at any time from your account or by emailing us.
            Cancellation takes effect at the end of the paid period; we do not
            bill you again after that.
          </li>
          <li>
            Paid periods already started are not refunded pro rata, except where
            consumer law requires it.
          </li>
        </ul>
      </section>

      <section>
        <h2>Account ownership</h2>
        <p>
          You own the social accounts operated under your subscription and the
          content produced for them. On cancellation we hand over credentials
          for accounts you own and delete our copies within 90 days. We claim no
          license to your content beyond what is needed to run the service for
          you.
        </p>
      </section>

      <section>
        <h2>Suspensions and replacements</h2>
        <p>
          Social platforms can suspend accounts for reasons outside our control.
          If a hosted account is banned while operated by us within our
          acceptable use rules, we replace it and warm a new one at no charge.
          We do not guarantee any particular reach, follower count, or view
          count.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>You may not use doublespeed to:</p>
        <ul>
          <li>
            impersonate a real person or organisation, or misrepresent a paid
            promotion as independent where disclosure is required;
          </li>
          <li>
            post content that is illegal, defamatory, or that infringes someone
            else&apos;s rights;
          </li>
          <li>
            run political advertising, or health and financial claims that
            breach platform policy or applicable law;
          </li>
          <li>resell access to the service without a written agreement.</li>
        </ul>
        <p>
          You are responsible for what is posted from your accounts. We may
          suspend an account that breaches these rules, without refund.
        </p>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          The service is provided as is. To the extent the law allows, our total
          liability in any 12-month period is limited to the fees you paid us in
          that period, and we are not liable for lost profits or lost reach.
        </p>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>
          We may update these terms and will give 30 days&apos; notice by email
          of material changes. Questions:{" "}
          <a href="mailto:legal@doublespeed.ai">legal@doublespeed.ai</a>.
        </p>
      </section>
    </LegalPage>
  );
}
