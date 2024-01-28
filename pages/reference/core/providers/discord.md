# providers/discord

<div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>Discord</b> integration.</span>
<a href="https://discord.com/">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/discord.svg" height="48" width="48"/>
</a>
</div>

## default()

```ts
function default<P>(options): OAuthConfig<P>
```

Add Discord login to your page.

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/discord
```

#### Configuration
```js
import Auth from "@auth/core"
import Discord from "@auth/core/providers/discord"

const request = new Request(origin)
const response = await Auth(request, {
  providers: [Discord({ clientId: DISCORD_CLIENT_ID, clientSecret: DISCORD_CLIENT_SECRET })],
})
```

### Resources

 - [Discord OAuth documentation](https://discord.com/developers/docs/topics/oauth2)
 - [Discord OAuth apps](https://discord.com/developers/applications)

### Notes

By default, Auth.js assumes that the Discord provider is
based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.

:::tip

The Discord provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/discord.ts).
To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

:::

:::info **Disclaimer**

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

:::

### Type parameters

• **P** extends [`DiscordProfile`](discord.md#discordprofile)

### Parameters

• **options**: `OAuthUserConfig`\<`P`\>

### Returns

`OAuthConfig`\<`P`\>

***

## DiscordProfile

Corresponds to the user structure documented here:
https://discord.com/developers/docs/resources/user#user-object-user-structure

### Extends

- `Record`\<`string`, `any`\>

### Properties

#### accent\_color

```ts
accent_color: null | number;
```

the user's banner color encoded as an integer representation of hexadecimal color code

#### avatar

```ts
avatar: null | string;
```

the user's avatar hash:
https://discord.com/developers/docs/reference#image-formatting

#### avatar\_decoration

```ts
avatar_decoration: null | string;
```

undocumented field; corresponds to the Discord feature where you can e.g.
put your avatar inside of an ice cube

#### banner

```ts
banner: null | string;
```

the user's banner hash:
https://discord.com/developers/docs/reference#image-formatting

#### banner\_color

```ts
banner_color: null | string;
```

undocumented field; corresponds to the premium feature where you can
select a custom banner color

#### discriminator

```ts
discriminator: string;
```

the user's Discord-tag

#### display\_name

```ts
display_name: null | string;
```

undocumented field; corresponds to the user's custom nickname

#### email

```ts
email: null | string;
```

the user's email

#### flags

```ts
flags: number;
```

the flags on a user's account:
https://discord.com/developers/docs/resources/user#user-object-user-flags

#### global\_name

```ts
global_name: null | string;
```

the user's display name, if it is set

#### id

```ts
id: string;
```

the user's id (i.e. the numerical snowflake)

#### image\_url

```ts
image_url: string;
```

undocumented field; the CDN URL of their profile picture

#### locale

```ts
locale: string;
```

the user's chosen language option:
https://discord.com/developers/docs/reference#locales

#### mfa\_enabled

```ts
mfa_enabled: boolean;
```

whether the user has two factor enabled on their account

#### premium\_type

```ts
premium_type: number;
```

the type of Nitro subscription on a user's account:
https://discord.com/developers/docs/resources/user#user-object-premium-types

#### public\_flags

```ts
public_flags: number;
```

the public flags on a user's account:
https://discord.com/developers/docs/resources/user#user-object-user-flags

#### username

```ts
username: string;
```

the user's username, not unique across the platform

#### verified

```ts
verified: boolean;
```

whether the email on this account has been verified

#### bot?

```ts
bot?: boolean;
```

whether the user belongs to an OAuth2 application

#### system?

```ts
system?: boolean;
```

whether the user is an Official Discord System user (part of the urgent
message system)
