import type {
  InkeepAIChatSettings,
  InkeepSearchSettings,
  InkeepWidgetBaseSettings,
  InkeepModalSettings,
} from "@inkeep/widgets";
import { useTheme } from "nextra-theme-docs";

type InkeepSharedSettings = {
  baseSettings: InkeepWidgetBaseSettings;
  aiChatSettings: InkeepAIChatSettings;
  searchSettings: InkeepSearchSettings;
  modalSettings: InkeepModalSettings;
};

const useInkeepSettings = (): InkeepSharedSettings => {
  const { resolvedTheme } = useTheme();
  const baseSettings: InkeepWidgetBaseSettings = {
    apiKey: process.env.INKEEP_API_KEY,
    integrationId: process.env.INKEEP_INTEGRATION_ID,
    organizationId: process.env.INKKEEP_ORGANIZATION_ID,
    primaryBrandColor: "#efe0ff", // your brand color, widget color scheme is derived from this
    organizationDisplayName: "Auth.js",
    theme: {
      colorMode: {
        forcedColorMode: resolvedTheme, // to sync dark mode with the widget
      },
    },
  };

  const modalSettings: InkeepModalSettings = {
    // optional settings
  };

  const searchSettings: InkeepSearchSettings = {
    // optional settings
  };

  const aiChatSettings: InkeepAIChatSettings = {
    // optional settings
    botAvatarSrcUrl: "/img/etc/logo-sm.webp",
    quickQuestions: [
      "Example question 1?",
      "Example question 2?",
      "Example question 3?",
    ],
  };

  return { baseSettings, aiChatSettings, searchSettings, modalSettings };
};

export default useInkeepSettings;
