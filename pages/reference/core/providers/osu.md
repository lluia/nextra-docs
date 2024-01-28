# providers/osu

<div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>osu!</b> integration.</span>
<a href="https://osu.ppy.sh/home">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/osu.svg" height="48" />
</a>
</div>

## Functions

### default()

> **default**\<`P`\>(`options`): `OAuthConfig`\<`P`\>

Add osu! login to your page.

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/osu
```

#### Configuration
```js
import Auth from "@auth/core"
import Osu from "@auth/core/providers/osu"

const request = new Request(origin)
const response = await Auth(request, {
  providers: [Osu({ clientId: OSU_CLIENT_ID, clientSecret: OSU_CLIENT_SECRET })],
})
```

### Resources

 - [osu! OAuth documentation](https://osu.ppy.sh/docs/index.html#authentication)
 - [osu! app console](https://osu.ppy.sh/home/account/edit#new-oauth-application)

### Notes

By default, Auth.js assumes that the Osu provider is
based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.

:::note

osu! does not provide a user email.

:::

:::tip

The osu! provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/osu.ts).
To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

:::

:::info **Disclaimer**

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

:::

#### Type parameters

• **P** extends `OsuProfile`

#### Parameters

• **options**: `OAuthUserConfig`\<`P`\>

#### Returns

`OAuthConfig`\<`P`\>
