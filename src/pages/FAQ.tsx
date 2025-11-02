import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What ingredients do you use?",
      answer: "We use only fresh, natural ingredients - real lemons, pure cane sugar, filtered water, and natural fruit extracts. No artificial flavors, colors, or preservatives.",
    },
    {
      question: "How long does shipping take?",
      answer: "Orders are typically processed within 1-2 business days. Shipping takes 3-5 business days for standard delivery. Express shipping options are available at checkout.",
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also view your order status in your account profile.",
    },
    {
      question: "What's your return policy?",
      answer: "We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, contact us for a full refund or replacement. See our Refund Policy for details.",
    },
    {
      question: "Are your products organic?",
      answer: "Our lemons are sourced from certified organic farms. We're committed to using the highest quality, pesticide-free ingredients whenever possible.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we only ship within the United States. We're working on expanding international shipping soon!",
    },
    {
      question: "How should I store the lemonade?",
      answer: "Keep refrigerated at all times. Consume within 7 days of opening for best taste and quality. Shake well before serving.",
    },
    {
      question: "Do you offer bulk or wholesale pricing?",
      answer: "Yes! For bulk orders or wholesale inquiries, please contact us directly at wholesale@zestmon.com.",
    },
    {
      question: "Are your bottles recyclable?",
      answer: "Absolutely! Our bottles are made from 100% recyclable plastic. We're also exploring more eco-friendly packaging options.",
    },
    {
      question: "Can I customize my order?",
      answer: "Currently, we offer our products as shown on the website. However, we love hearing customer ideas! Contact us with special requests.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">
            Got questions? We've got answers!
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full mb-8">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Still have questions? We're here to help!
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/contact")}>Contact Us</Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Back to Shop
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
