import './PrivacyPolicy.css';

export default function TermsOfService() {
  return (
    <div className="pp-page">
      <div className="pp-hero">
        <div className="container">
          <h1 className="pp-hero__title">Terms of Service</h1>
          <p className="pp-hero__meta">Effective date: April 13, 2026 &nbsp;·&nbsp; Quicklancers Inc.</p>
        </div>
      </div>

      <div className="container pp-body">
        <div className="pp-toc">
          <p className="pp-toc__title">Contents</p>
          <ol>
            {[
              'Acceptance of Terms',
              'About Quicklancers',
              'Eligibility',
              'Accounts',
              'Buyer Terms',
              'Seller Terms',
              'Orders & Payments',
              'Fees',
              'Cancellations & Refunds',
              'Prohibited Conduct',
              'Intellectual Property',
              'Disclaimers',
              'Limitation of Liability',
              'Indemnification',
              'Termination',
              'Governing Law',
              'Changes to These Terms',
              'Contact Us',
            ].map((s, i) => (
              <li key={i}><a href={`#tos-${i + 1}`}>{s}</a></li>
            ))}
          </ol>
        </div>

        <div className="pp-content">

          <section id="tos-1">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Quicklancers platform (available at <strong>Quicklancers.com</strong>),
              you agree to be bound by these Terms of Service ("Terms"), our Privacy Policy, and any additional
              guidelines or rules posted on the platform. If you do not agree to these Terms, you must not use
              our services.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and Quicklancers Inc. ("Quicklancers",
              "we", "our", or "us"). We may update these Terms from time to time. Continued use of the platform
              after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section id="tos-2">
            <h2>2. About Quicklancers</h2>
            <p>
              Quicklancers is an online marketplace that connects buyers seeking professional services with
              independent sellers (freelancers) offering those services. Quicklancers acts solely as a platform
              intermediary — we are not a party to any agreement between buyers and sellers, and we do not
              employ, direct, or supervise sellers.
            </p>
            <p>
              Quicklancers does not guarantee the quality, accuracy, legality, or delivery of any service listed
              on the platform. All transactions are between the buyer and the seller.
            </p>
          </section>

          <section id="tos-3">
            <h2>3. Eligibility</h2>
            <p>To use Quicklancers, you must:</p>
            <ul>
              <li>Be at least <strong>13 years of age</strong>. Users under 18 must have parental or guardian consent.</li>
              <li>Be capable of entering into a legally binding contract under applicable law.</li>
              <li>Not be prohibited from using the platform under the laws of your country of residence.</li>
              <li>Provide accurate, truthful, and complete information during registration.</li>
            </ul>
            <p>
              We reserve the right to refuse service to anyone and to terminate accounts that do not meet
              these requirements.
            </p>
          </section>

          <section id="tos-4">
            <h2>4. Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and for all
              activity that occurs under your account. You must notify us immediately at{' '}
              <a href="mailto:Luis.herbrand@gmail.com">Luis.herbrand@gmail.com</a> if you suspect any
              unauthorised use of your account.
            </p>
            <p>
              You may not create multiple accounts to circumvent suspensions, bans, or platform policies.
              Accounts are non-transferable and may not be sold or assigned to another person.
            </p>
            <p>
              We reserve the right to suspend or permanently terminate accounts that violate these Terms,
              engage in fraudulent behaviour, or pose a risk to the platform or other users.
            </p>
          </section>

          <section id="tos-5">
            <h2>5. Buyer Terms</h2>
            <p>As a buyer on Quicklancers, you agree to:</p>
            <ul>
              <li>Use services purchased solely for lawful purposes.</li>
              <li>Provide sellers with accurate and timely information required to complete the service.</li>
              <li>Not request services that violate any law, third-party rights, or our Prohibited Conduct policy.</li>
              <li>Pay for services at the time of order. Orders are not confirmed until payment is received.</li>
              <li>Not attempt to circumvent the platform by arranging payment directly with sellers outside of Quicklancers.</li>
            </ul>
          </section>

          <section id="tos-6">
            <h2>6. Seller Terms</h2>
            <p>As a seller on Quicklancers, you agree to:</p>
            <ul>
              <li>Only offer services that you are legally permitted and qualified to provide.</li>
              <li>Accurately describe your services, pricing, and delivery timelines.</li>
              <li>Deliver services as described and within the agreed timeframe.</li>
              <li>Not misrepresent your identity, qualifications, or experience.</li>
              <li>Not use buyer information for any purpose other than fulfilling the order.</li>
              <li>Comply with all applicable laws, including tax obligations in your jurisdiction.</li>
              <li>Not offer services that infringe on intellectual property rights, contain illegal content, or violate our Prohibited Conduct policy.</li>
            </ul>
            <p>
              Sellers are independent contractors, not employees or agents of Quicklancers. You are solely
              responsible for any tax obligations arising from your earnings on the platform.
            </p>
          </section>

          <section id="tos-7">
            <h2>7. Orders & Payments</h2>
            <p>
              All payments on Quicklancers are processed securely through <strong>Stripe</strong>, a third-party
              payment processor. By placing an order, you authorise Quicklancers to charge the specified amount
              to your selected payment method.
            </p>
            <p>
              An order is considered active once payment has been successfully processed and the seller has been
              notified. Quicklancers does not store card details — all payment data is handled exclusively by
              Stripe in accordance with PCI-DSS standards.
            </p>
            <p>
              Prices are displayed in the currency shown on the listing. Any applicable taxes or fees are the
              responsibility of the respective buyer or seller under their local laws.
            </p>
          </section>

          <section id="tos-8">
            <h2>8. Fees</h2>
            <p>
              Quicklancers may charge service fees to buyers and/or sellers to support the operation of the
              platform. Any applicable fees will be clearly displayed before an order is confirmed.
            </p>
            <p>
              We reserve the right to change our fee structure at any time. Changes will be communicated in
              advance and will not affect orders already placed.
            </p>
          </section>

          <section id="tos-9">
            <h2>9. Cancellations & Refunds</h2>
            <p>
              Once an order is placed and payment is processed, cancellations are subject to the following:
            </p>
            <ul>
              <li>
                <strong>Buyer-initiated cancellations:</strong> You may request a cancellation before the seller
                begins work. Refunds in such cases are at the discretion of Quicklancers and the seller.
              </li>
              <li>
                <strong>Seller failure to deliver:</strong> If a seller fails to deliver within the agreed
                timeframe without communication, you may be eligible for a full refund. Contact us at{' '}
                <a href="mailto:Luis.herbrand@gmail.com">Luis.herbrand@gmail.com</a>.
              </li>
              <li>
                <strong>Disputes:</strong> In the event of a dispute between buyer and seller, Quicklancers may
                act as a mediator but is not obligated to issue refunds. Decisions made by Quicklancers in
                disputes are final.
              </li>
            </ul>
            <p>
              Refunds, where approved, will be returned to the original payment method within 5–10 business days
              depending on your card issuer.
            </p>
          </section>

          <section id="tos-10">
            <h2>10. Prohibited Conduct</h2>
            <p>You must not use Quicklancers to:</p>
            <ul>
              <li>Post, offer, or purchase illegal services or content.</li>
              <li>Violate any applicable local, national, or international law or regulation.</li>
              <li>Harass, threaten, defame, or abuse other users.</li>
              <li>Post false, misleading, or fraudulent listings or reviews.</li>
              <li>Circumvent platform payments or solicit off-platform transactions.</li>
              <li>Upload malware, viruses, or any harmful code.</li>
              <li>Scrape, crawl, or extract data from the platform without written consent.</li>
              <li>Create fake accounts or impersonate any person or entity.</li>
              <li>Engage in any form of money laundering or fraudulent activity.</li>
              <li>Offer adult content, weapons, drugs, or any content that exploits minors.</li>
            </ul>
            <p>
              Violations may result in immediate account suspension or termination, and may be reported to
              relevant authorities where required by law.
            </p>
          </section>

          <section id="tos-11">
            <h2>11. Intellectual Property</h2>
            <p>
              Upon full payment, sellers grant buyers a non-exclusive, worldwide licence to use the delivered
              work for the purposes described in the listing, unless the listing specifies otherwise (e.g.
              exclusive rights at an additional cost).
            </p>
            <p>
              Sellers warrant that they own or have the right to licence all content they deliver and that it
              does not infringe any third-party intellectual property rights.
            </p>
            <p>
              All content, branding, and technology on the Quicklancers platform (excluding user-submitted
              content) is owned by Quicklancers Inc. and may not be reproduced or used without written
              permission.
            </p>
          </section>

          <section id="tos-12">
            <h2>12. Disclaimers</h2>
            <p>
              The Quicklancers platform is provided on an <strong>"as is"</strong> and <strong>"as available"</strong>{' '}
              basis without warranties of any kind, either express or implied. We do not warrant that the
              platform will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
            <p>
              Quicklancers does not endorse, verify, or guarantee any seller, listing, or delivered service.
              Your use of services found on the platform is entirely at your own risk.
            </p>
          </section>

          <section id="tos-13">
            <h2>13. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Quicklancers Inc., its directors, employees,
              and affiliates shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages — including loss of profits, data, or goodwill — arising from your use of or
              inability to use the platform.
            </p>
            <p>
              Our total liability to you for any claim arising from these Terms or your use of the platform
              shall not exceed the amount you paid to Quicklancers in the 12 months preceding the claim.
            </p>
          </section>

          <section id="tos-14">
            <h2>14. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Quicklancers Inc. and its officers, directors,
              employees, and agents from and against any claims, liabilities, damages, losses, and expenses
              (including legal fees) arising from:
            </p>
            <ul>
              <li>Your use of the platform in violation of these Terms.</li>
              <li>Any content you submit, post, or transmit through the platform.</li>
              <li>Your infringement of any third-party rights, including intellectual property rights.</li>
              <li>Any dispute between you and another user.</li>
            </ul>
          </section>

          <section id="tos-15">
            <h2>15. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to Quicklancers at any time, with or
              without notice, if we reasonably believe you have violated these Terms or engaged in conduct that
              is harmful to the platform, other users, or third parties.
            </p>
            <p>
              You may close your account at any time by contacting us at{' '}
              <a href="mailto:Luis.herbrand@gmail.com">Luis.herbrand@gmail.com</a>. Upon termination, your
              right to use the platform ceases immediately. Sections that by their nature should survive
              termination (including Intellectual Property, Disclaimers, Limitation of Liability, and
              Governing Law) shall continue to apply.
            </p>
          </section>

          <section id="tos-16">
            <h2>16. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the Federal Republic
              of Germany, without regard to its conflict of law provisions. Any disputes arising from these
              Terms shall be subject to the exclusive jurisdiction of the courts of Germany.
            </p>
            <p>
              If you are a consumer in the European Union, you may also be entitled to bring proceedings in
              the courts of your country of residence under applicable EU consumer protection laws.
            </p>
          </section>

          <section id="tos-17">
            <h2>17. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time to reflect changes in our services, legal requirements,
              or business practices. When we make material changes, we will notify registered users by email
              or by posting a notice on the platform prior to the changes taking effect.
            </p>
            <p>
              The "Effective date" at the top of this page indicates when these Terms were last updated.
              Your continued use of the platform after changes take effect constitutes your acceptance of
              the revised Terms.
            </p>
          </section>

          <section id="tos-18">
            <h2>18. Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms of Service, please contact us:
            </p>
            <div className="pp-card">
              <p><strong>Quicklancers Inc.</strong></p>
              <p>Email: <a href="mailto:Luis.herbrand@gmail.com">Luis.herbrand@gmail.com</a></p>
              <p>Website: <strong>Quicklancers.com</strong></p>
              <p>Country: <strong>Germany</strong></p>
            </div>
            <p>
              We aim to respond to all enquiries within 30 days.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
