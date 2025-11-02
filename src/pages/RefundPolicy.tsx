import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const RefundPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">30-Day Satisfaction Guarantee</h2>
            <p>
              At Zestmon, we stand behind the quality of our products. If you're not completely
              satisfied with your purchase, we offer a 30-day money-back guarantee.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Eligibility for Refunds</h2>
            <p>To be eligible for a refund:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The request must be made within 30 days of delivery</li>
              <li>Products must be in their original packaging when possible</li>
              <li>You must provide proof of purchase (order number)</li>
              <li>The product must not have been damaged due to misuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
            <p>To initiate a refund:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact our customer service at refunds@zestmon.com or call +1 (555) 123-4567</li>
              <li>Provide your order number and reason for return</li>
              <li>We'll send you return shipping instructions</li>
              <li>Ship the product back to us using the provided instructions</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Refund Processing</h2>
            <p>
              Once we receive your returned product, we will inspect it and process your refund within
              5-7 business days. Refunds will be issued to the original payment method. Please allow
              additional time for your bank or credit card company to process the refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Return Shipping Costs</h2>
            <p>
              For defective products or shipping errors, we'll cover return shipping costs. For
              standard returns based on preference, customers are responsible for return shipping fees.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Damaged or Defective Products</h2>
            <p>
              If you receive a damaged or defective product, please contact us immediately with photos
              of the damage. We'll arrange for a replacement or full refund, including shipping costs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Non-Refundable Items</h2>
            <p>The following items are non-refundable:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Products consumed after 7 days from delivery</li>
              <li>Products without original packaging (except for defects)</li>
              <li>Gift cards and promotional items</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Exchanges</h2>
            <p>
              We currently do not offer direct exchanges. If you'd like a different product, please
              request a refund and place a new order for the desired item.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Late or Missing Refunds</h2>
            <p>
              If you haven't received your refund within the expected timeframe, please check with
              your bank or credit card company first. If you still haven't received it after that,
              contact us at refunds@zestmon.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Bulk Orders</h2>
            <p>
              Special terms may apply to bulk or wholesale orders. Please contact us directly for
              information about returns on bulk purchases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              Questions about our refund policy? We're here to help!
              <br />
              Email: refunds@zestmon.com
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

export default RefundPolicy;
