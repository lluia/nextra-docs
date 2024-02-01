# providers/battlenet

<div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>Battle.net</b> integration.</span>
<a href="https://Battle.net/">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/battlenet.svg" height="48" width="48"/>
</a>
</div>

## default()

```ts
function default<P>(options): OAuthConfig<P>
```

Add Battle.net login to your page.

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/battlenet
```

#### Configuration
```js
import Auth from "@auth/core"
import BattleNet from "@auth/core/providers/battlenet"

const request = new Request(origin)
const response = await Auth(request, {
  providers: [BattleNet({ clientId: BATTLENET_CLIENT_ID, clientSecret: BATTLENET_CLIENT_SECRET. issuer: BATTLENET_ISSUER })],
})
```
issuer must be one of these values, based on the available regions:
```
type BattleNetIssuer =
  | "https://oauth.battle.net"
  | "https://oauth.battlenet.com.cn"
  | "https://www.battlenet.com.cn/oauth"
  | "https://us.battle.net/oauth"
  | "https://eu.battle.net/oauth"
  | "https://kr.battle.net/oauth"
  | "https://tw.battle.net/oauth"
```

### Resources

 - [BattleNet OAuth documentation](https://develop.battle.net/documentation/guides/using-oauth)

### Notes

By default, Auth.js assumes that the BattleNet provider is
based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.

:::tip

The BattleNet provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/battlenet.ts).
To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

:::

:::info **Disclaimer**

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

:::

### Type parameters

• **P** extends `BattleNetProfile`

### Parameters

• **options**: `OAuthUserConfig`\<`P`\> & \{
  `issuer`: [`BattleNetIssuer`](/reference/core/providers/battlenet.md#battlenetissuer);
  }

### Returns

`OAuthConfig`\<`P`\>

***

## BattleNetIssuer

```ts
type BattleNetIssuer: "https://oauth.battle.net" | "https://oauth.battlenet.com.cn" | "https://www.battlenet.com.cn/oauth" | \https://${"us" | "eu" | "kr" | "tw"}.battle.net/oauth\;
```

See the [available regions](https://develop.battle.net/documentation/guides/regionality-and-apis)
