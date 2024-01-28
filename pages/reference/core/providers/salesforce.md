# providers/salesforce

<div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>Salesforce</b> integration.</span>
<a href="https://www.salesforce.com/ap/?ir=1">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/saleforce.svg" height="48" />
</a>
</div>

## Contents

- [Functions](salesforce.md#functions)
    - [default](salesforce.md#default)

## Functions

### default()

> **default**\<`P`\>(`options`): `OAuthConfig`\<`P`\>

Add SaleForce login to your page.

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/saleforce
```

#### Configuration
```js
import Auth from "@auth/core"
import SaleForce from "@auth/core/providers/saleforce"

const request = new Request(origin)
const response = await Auth(request, {
  providers: [SaleForce({ clientId: SALEFORCE_CLIENT_ID, clientSecret: SALEFORCE_CLIENT_SECRET })],
})
```

### Resources

- [SaleForce OAuth documentation](https://help.salesforce.com/articleView?id=remoteaccess_authenticate.htm&type=5)

### Notes

By default, Auth.js assumes that the SaleForce provider is
based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.

:::tip

The SaleForce provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/saleforce.ts).
To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

:::

:::info **Disclaimer**

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

:::

#### Type parameters

• **P** extends `SalesforceProfile`

#### Parameters

• **options**: `OAuthUserConfig`\<`P`\>

#### Returns

`OAuthConfig`\<`P`\>
