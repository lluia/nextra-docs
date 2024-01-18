type Details = {
  title: string;
  code: string;
  logo: string;
  logoW: string;
  example: string;
};

export enum FrameWork {
  NextJs = "nextjs",
  Svelte = "svelte",
  SolidStart = "solidstart",
  // Express = "express",
}

export const frameworkDetails: Record<FrameWork, Details> = {
  [FrameWork.NextJs]: {
    title: "Next.js",
    code: codeNextJs(),
    logo: "https://authjs.dev/img/frameworks/nextjs.svg",
    logoW: "45",
    example: "https://next-auth-example.vercel.app/",
  },
  [FrameWork.Svelte]: {
    title: "Sveltekit",
    code: codeSvelte(),
    logo: "https://authjs.dev/img/frameworks/sveltekit.svg",
    logoW: "40",
    example: "https://sveltekit-auth-example.vercel.app/",
  },
  [FrameWork.SolidStart]: {
    title: "SolidStart",
    code: codeSolid(),
    logo: "https://authjs.dev/img/frameworks/solidstart.svg",
    logoW: "45",
    example: "https://auth-solid.vercel.app/",
  },
};

/**
 * Using functions for these to not have to have them at the top of the file and block readability...
 */
function codeNextJs() {
  return `
// auth.ts
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
export const { auth, handlers } = NextAuth({ providers: [ GitHub ] })
  
// middleware.ts
export { auth as default } from "auth"
  
// app/api/auth/[...nextauth].ts
import { handlers } from "auth"
export const { GET, POST } = handlers
export const runtime = "edge"
`;
}

function codeSvelte() {
  return `
import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from '@auth/sveltekit/providers/github'
  
export const handle = SvelteKitAuth({
  providers: [
    GitHub()
  ],
})
`;
}

function codeSolid() {
  return `
import { SolidAuth } from "@auth/solid-start"
import GitHub from "@auth/core/providers/github"
  
export const { GET, POST } = SolidAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    })
  ]
})
`;
}
