import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Zestmon's website and services, you accept and agree to be bound
              by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
            <p>You agree to use our services only for lawful purposes and in accordance with these terms. You must not:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use our services in any way that violates applicable laws</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Engage in any activity that interferes with our services</li>
              <li>Impersonate another person or entity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
            <p>
              To access certain features, you may need to create an account. You are responsible for
              maintaining the confidentiality of your account credentials and for all activities under
              your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Orders and Payments</h2>
            <p>
              All orders are subject to acceptance and availability. We reserve the right to refuse
              any order. Prices are subject to change without notice. Payment must be received before
              order fulfillment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Shipping and Delivery</h2>
            <p>
              We strive to deliver orders within the estimated timeframe. However, we are not
              responsible for delays caused by shipping carriers or circumstances beyond our control.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Returns and Refunds</h2>
            <p>
              Our return and refund policy is outlined in our Refund Policy. Please review it before
              making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, and images, is the property
              of Zestmon and protected by copyright laws. You may not reproduce or distribute our
              content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
            <p>
              Zestmon shall not be liable for any indirect, incidental, special, or consequential
              damages arising from your use of our services or products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Indemnification</h2>
            <p>
              You agree to indemnify and hold Zestmon harmless from any claims, damages, or expenses
              arising from your violation of these terms or your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by the laws of the State of California, without
              regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective
              immediately upon posting. Your continued use of our services constitutes acceptance of
              the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
            <p>
              For questions about these Terms of Service, contact us at:
              <br />
              Email: legal@zestmon.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>

        <div className="mt-8">
          <Button onClick={() => navigate("/")}>Back to Shop</Button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
