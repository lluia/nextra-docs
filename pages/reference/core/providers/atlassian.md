# providers/atlassian

<div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
<span style={{fontSize: "1.35rem" }}>
 Built-in sign in with <b>Atlassian</b> integration.
</span>
<a href="https://www.atlassian.com/" style={{backgroundColor: "black", padding: "12px", borderRadius: "100%" }}>
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/atlassian.svg" width="24" style={{ marginTop: "-3px"}} />
</a>
</div>

## Interfaces

### AtlassianProfile

The returned user profile from Atlassian when using the profile callback.

#### Extends

- `Record`\<`string`, `any`\>

#### Properties

##### account\_id

> **account\_id**: `string`

The user's atlassian account ID

##### email

> **email**: `string`

The user's email

##### name

> **name**: `string`

The user name

##### picture

> **picture**: `string`

The user's profile picture

## Functions

### default()

> **default**\<`P`\>(`options`): `OAuthConfig`\<`P`\>

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/atlassian
```

#### Configuration

Import the provider and configure it in your **Auth.js** initialization file:

```ts title="pages/api/auth/[...nextauth].ts"
import NextAuth from "next-auth"
import AtlassianProvider from "next-auth/providers/atlassian"

export default NextAuth({
  providers: [
    AtlassianProvider({
      clientId: process.env.ATLASSIAN_ID,
      clientSecret: process.env.ATLASSIAN_SECRET,
    }),
  ],
})
```

### Resources

- [Atlassian docs](https://developer.atlassian.com/server/jira/platform/oauth/)

### Notes

The Atlassian provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/atlassian.ts). To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

## Help

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

#### Type parameters

• **P** extends [`AtlassianProfile`](atlassian.md#atlassianprofile)

#### Parameters

• **options**: `OAuthUserConfig`\<`P`\>

#### Returns

`OAuthConfig`\<`P`\>
