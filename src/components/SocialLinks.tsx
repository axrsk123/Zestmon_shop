import { Youtube, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialLinksProps {
  variant?: "default" | "hero" | "compact";
  showLabels?: boolean;
}

const SocialLinks = ({ variant = "default", showLabels = true }: SocialLinksProps) => {
  if (variant === "hero") {
    return (
      <div className="flex gap-4">
        <a
          href="https://www.youtube.com/channel/UCofvtlvoXM0ElgAgcrrWhqQ"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Button 
            size="lg" 
            className="relative bg-[#FF0000] hover:bg-[#CC0000] text-white shadow-lg hover:shadow-xl transition-all gap-3 group-hover:scale-105"
          >
            <Youtube className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Subscribe on YouTube</span>
          </Button>
        </a>
        <a
          href="https://discord.gg/NgU8dNap"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <Button 
            size="lg" 
            className="relative bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg hover:shadow-xl transition-all gap-3 group-hover:scale-105"
          >
            <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Join Discord</span>
          </Button>
        </a>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className="flex gap-2">
        <a
          href="https://www.youtube.com/channel/UCofvtlvoXM0ElgAgcrrWhqQ"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-9 w-9 rounded-lg bg-[#FF0000] hover:bg-[#CC0000] transition-all hover:scale-110 shadow-md"
          aria-label="YouTube Channel"
        >
          <Youtube className="h-5 w-5 text-white" />
        </a>
        <a
          href="https://discord.gg/NgU8dNap"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center h-9 w-9 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] transition-all hover:scale-110 shadow-md"
          aria-label="Discord Community"
        >
          <MessageSquare className="h-5 w-5 text-white" />
        </a>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      <a
        href="https://www.youtube.com/channel/UCofvtlvoXM0ElgAgcrrWhqQ"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] transition-all hover:scale-110 shadow-lg"
        aria-label="YouTube Channel"
      >
        <Youtube className="h-6 w-6 text-white" />
      </a>
      <a
        href="https://discord.gg/NgU8dNap"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] transition-all hover:scale-110 shadow-lg"
        aria-label="Discord Community"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </a>
    </div>
  );
};

export default SocialLinks;
