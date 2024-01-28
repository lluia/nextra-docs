# providers/dribbble

<div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>Dribbble</b> integration.</span>
<a href="https://dribbble.com">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/dribbble.svg" height="48" width="48"/>
</a>
</div>

## default()

```ts
default<P>(options): OAuthConfig<P>
```

Add Dribbble login to your page.

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/dribbble
```

#### Configuration
```js
import Auth from "@auth/core"
import Dribbble from "@auth/core/providers/dribbble"

const request = new Request(origin)
const response = await Auth(request, {
  providers: [Dribbble({ clientId: DRIBBBLE_CLIENT_ID, clientSecret: DRIBBBLE_CLIENT_SECRET })],
})
```

### Resources

 - [Dribbble API](https://developer.dribbble.com)
 - [Dribbble OAuth](https://developer.dribbble.com/v2/oauth/)
 - [Dribbble Applications](https://dribbble.com/account/applications/new)

### Notes

By default, Auth.js assumes that the GitHub provider is
based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.

:::tip

The Dribbble provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/dribbble.ts).
To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

:::

:::info **Disclaimer**

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

:::

:::tip
You can optionally set the scope to `public upload` for more advanced scenarios. If omitted, the default `public` scope will be used for authentication purposes.
:::

### Type parameters

• **P** extends `DribbbleProfile`

### Parameters

• **options**: `OAuthUserConfig`\<`P`\> & \{
  `scope`: `"public"` \| `"public upload"`;
  }

### Returns

`OAuthConfig`\<`P`\>
