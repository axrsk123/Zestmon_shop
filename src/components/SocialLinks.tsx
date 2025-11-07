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
            className="relative bg-gradient-to-r from-[#FF0000] to-[#CC0000] hover:from-[#CC0000] hover:to-[#990000] text-white shadow-xl hover:shadow-2xl transition-all gap-3 group-hover:scale-110 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700" />
            <Youtube className="h-6 w-6 relative z-10 group-hover:rotate-12 transition-transform" />
            <span className="font-bold relative z-10">Subscribe on YouTube</span>
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
            className="relative bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3C45A5] text-white shadow-xl hover:shadow-2xl transition-all gap-3 group-hover:scale-110 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 group-hover:translate-x-full transition-transform duration-700" />
            <MessageSquare className="h-6 w-6 relative z-10 group-hover:rotate-12 transition-transform" />
            <span className="font-bold relative z-10">Join Discord</span>
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
          className="group relative flex items-center justify-center h-10 w-10 rounded-full overflow-hidden"
          aria-label="YouTube Channel"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000] to-[#CC0000] group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 group-hover:translate-x-full transition-transform duration-500" />
          <Youtube className="h-5 w-5 text-white relative z-10 group-hover:scale-125 transition-transform" />
        </a>
        <a
          href="https://discord.gg/NgU8dNap"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center h-10 w-10 rounded-full overflow-hidden"
          aria-label="Discord Community"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2] to-[#4752C4] group-hover:scale-110 transition-transform" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 group-hover:translate-x-full transition-transform duration-500" />
          <MessageSquare className="h-5 w-5 text-white relative z-10 group-hover:scale-125 transition-transform" />
        </a>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <a
        href="https://www.youtube.com/channel/UCofvtlvoXM0ElgAgcrrWhqQ"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center h-14 w-14 rounded-full overflow-hidden shadow-xl hover:shadow-2xl"
        aria-label="YouTube Channel"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000] via-[#FF3333] to-[#CC0000] group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 group-hover:translate-x-full transition-transform duration-700" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] transition-opacity" />
        <Youtube className="h-7 w-7 text-white relative z-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
      </a>
      <a
        href="https://discord.gg/NgU8dNap"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center h-14 w-14 rounded-full overflow-hidden shadow-xl hover:shadow-2xl"
        aria-label="Discord Community"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2] via-[#6875F5] to-[#4752C4] group-hover:scale-110 transition-transform" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 group-hover:translate-x-full transition-transform duration-700" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] transition-opacity" />
        <MessageSquare className="h-7 w-7 text-white relative z-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
      </a>
    </div>
  );
};

export default SocialLinks;
