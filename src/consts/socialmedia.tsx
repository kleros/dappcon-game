import WebsiteLogo from "@/assets/socialmedia/website.svg?url";
import TelegramLogo from "@/assets/socialmedia/telegram.svg?url";
import XLogo from "@/assets/socialmedia/twitter.svg?url";

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
