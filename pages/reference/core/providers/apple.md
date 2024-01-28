# providers/apple

<div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
<span style={{fontSize: "1.35rem" }}>
 Built-in sign in with <b>Apple</b> integration.
</span>
<a href="https://apple.com" style={{backgroundColor: "black", padding: "12px", borderRadius: "100%" }}>
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/apple.svg" width="24"/>
</a>
</div>

## Contents

- [Interfaces](apple.md#interfaces)
    - [AppleProfile](apple.md#appleprofile)
- [Functions](apple.md#functions)
    - [default](apple.md#default)

## Interfaces

### AppleProfile

The returned user profile from Apple when using the profile callback.

#### Extends

- `Record`\<`string`, `any`\>

#### Properties

##### aud

> **aud**: `string`

The audience registered claim identifies the recipient for which the identity token is intended.
Since the token is meant for your application, the value is the `client_id` from your developer account.

##### email

> **email**: `string`

A String value representing the user's email address.
The email address is either the user's real email address or the proxy address,
depending on their status private email relay service.

##### email\_verified

> **email\_verified**: `true` \| `"true"`

A String or Boolean value that indicates whether the service has verified the email.
The value of this claim is always true, because the servers only return verified email addresses.
The value can either be a String (`"true"`) or a Boolean (`true`).

##### exp

> **exp**: `number`

The expiration time registered identifies the time on or after which the identity token expires,
in terms of number of seconds since Epoch, in UTC.
The value must be greater than the current date/time when verifying the token.

##### iat

> **iat**: `number`

The issued at registered claim indicates the time at which Apple issued the identity token,
in terms of the number of seconds since Epoch, in UTC.

##### is\_private\_email

> **is\_private\_email**: `boolean` \| `"true"` \| `"false"`

A String or Boolean value that indicates whether the email shared by the user is the proxy address.
The value can either be a String (`"true"` or `"false"`) or a Boolean (`true` or `false`).

##### iss

> **iss**: `"https://appleid.apple.com"`

The issuer registered claim identifies the principal that issued the identity token.
Since Apple generates the token, the value is `https://appleid.apple.com`.

##### nonce

> **nonce**: `string`

A String value used to associate a client session and the identity token.
This value mitigates replay attacks and is present only if passed during the authorization request.

##### nonce\_supported

> **nonce\_supported**: `boolean`

A Boolean value that indicates whether the transaction is on a nonce-supported platform.
If you sent a nonce in the authorization request but don't see the nonce claim in the identity token,
check this claim to determine how to proceed.
If this claim returns true, you should treat nonce as mandatory and fail the transaction;
otherwise, you can proceed treating the nonce as options.

##### real\_user\_status

> **real\_user\_status**: `0` \| `2` \| `1`

An Integer value that indicates whether the user appears to be a real person.
Use the value of this claim to mitigate fraud. The possible values are: 0 (or Unsupported), 1 (or Unknown), 2 (or LikelyReal).
For more information, see [`ASUserDetectionStatus`](https://developer.apple.com/documentation/authenticationservices/asuserdetectionstatus).
This claim is present only on iOS 14 and later, macOS 11 and later, watchOS 7 and later, tvOS 14 and later;
the claim isn't present or supported for web-based apps.

##### sub

> **sub**: `string`

The subject registered claim identifies the principal that's the subject of the identity token.
Since this token is meant for your application, the value is the unique identifier for the user.

##### transfer\_sub

> **transfer\_sub**: `string`

A String value representing the transfer identifier used to migrate users to your team.
This claim is present only during the 60-day transfer period after an you transfer an app.
For more information, see [Bringing New Apps and Users into Your Team](https://developer.apple.com/documentation/sign_in_with_apple/bringing_new_apps_and_users_into_your_team).

## Functions

### default()

> **default**\<`P`\>(`options`): `OAuthConfig`\<`P`\>

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/apple
```

#### Configuration

Import the provider and configure it in your **Auth.js** initialization file:

```ts title="pages/api/auth/[...nextauth].ts"
import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple"

export default NextAuth({
  providers: [
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
  ],
})
```

### Resources

- Sign in with Apple [Overview](https://developer.apple.com/sign-in-with-apple/get-started/)
- Sign in with Apple [REST API](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api)
- [How to retrieve](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api/authenticating_users_with_sign_in_with_apple#3383773) the user's information from Apple ID servers
- [Learn more about OAuth](https://authjs.dev/concepts/oauth)

### Notes

The Apple provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/apple.ts). To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

## Help

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

#### Type parameters

• **P** extends [`AppleProfile`](apple.md#appleprofile)

#### Parameters

• **options**: `Omit`\<`OAuthUserConfig`\<`P`\>, `"clientSecret"`\> & `Object`

#### Returns

`OAuthConfig`\<`P`\>
