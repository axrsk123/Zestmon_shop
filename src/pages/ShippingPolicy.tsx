import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ShippingPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Shipping Policy</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Areas</h2>
            <p>
              We currently ship to all 50 states within the United States. International shipping is
              not available at this time but we're working on expanding our reach!
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
            <p>
              Orders are typically processed within 1-2 business days (Monday-Friday, excluding
              holidays). You'll receive an email confirmation when your order is ready to ship.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Methods & Timeframes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">Standard Shipping (3-5 business days)</h3>
                <p>Our most economical option. Perfect for planning ahead!</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Orders under $50: $7.99</li>
                  <li>Orders $50+: FREE</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Express Shipping (2-3 business days)</h3>
                <p>Get your lemonade fix faster!</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Flat rate: $14.99</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Overnight Shipping (1 business day)</h3>
                <p>For when you need it tomorrow!</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Flat rate: $29.99</li>
                  <li>Orders placed by 12 PM EST qualify for next-day delivery</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
            <p>
              Once your order ships, you'll receive a tracking number via email. You can track your
              package in real-time through your account profile or using the carrier's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Packaging</h2>
            <p>
              We take pride in our packaging! Your lemonade bottles are carefully packed with
              insulation and ice packs to ensure they arrive fresh and cold. All packaging materials
              are recyclable or biodegradable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Shipping Restrictions</h2>
            <p>Unfortunately, we cannot ship to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>P.O. Boxes (due to refrigeration requirements)</li>
              <li>Military APO/FPO addresses (working on this!)</li>
              <li>International addresses</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Delivery Issues</h2>
            <p>If you experience any delivery issues:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Delayed packages:</strong> Contact the carrier first using your tracking
                number. If unresolved, contact us.
              </li>
              <li>
                <strong>Damaged packages:</strong> Take photos and contact us immediately at
                support@zestmon.com.
              </li>
              <li>
                <strong>Lost packages:</strong> We'll investigate with the carrier and provide a
                replacement or refund.
              </li>
              <li>
                <strong>Wrong address:</strong> We can redirect packages if notified before shipping.
                After shipping, address corrections may incur additional fees from the carrier.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Seasonal Considerations</h2>
            <p>
              During extreme weather (very hot or very cold), we may adjust shipping schedules to
              ensure product quality. We'll notify you if your order is affected.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Bulk Orders</h2>
            <p>
              For orders of 24+ bottles, please contact us for special shipping rates and arrangements
              at wholesale@zestmon.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Holiday Shipping</h2>
            <p>
              During peak holiday seasons (Thanksgiving, Christmas, etc.), processing and shipping
              times may be extended. Order early to ensure timely delivery! We'll post holiday cutoff
              dates on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              Questions about shipping? We're here to help!
              <br />
              Email: shipping@zestmon.com
              <br />
              Phone: +1 (555) 123-4567
              <br />
              Hours: Monday-Friday, 9 AM - 6 PM PST
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

export default ShippingPolicy;
