import netlify from "@astrojs/netlify"
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import {defineConfig, envField} from "astro/config"

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind({applyBaseStyles: false}), react()],
  adapter: netlify(),
  image: {
    domains: ["niama-theodosis.imgix.net"],
  },
  experimental: {
    actions: true,
    env: {
      schema: {
        PUBLIC_HASHNODE_GQL_ENDPOINT: envField.string({context: "server", access: "public"}),
        PUBLIC_HASHNODE_PUBLICATION_HOST: envField.string({context: "server", access: "public"}),
        HASHNODE_PUBLICATION_ID: envField.string({context: "server", access: "secret"}),
        HASHNODE_WEBHOOK_SECRET: envField.string({context: "server", access: "secret"}),
        PUBLIC_IMGIX_URL: envField.string({context: "server", access: "public"}),
        PUBLIC_POCKETBASE_URL: envField.string({context: "server", access: "public"}),
        RESEND_API_KEY: envField.string({context: "server", access: "secret"}),
      },
    },
  },
})
