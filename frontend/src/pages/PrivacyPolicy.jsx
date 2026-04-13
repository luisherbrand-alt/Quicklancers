import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <div className="pp-page">
      <div className="pp-hero">
        <div className="container">
          <h1 className="pp-hero__title">Privacy Policy</h1>
          <p className="pp-hero__meta">Effective date: April 13, 2026 &nbsp;·&nbsp; Quicklancers Inc.</p>
        </div>
      </div>

      <div className="container pp-body">
        <div className="pp-toc">
          <p className="pp-toc__title">Contents</p>
          <ol>
            {[
              'Introduction',
              'Data Controller',
              'Personal Data We Collect',
              'Legal Basis for Processing',
              'Newsletter',
              'Facebook Pixel & Tracking',
              'Cookies',
              'Data Sharing',
              'International Transfers',
              'Age Restriction',
              'Data Retention',
              'Your Rights under GDPR',
              'Data Security',
              'No Advertising to Minors',
              'Changes to This Policy',
              'Contact Us',
            ].map((s, i) => (
              <li key={i}><a href={`#section-${i + 1}`}>{s}</a></li>
            ))}
          </ol>
        </div>

        <div className="pp-content">

          <section id="section-1">
            <h2>1. Introduction</h2>
            <p>
              Quicklancers Inc. ("Quicklancers", "we", "our", or "us") operates the online freelance marketplace
              available at <strong>Quicklancers.com</strong>. We are committed to protecting your personal data and
              respecting your privacy. This Privacy Policy explains how we collect, use, store, and share your
              information when you use our platform, in accordance with the General Data Protection Regulation
              (GDPR) and other applicable data protection laws.
            </p>
            <p>
              By accessing or using Quicklancers, you acknowledge that you have read and understood this Privacy
              Policy. If you do not agree with any part of this policy, please discontinue use of our services.
            </p>
          </section>

          <section id="section-2">
            <h2>2. Data Controller</h2>
            <p>The entity responsible for the processing of your personal data is:</p>
            <div className="pp-card">
              <p><strong>Quicklancers Inc.</strong></p>
              <p>Website: <strong>Quicklancers.com</strong></p>
              <p>Country: <strong>Germany</strong></p>
              <p>Contact: <a href="mailto:Luis.herbrand@gmail.com">Luis.herbrand@gmail.com</a></p>
            </div>
            <p>
              If you have any questions or concerns about how your data is processed, you may contact us at
              the address above.
            </p>
          </section>

          <section id="section-3">
            <h2>3. Personal Data We Collect</h2>
            <p>We collect the following categories of personal data when you register or use our services:</p>
            <ul>
              <li><strong>Full name</strong> — to identify you on the platform and in communications.</li>
              <li><strong>Age</strong> — to verify you meet the minimum age requirement of 13 years.</li>
              <li><strong>Job title / professional role</strong> — to personalise your experience and match you with relevant services.</li>
              <li><strong>Email address</strong> — for account authentication, order confirmations, notifications, and support.</li>
              <li><strong>Phone number</strong> — optionally collected for account verification and seller identity purposes.</li>
            </ul>
            <p>
              We may also collect technical data automatically, such as IP address, browser type, device information,
              and usage data through cookies and analytics tools. See sections 6 and 7 for details.
            </p>
          </section>

          <section id="section-4">
            <h2>4. Legal Basis for Processing</h2>
            <p>
              We process your personal data on the following legal bases under Article 6 of the GDPR:
            </p>
            <ul>
              <li>
                <strong>Art. 6(1)(a) — Consent:</strong> Where you have given us clear consent to process your data
                for a specific purpose, such as subscribing to our newsletter or accepting non-essential cookies.
              </li>
              <li>
                <strong>Art. 6(1)(b) — Contract:</strong> Where processing is necessary to perform a contract with
                you, such as facilitating a service purchase or managing your account.
              </li>
              <li>
                <strong>Art. 6(1)(c) — Legal obligation:</strong> Where we are required to process your data to
                comply with a legal obligation, such as tax or financial record-keeping requirements.
              </li>
              <li>
                <strong>Art. 6(1)(f) — Legitimate interests:</strong> Where processing is necessary for our
                legitimate business interests, such as fraud prevention, improving the platform, and ensuring
                platform security, provided these interests are not overridden by your rights.
              </li>
            </ul>
          </section>

          <section id="section-5">
            <h2>5. Newsletter</h2>
            <p>
              If you subscribe to our newsletter, we will use your email address to send you updates about
              Quicklancers, new features, and relevant platform news. Your consent is obtained at the point of
              subscription in accordance with Art. 6(1)(a) GDPR.
            </p>
            <p>
              You may unsubscribe at any time by clicking the "unsubscribe" link at the bottom of any newsletter
              email, or by contacting us directly at <a href="mailto:Luis.herbrand@gmail.com">Luis.herbrand@gmail.com</a>.
              Withdrawal of consent does not affect the lawfulness of processing carried out before withdrawal.
            </p>
          </section>

          <section id="section-6">
            <h2>6. Facebook Pixel &amp; Tracking</h2>
            <p>
              We may use the Facebook Pixel, a tracking technology provided by Meta Platforms, Inc., to measure
              the effectiveness of our advertising and understand how users interact with our platform. The
              Facebook Pixel collects data such as page views, events, and browsing behaviour and transmits
              this to Meta.
            </p>
            <p>
              This tracking is only activated if you have provided your consent via our cookie banner. You may
              withdraw your consent at any time through the Cookie Settings in the footer of our website.
              For more information about how Meta processes data, please refer to
              Meta's Data Policy at <strong>facebook.com/policy</strong>.
            </p>
          </section>

          <section id="section-7">
            <h2>7. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to operate and improve our platform. Cookies are
              small text files stored on your device when you visit our website.
            </p>
            <p>We use the following categories of cookies:</p>
            <ul>
              <li><strong>Strictly necessary cookies:</strong> Essential for the website to function, such as
              session management and authentication. These do not require your consent.</li>
              <li><strong>Functional cookies:</strong> Used to remember your preferences and settings.</li>
              <li><strong>Analytics cookies:</strong> Used to understand how visitors interact with our platform
              (e.g. Google Analytics). These require your consent.</li>
              <li><strong>Marketing cookies:</strong> Used for advertising and retargeting purposes (e.g. Facebook
              Pixel). These require your consent.</li>
            </ul>
            <p>
              You can manage your cookie preferences at any time through the Cookie Settings link in the footer.
              You may also control cookies through your browser settings.
            </p>
          </section>

          <section id="section-8">
            <h2>8. Data Sharing</h2>
            <p>
              We do not sell your personal data to third parties. We may share your data with trusted third-party
              service providers who assist us in operating the platform, including:
            </p>
            <ul>
              <li><strong>Stripe:</strong> Payment processing. Stripe's privacy policy governs their handling of
              payment data. We do not store full card details.</li>
              <li><strong>Email providers:</strong> To send transactional and notification emails.</li>
              <li><strong>Analytics providers:</strong> To understand platform usage and improve our services.</li>
              <li><strong>Hosting and infrastructure providers:</strong> To store and serve our platform.</li>
            </ul>
            <p>
              All third-party processors are bound by data processing agreements and are required to process
              data only on our instructions and in compliance with applicable data protection law.
            </p>
            <p>
              We may also disclose your data where required by law, court order, or regulatory authority.
            </p>
          </section>

          <section id="section-9">
            <h2>9. International Transfers</h2>
            <p>
              Some of our third-party service providers may be located outside the European Economic Area (EEA).
              Where we transfer personal data to countries that do not provide an equivalent level of data
              protection, we ensure appropriate safeguards are in place, such as:
            </p>
            <ul>
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
              <li>Adequacy decisions issued by the European Commission</li>
              <li>Other legally recognised transfer mechanisms under the GDPR</li>
            </ul>
            <p>
              You may request a copy of the relevant safeguards by contacting us at
              <a href="mailto:Luis.herbrand@gmail.com"> Luis.herbrand@gmail.com</a>.
            </p>
          </section>

          <section id="section-10">
            <h2>10. Age Restriction</h2>
            <p>
              Quicklancers is not intended for use by individuals under the age of <strong>13 years</strong>.
              We do not knowingly collect personal data from children under 13. If you are under 13, please
              do not use our platform or submit any personal data.
            </p>
            <p>
              If we become aware that we have inadvertently collected personal data from a child under 13 without
              verified parental consent, we will take immediate steps to delete that information. If you believe
              we may have collected data from a child under 13, please contact us immediately at
              <a href="mailto:Luis.herbrand@gmail.com"> Luis.herbrand@gmail.com</a>.
            </p>
          </section>

          <section id="section-11">
            <h2>11. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfil the purposes for which it
              was collected, including for the purposes of satisfying any legal, accounting, or reporting
              requirements.
            </p>
            <ul>
              <li><strong>Account data:</strong> Retained for as long as your account is active. Upon account
              deletion, your data is deleted within 30 days, unless retention is required by law.</li>
              <li><strong>Transaction data:</strong> Retained for up to 7 years in accordance with German
              commercial and tax law.</li>
              <li><strong>Marketing data:</strong> Retained until you withdraw consent or unsubscribe.</li>
              <li><strong>Support communications:</strong> Retained for up to 2 years after resolution.</li>
            </ul>
          </section>

          <section id="section-12">
            <h2>12. Your Rights under GDPR</h2>
            <p>
              Under the GDPR, you have the following rights regarding your personal data:
            </p>
            <ul>
              <li><strong>Right of access (Art. 15):</strong> You may request a copy of the personal data we
              hold about you.</li>
              <li><strong>Right to rectification (Art. 16):</strong> You may request correction of inaccurate
              or incomplete data.</li>
              <li><strong>Right to erasure (Art. 17):</strong> You may request deletion of your personal data
              ("right to be forgotten") in certain circumstances.</li>
              <li><strong>Right to restriction (Art. 18):</strong> You may request that we restrict the
              processing of your data in certain circumstances.</li>
              <li><strong>Right to data portability (Art. 20):</strong> You may request your data in a
              structured, commonly used, machine-readable format.</li>
              <li><strong>Right to object (Art. 21):</strong> You may object to processing based on legitimate
              interests or direct marketing at any time.</li>
              <li><strong>Right to withdraw consent:</strong> Where processing is based on consent, you may
              withdraw it at any time without affecting prior processing.</li>
              <li><strong>Right to lodge a complaint:</strong> You have the right to lodge a complaint with a
              supervisory authority. In Germany, this is the relevant state data protection authority
              (Landesdatenschutzbehörde).</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at
              <a href="mailto:Luis.herbrand@gmail.com"> Luis.herbrand@gmail.com</a>. We will respond within
              30 days as required by the GDPR.
            </p>
          </section>

          <section id="section-13">
            <h2>13. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data
              against unauthorised access, accidental loss, destruction, or disclosure. These measures include:
            </p>
            <ul>
              <li>Encrypted data transmission using HTTPS/TLS</li>
              <li>Secure password storage using hashing</li>
              <li>Access controls limiting data access to authorised personnel</li>
              <li>Payment processing handled exclusively by Stripe, a PCI-DSS compliant provider</li>
            </ul>
            <p>
              While we take all reasonable steps to protect your data, no method of transmission over the
              internet or method of electronic storage is 100% secure. In the event of a data breach that
              poses a risk to your rights and freedoms, we will notify the relevant supervisory authority
              within 72 hours and, where required, inform affected users.
            </p>
          </section>

          <section id="section-14">
            <h2>14. No Advertising to Minors</h2>
            <p>
              Quicklancers does not knowingly serve personalised advertising to users under the age of 18.
              We do not use personal data collected from minors for advertising or marketing purposes, and
              our advertising tools are configured to exclude audiences under 18 where technically possible.
            </p>
          </section>

          <section id="section-15">
            <h2>15. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
              legal requirements, or other factors. When we make material changes, we will notify you by email
              (if you have an account) or by posting a prominent notice on our platform prior to the change
              becoming effective.
            </p>
            <p>
              The "Effective date" at the top of this policy indicates when it was last updated. Your continued
              use of Quicklancers after changes become effective constitutes acceptance of the updated policy.
              We encourage you to review this page periodically.
            </p>
          </section>

          <section id="section-16">
            <h2>16. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data
              processing practices, please contact us:
            </p>
            <div className="pp-card">
              <p><strong>Quicklancers Inc.</strong></p>
              <p>Email: <a href="mailto:Luis.herbrand@gmail.com">Luis.herbrand@gmail.com</a></p>
              <p>Website: <strong>Quicklancers.com</strong></p>
              <p>Country: <strong>Germany</strong></p>
            </div>
            <p>
              We take all privacy concerns seriously and aim to respond to all enquiries within 30 days.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
