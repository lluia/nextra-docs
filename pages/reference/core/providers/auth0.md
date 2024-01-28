# providers/auth0

<div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
<span style={{fontSize: "1.35rem" }}>
 Built-in sign in with <b>Auth0</b> integration.
</span>
<a href="https://auth0.com" style={{backgroundColor: "black", padding: "12px", borderRadius: "100%" }}>
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/auth0.svg" width="24"/>
</a>
</div>

## Contents

- [Interfaces](auth0.md#interfaces)
    - [Auth0Profile](auth0.md#auth0profile)
- [Functions](auth0.md#functions)
    - [default](auth0.md#default)

## Interfaces

### Auth0Profile

The returned user profile from Auth0 when using the profile callback. [Reference](https://auth0.com/docs/manage-users/user-accounts/user-profiles/user-profile-structure).

#### Extends

- `Record`\<`string`, `any`\>

#### Properties

##### app\_metadata

> **app\_metadata**: `object`

Custom fields that store info about a user that influences the user's access, such as support plan, security roles (if not using the Authorization Core feature set), or access control groups. To learn more, read Metadata Overview.

##### blocked

> **blocked**: `boolean`

Indicates whether the user has been blocked. Importing enables subscribers to ensure that users remain blocked when migrating to Auth0.

##### created\_at

> **created\_at**: `Date`

Timestamp indicating when the user profile was first created.

##### email

> **email**: `string`

(unique) The user's email address.

##### email\_verified

> **email\_verified**: `boolean`

Indicates whether the user has verified their email address.

##### family\_name

> **family\_name**: `string`

The user's family name.

##### given\_name

> **given\_name**: `string`

The user's given name.

##### identities

> **identities**: `Object`[]

Contains info retrieved from the identity provider with which the user originally authenticates. Users may also link their profile to multiple identity providers; those identities will then also appear in this array. The contents of an individual identity provider object varies by provider. In some cases, it will also include an API Access Token to be used with the provider.

##### last\_ip

> **last\_ip**: `string`

IP address associated with the user's last login.

##### last\_login

> **last\_login**: `Date`

Timestamp indicating when the user last logged in. If a user is blocked and logs in, the blocked session updates last_login. If you are using this property from inside a Rule using the user< object, its value will be associated with the login that triggered the rule; this is because rules execute after login.

##### last\_password\_reset

> **last\_password\_reset**: `Date`

Timestamp indicating the last time the user's password was reset/changed. At user creation, this field does not exist. This property is only available for Database connections.

##### logins\_count

> **logins\_count**: `number`

Number of times the user has logged in. If a user is blocked and logs in, the blocked session is counted in logins_count.

##### multifactor

> **multifactor**: `string`

List of multi-factor providers with which the user is enrolled.

##### name

> **name**: `string`

The user's full name.

##### nickname

> **nickname**: `string`

The user's nickname.

##### phone\_number

> **phone\_number**: `string`

The user's phone number. Only valid for users with SMS connections.

##### phone\_verified

> **phone\_verified**: `boolean`

Indicates whether the user has been verified their phone number. Only valid for users with SMS connections.

##### picture

> **picture**: `string`

URL pointing to the user's profile picture.

##### sub

> **sub**: `string`

The user's unique identifier.

##### updated\_at

> **updated\_at**: `Date`

Timestamp indicating when the user's profile was last updated/modified. Changes to last_login are considered updates, so most of the time, updated_at will match last_login.

##### user\_id

> **user\_id**: `string`

(unique) The user's identifier. Importing allows user records to be synchronized across multiple systems without using mapping tables.

##### user\_metadata

> **user\_metadata**: `object`

Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences. To learn more, read Metadata Overview.

##### username

> **username**: `string`

(unique) The user's username.

## Functions

### default()

> **default**(`config`): [`OIDCConfig`](../providers.md#oidcconfigprofile)\<[`Auth0Profile`](auth0.md#auth0profile)\>

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/auth0
```

#### Configuration

Import the provider and configure it in your **Auth.js** initialization file:

```ts title="pages/api/auth/[...nextauth].ts"
import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0"

export default NextAuth({
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
    }),
  ],
})
```

### Resources

- [Auth0 docs](https://auth0.com/docs/authenticate)

### Notes

The Auth0 provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/auth0.ts). To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

## Help

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

#### Parameters

• **config**: `OIDCUserConfig`\<[`Auth0Profile`](auth0.md#auth0profile)\>

#### Returns

[`OIDCConfig`](../providers.md#oidcconfigprofile)\<[`Auth0Profile`](auth0.md#auth0profile)\>
