# providers/discord

<div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>Discord</b> integration.</span>
<a href="https://discord.com/">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/discord.svg" height="48" width="48"/>
</a>
</div>

## default()

> **default**\<`P`\>(`options`): `OAuthConfig`\<`P`\>

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

> **accent\_color**: `null` \| `number`

the user's banner color encoded as an integer representation of hexadecimal color code

#### avatar

> **avatar**: `null` \| `string`

the user's avatar hash:
https://discord.com/developers/docs/reference#image-formatting

#### avatar\_decoration

> **avatar\_decoration**: `null` \| `string`

undocumented field; corresponds to the Discord feature where you can e.g.
put your avatar inside of an ice cube

#### banner

> **banner**: `null` \| `string`

the user's banner hash:
https://discord.com/developers/docs/reference#image-formatting

#### banner\_color

> **banner\_color**: `null` \| `string`

undocumented field; corresponds to the premium feature where you can
select a custom banner color

#### discriminator

> **discriminator**: `string`

the user's Discord-tag

#### display\_name

> **display\_name**: `null` \| `string`

undocumented field; corresponds to the user's custom nickname

#### email

> **email**: `null` \| `string`

the user's email

#### flags

> **flags**: `number`

the flags on a user's account:
https://discord.com/developers/docs/resources/user#user-object-user-flags

#### global\_name

> **global\_name**: `null` \| `string`

the user's display name, if it is set

#### id

> **id**: `string`

the user's id (i.e. the numerical snowflake)

#### image\_url

> **image\_url**: `string`

undocumented field; the CDN URL of their profile picture

#### locale

> **locale**: `string`

the user's chosen language option:
https://discord.com/developers/docs/reference#locales

#### mfa\_enabled

> **mfa\_enabled**: `boolean`

whether the user has two factor enabled on their account

#### premium\_type

> **premium\_type**: `number`

the type of Nitro subscription on a user's account:
https://discord.com/developers/docs/resources/user#user-object-premium-types

#### public\_flags

> **public\_flags**: `number`

the public flags on a user's account:
https://discord.com/developers/docs/resources/user#user-object-user-flags

#### username

> **username**: `string`

the user's username, not unique across the platform

#### verified

> **verified**: `boolean`

whether the email on this account has been verified

#### bot?

> **bot**?: `boolean`

whether the user belongs to an OAuth2 application

#### system?

> **system**?: `boolean`

whether the user is an Official Discord System user (part of the urgent
message system)
