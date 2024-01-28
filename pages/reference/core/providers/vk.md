# providers/vk

<div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>VK</b> integration.</span>
<a href="https://vk.com/">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/vk.svg" height="48" />
</a>
</div>

## Contents

- [Interfaces](vk.md#interfaces)
    - [VkProfile](vk.md#vkprofile)
- [Functions](vk.md#functions)
    - [default](vk.md#default)

## Interfaces

### VkProfile

https://dev.vk.com/reference/objects/user

## Functions

### default()

> **default**\<`P`\>(`options`): `OAuthConfig`\<`P`\>

Add VK login to your page.

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/vk
```

#### Configuration
```js
import Auth from "@auth/core"
import VK from "@auth/core/providers/vk"

const request = new Request(origin)
const response = await Auth(request, {
  providers: [VK({ clientId: VK_CLIENT_ID, clientSecret: VK_CLIENT_SECRET })],
})
```

### Resources

- [VK API documentation](https://vk.com/dev/first_guide)
- [VK App configuration](https://vk.com/apps?act=manage)

### Notes

By default, Auth.js assumes that the VK provider is
based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.

:::tip

The VK provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/vk.ts).
To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

:::

:::note

By default the provider uses 5.126 version of the API. See https://vk.com/dev/versions for more info.
If you want to use a different version, you can pass it to provider's options object:
```js title="pages/api/auth/[...nextauth].js"
const apiVersion = "5.126"
providers: [
  VkProvider({
    accessTokenUrl: `https://oauth.vk.com/access_token?v=${apiVersion}`,
    requestTokenUrl: `https://oauth.vk.com/access_token?v=${apiVersion}`,
    authorizationUrl:
      `https://oauth.vk.com/authorize?response_type=code&v=${apiVersion}`,
    profileUrl: `https://api.vk.com/method/users.get?fields=photo_100&v=${apiVersion}`,
  })
]
```

:::

:::info **Disclaimer**

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

:::

#### Type parameters

• **P** extends `Record`\<`string`, `any`\> = [`VkProfile`](vk.md#vkprofile)

#### Parameters

• **options**: `OAuthUserConfig`\<`P`\>

#### Returns

`OAuthConfig`\<`P`\>
