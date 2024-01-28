# providers/okta

<div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>Okta</b> integration.</span>
<a href="https://okta.com/">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/okta.svg" height="48" />
</a>
</div>

## default()

```ts
default<P>(options): OAuthConfig<P>
```

Add Okta login to your page.

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/okta
```

#### Configuration
```js
import Auth from "@auth/core"
import Okta from "@auth/core/providers/okta"

const request = new Request(origin)
const response = await Auth(request, {
  providers: [Okta({ clientId: OKTA_CLIENT_ID, clientSecret: OKTA_CLIENT_SECRET, issuer: OKTA_ISSUER })],
})
```

### Resources

 - [Okta OAuth documentation](https://developer.okta.com/docs/reference/api/oidc)

### Notes

By default, Auth.js assumes that the Okta provider is
based on the [Open ID Connect](https://openid.net/specs/openid-connect-core-1_0.html) specification.

:::tip

The Okta provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/okta.ts).
To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

:::

:::info **Disclaimer**

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

:::

### Type parameters

• **P** extends `OktaProfile`

### Parameters

• **options**: `OAuthUserConfig`\<`P`\>

### Returns

`OAuthConfig`\<`P`\>
