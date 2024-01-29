import type {
  InkeepAIChatSettings,
  InkeepWidgetBaseSettings,
  InkeepModalSettings,
} from "@inkeep/widgets";
import { useTheme } from "nextra-theme-docs";

type InkeepSharedSettings = {
  baseSettings: InkeepWidgetBaseSettings;
  aiChatSettings: InkeepAIChatSettings;
  modalSettings: InkeepModalSettings;
};

const useInkeepSettings = (): InkeepSharedSettings => {
  const { resolvedTheme } = useTheme();
  const baseSettings: InkeepWidgetBaseSettings = {
    apiKey: process.env.NEXT_PUBLIC_INKEEP_API_KEY,
    integrationId: process.env.NEXT_PUBLIC_INKEEP_INTEGRATION_ID,
    organizationId: process.env.NEXT_PUBLIC_INKEEP_ORGANIZATION_ID,
    primaryBrandColor: "#efe0ff", // your brand color, widget color scheme is derived from this
    organizationDisplayName: "Auth.js",
    theme: {
      colorMode: {
        forcedColorMode: resolvedTheme, // to sync dark mode with the widget
      },
    },
  };

  const modalSettings: InkeepModalSettings = {
    defaultView: "AI_CHAT",
    switchToChatMessage: "Switch to chat",
  };

  const aiChatSettings: InkeepAIChatSettings = {
    botAvatarSrcUrl: "/img/etc/logo-sm.webp",
    quickQuestions: [
      "How do I migrate my Next.js app from v4 to v5?",
      "How do I save extra fields from a provider's user profile response?",
      "How do I access the session object in SvelteKit?",
    ],
  };

  return { baseSettings, aiChatSettings, modalSettings };
};

export default useInkeepSettings;
