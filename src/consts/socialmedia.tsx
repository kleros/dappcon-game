import WebsiteLogo from "@/assets/socialmedia/website.svg";
import TelegramLogo from "@/assets/socialmedia/telegram.svg";
import XLogo from "@/assets/socialmedia/twitter.svg";

interface SocialMedia {
  icon: string;
  url: string;
}

export const socialmedia: Record<string, SocialMedia> = {
  etherscan: {
    icon: WebsiteLogo ,
    url: "https://kleros.io/",
  },
  x: {
    icon: XLogo ,
    url: "https://x.com/kleros_io",
  },
  telegram: {
    icon: TelegramLogo ,
    url: "https://t.me/kleros",
  },
  
};
