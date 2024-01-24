# types

This module contains public types and interfaces of the core package.

## Installation

```bash npm2yarn
npm install @auth/core
```

You can then import this submodule from `@auth/core/type`.

## Usage

Even if you don't use TypeScript, IDEs like VSCode will pick up types to provide you with a better developer experience.
While you are typing, you will get suggestions about what certain objects/functions look like,
and sometimes links to documentation, examples, and other valuable resources.

Generally, you will not need to import types from this module.
Mostly when using the `Auth` function and optionally the `AuthConfig` interface,
everything inside there will already be typed.

:::tip
Inside the `Auth` function, you won't need to use a single type from this module.

## Example

```ts title=index.ts
import { Auth } from "@auth/core"

const request = new Request("https://example.com")
const response = await Auth(request, {
  callbacks: {
    jwt(): JWT { // <-- This is unnecessary!
      return { foo: "bar" }
    },
    session(
       { session, token }: { session: Session; token: JWT } // <-- This is unnecessary!
    ) {
      return session
    },
  }
})
```
:::

:::info
We are advocates of TypeScript, as it will help you catch errors at build-time, before your users do. 😉
:::

## Resources

- [TypeScript - The Basics](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [Extending built-in types](https://authjs.dev/getting-started/typescript#module-augmentation)

## Interfaces

### Account

Usually contains information about the provider being used
and also extends `TokenSet`, which is different tokens returned by OAuth Providers.

#### Extends

- `Partial`\<`OpenIDTokenEndpointResponse`\>

#### Properties

##### provider

> **provider**: `string`

Provider's id for this account. Eg.: "google"

##### providerAccountId

> **providerAccountId**: `string`

This value depends on the type of the provider being used to create the account.
- oauth/oidc: The OAuth account's id, returned from the `profile()` callback.
- email: The user's email address.
- credentials: `id` returned from the `authorize()` callback

##### type

> **type**: [`ProviderType`](providers.md#providertype)

Provider's type for this account

##### expires\_at?

> **expires\_at**?: `number`

Calculated value based on [OAuth2TokenEndpointResponse.expires_in]([object Object]).

It is the absolute timestamp (in seconds) when the [OAuth2TokenEndpointResponse.access_token]([object Object]) expires.

This value can be used for implementing token rotation together with [OAuth2TokenEndpointResponse.refresh_token]([object Object]).

###### See

 - https://authjs.dev/guides/basics/refresh-token-rotation#database-strategy
 - https://www.rfc-editor.org/rfc/rfc6749#section-5.1

##### userId?

> **userId**?: `string`

id of the user this account belongs to

###### See

https://authjs.dev/reference/core/adapters#user

***

### CallbacksOptions\<P, A\>

Override the default session creation flow of Auth.js

#### Type parameters

• **P** = [`Profile`](types.md#profile)

• **A** = [`Account`](types.md#account)

#### Properties

##### jwt

> **jwt**: (`params`) => `Awaitable`\<`null` \| [`JWT`](jwt.md#jwt)\>

This callback is called whenever a JSON Web Token is created (i.e. at sign in)
or updated (i.e whenever a session is accessed in the client).
Its content is forwarded to the `session` callback,
where you can control what should be returned to the client.
Anything else will be kept from your front-end.

The JWT is encrypted by default.

[Documentation](https://next-auth.js.org/configuration/callbacks#jwt-callback) |
[`session` callback](https://next-auth.js.org/configuration/callbacks#session-callback)

###### Parameters

• **params**: `Object`

• **params\.account**: `null` \| `A`

Contains information about the provider that was used to sign in.
Also includes [TokenSet](types.md#tokenset)

**Note**
available when `trigger` is `"signIn"` or `"signUp"`

• **params\.token**: [`JWT`](jwt.md#jwt)

When `trigger` is `"signIn"` or `"signUp"`, it will be a subset of [JWT](jwt.md#jwt),
`name`, `email` and `image` will be included.

Otherwise, it will be the full [JWT](jwt.md#jwt) for subsequent calls.

• **params\.user**: [`User`](types.md#user) \| [`AdapterUser`](adapters.md#adapteruser)

Either the result of the OAuthConfig.profile or the [CredentialsConfig.authorize](providers/credentials.md#authorize) callback.

**Note**
available when `trigger` is `"signIn"` or `"signUp"`.

Resources:
- [Credentials Provider](https://authjs.dev/reference/core/providers/credentials)
- [User database model](https://authjs.dev/reference/core/adapters#user)

• **params\.isNewUser?**: `boolean`

**Deprecated**
use `trigger === "signUp"` instead

• **params\.profile?**: `P`

The OAuth profile returned from your provider.
(In case of OIDC it will be the decoded ID Token or /userinfo response)

**Note**
available when `trigger` is `"signIn"`.

• **params\.session?**: `any`

When using [AuthConfig.session](module.index.md#session) `strategy: "jwt"`, this is the data
sent from the client via the [`useSession().update`](https://next-auth.js.org/getting-started/client#update-session) method.

⚠ Note, you should validate this data before using it.

• **params\.trigger?**: `"signIn"` \| `"signUp"` \| `"update"`

Check why was the jwt callback invoked. Possible reasons are:
- user sign-in: First time the callback is invoked, `user`, `profile` and `account` will be present.
- user sign-up: a user is created for the first time in the database (when [AuthConfig.session](module.index.md#session).strategy is set to `"database"`)
- update event: Triggered by the [`useSession().update`](https://next-auth.js.org/getting-started/client#update-session) method.
In case of the latter, `trigger` will be `undefined`.

###### Returns

`Awaitable`\<`null` \| [`JWT`](jwt.md#jwt)\>

##### redirect

> **redirect**: (`params`) => `Awaitable`\<`string`\>

This callback is called anytime the user is redirected to a callback URL (e.g. on signin or signout).
By default only URLs on the same URL as the site are allowed,
you can use this callback to customise that behaviour.

[Documentation](https://authjs.dev/guides/basics/callbacks#redirect-callback)

###### Parameters

• **params**: `Object`

• **params\.baseUrl**: `string`

Default base URL of site (can be used as fallback)

• **params\.url**: `string`

URL provided as callback URL by the client

###### Returns

`Awaitable`\<`string`\>

##### session

> **session**: (`params`) => `Awaitable`\<[`Session`](types.md#session-2) \| `DefaultSession`\>

This callback is called whenever a session is checked.
(Eg.: invoking the `/api/session` endpoint, using `useSession` or `getSession`)

⚠ By default, only a subset (email, name, image)
of the token is returned for increased security.

If you want to make something available you added to the token through the `jwt` callback,
you have to explicitly forward it here to make it available to the client.

###### Parameters

• **params**: `Object`

• **params\.newSession**: `any`

Available when using [AuthConfig.session](module.index.md#session) `strategy: "database"` and an update is triggered for the session.

:::note
You should validate this data before using it.
:::

• **params\.session**: [`Session`](types.md#session-2) \| `Object` & [`AdapterSession`](adapters.md#adaptersession)

• **params\.trigger?**: `"update"`

###### Returns

`Awaitable`\<[`Session`](types.md#session-2) \| `DefaultSession`\>

###### See

[`jwt` callback](https://authjs.dev/reference/core/types#jwt)

##### signIn

> **signIn**: (`params`) => `Awaitable`\<`boolean`\>

Controls whether a user is allowed to sign in or not.
Returning `true` continues the sign-in flow, while
returning `false` throws an `AuthorizedCallbackError` with the message `"AccessDenied"`.

Unhandled errors will throw an `AuthorizedCallbackError` with the message set to the original error.

###### Parameters

• **params**: `Object`

• **params\.account**: `null` \| `A`

• **params\.user**: [`User`](types.md#user) \| [`AdapterUser`](adapters.md#adapteruser)

• **params\.credentials?**: `Record`\<`string`, [`CredentialInput`](providers/credentials.md#credentialinput)\>

If Credentials provider is used, it contains the user credentials

• **params\.email?**: `Object`

If Email provider is used, on the first call, it contains a
`verificationRequest: true` property to indicate it is being triggered in the verification request flow.
When the callback is invoked after a user has clicked on a sign in link,
this property will not be present. You can check for the `verificationRequest` property
to avoid sending emails to addresses or domains on a blocklist or to only explicitly generate them
for email address in an allow list.

• **params\.email\.verificationRequest?**: `boolean`

• **params\.profile?**: `P`

If OAuth provider is used, it contains the full
OAuth profile returned by your provider.

###### Returns

`Awaitable`\<`boolean`\>

###### See

[`AuthorizedCallbackError`](https://authjs.dev/reference/errors#authorizedcallbackerror)

###### Example

```ts
callbacks: {
 async signIn({ profile }) {
  // Only allow sign in for users with email addresses ending with "yourdomain.com"
  return profile?.email?.endsWith("@yourdomain.com")
}
```

***

### CookieOption

[Documentation](https://authjs.dev/reference/core#cookies)

***

### CookiesOptions

[Documentation](https://authjs.dev/reference/core#cookies)

***

### EventCallbacks

The various event callbacks you can register for from next-auth

[Documentation](https://authjs.dev/guides/basics/events)

#### Properties

##### session

> **session**: (`message`) => `Awaitable`\<`void`\>

The message object will contain one of these depending on
if you use JWT or database persisted sessions:
- `token`: The JWT for this session.
- `session`: The session object from your adapter.

###### Parameters

• **message**: `Object`

• **message\.session**: [`Session`](types.md#session-2)

• **message\.token**: [`JWT`](jwt.md#jwt)

###### Returns

`Awaitable`\<`void`\>

##### signIn

> **signIn**: (`message`) => `Awaitable`\<`void`\>

If using a `credentials` type auth, the user is the raw response from your
credential provider.
For other providers, you'll get the User object from your adapter, the account,
and an indicator if the user was new to your Adapter.

###### Parameters

• **message**: `Object`

• **message\.account**: `null` \| [`Account`](types.md#account)

• **message\.user**: [`User`](types.md#user)

• **message\.isNewUser?**: `boolean`

• **message\.profile?**: [`Profile`](types.md#profile)

###### Returns

`Awaitable`\<`void`\>

##### signOut

> **signOut**: (`message`) => `Awaitable`\<`void`\>

The message object will contain one of these depending on
if you use JWT or database persisted sessions:
- `token`: The JWT for this session.
- `session`: The session object from your adapter that is being ended.

###### Parameters

• **message**: `Object` \| `Object`

###### Returns

`Awaitable`\<`void`\>

***

### LoggerInstance

Override any of the methods, and the rest will use the default logger.

[Documentation](https://authjs.dev/reference/core#authconfig#logger)

#### Extends

- `Record`\<`string`, `Function`\>

***

### Profile

The user info returned from your OAuth provider.

#### See

https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims

***

### Session

Returned by `useSession`, `getSession`, returned by the `session` callback
and also the shape received as a prop on the `SessionProvider` React Context

[`useSession`](https://authjs.devreference/nextjs/react/#usesession) |
[`getSession`](https://authjs.dev/reference/utilities#getsession) |
[`SessionProvider`](https://authjs.devreference/nextjs/react#sessionprovider) |
[`session` callback](https://authjs.dev/guides/basics/callbacks#jwt-callback)

#### Extends

- `DefaultSession`

***

### Theme

Change the theme of the built-in pages.

[Documentation](https://authjs.dev/reference/core#authconfig#theme) |
[Pages](https://authjs.dev/guides/basics/pages)

***

### User

The shape of the returned object in the OAuth providers' `profile` callback,
available in the `jwt` and `session` callbacks,
or the second parameter of the `session` callback, when using a database.

[`signIn` callback](https://authjs.dev/guides/basics/callbacks#sign-in-callback) |
[`session` callback](https://authjs.dev/guides/basics/callbacks#jwt-callback) |
[`jwt` callback](https://authjs.dev/guides/basics/callbacks#jwt-callback) |
[`profile` OAuth provider callback](https://authjs.dev/guides/providers/custom-provider)

#### Extended by

- [`AdapterUser`](adapters.md#adapteruser)

## Type Aliases

### AuthAction

> **AuthAction**: `"callback"` \| `"csrf"` \| `"error"` \| `"providers"` \| `"session"` \| `"signin"` \| `"signout"` \| `"verify-request"`

Supported actions by Auth.js. Each action map to a REST API endpoint.
Some actions have a `GET` and `POST` variant, depending on if the action
changes the state of the server.

- **`"callback"`**:
  - **`GET`**: Handles the callback from an [OAuth provider](https://authjs.dev/reference/core/providers/oauth).
  - **`POST`**: Handles the callback from a [Credentials provider](https://authjs.dev/reference/core/providers/credentials).
- **`"csrf"`**: Returns the raw CSRF token, which is saved in a cookie (encrypted).
It is used for CSRF protection, implementing the [double submit cookie](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie) technique.
:::note
Some frameworks have built-in CSRF protection and can therefore disable this action. In this case, the corresponding endpoint will return a 404 response. Read more at [`skipCSRFCheck`](https://authjs.dev/reference/core#skipcsrfcheck).
_⚠ We don't recommend manually disabling CSRF protection, unless you know what you're doing._
:::
- **`"error"`**: Renders the built-in error page.
- **`"providers"`**: Returns a client-safe list of all configured providers.
- **`"session"`**:
  - **`GET**`: Returns the user's session if it exists, otherwise `null`.
  - **`POST**`: Updates the user's session and returns the updated session.
- **`"signin"`**:
  - **`GET`**: Renders the built-in sign-in page.
  - **`POST`**: Initiates the sign-in flow.
- **`"signout"`**:
  - **`GET`**: Renders the built-in sign-out page.
  - **`POST`**: Initiates the sign-out flow. This will invalidate the user's session (deleting the cookie, and if there is a session in the database, it will be deleted as well).
- **`"verify-request"`**: Renders the built-in verification request page.

***

### ErrorPageParam

> **ErrorPageParam**: `"Configuration"` \| `"AccessDenied"` \| `"Verification"`

TODO: Check if all these are used/correct

***

### SignInPageErrorParam

> **SignInPageErrorParam**: `"Signin"` \| `"OAuthSignin"` \| `"OAuthCallbackError"` \| `"OAuthCreateAccount"` \| `"EmailCreateAccount"` \| `"Callback"` \| `"OAuthAccountNotLinked"` \| `"EmailSignin"` \| `"CredentialsSignin"` \| `"SessionRequired"`

TODO: Check if all these are used/correct

***

### TokenSet

> **TokenSet**: `Partial`\<`OAuth2TokenEndpointResponse` \| `OpenIDTokenEndpointResponse`\> & `Object`

Different tokens returned by OAuth Providers.
Some of them are available with different casing,
but they refer to the same value.

#### Type declaration

##### expires\_at?

> **expires\_at**?: `number`

Date of when the `access_token` expires in seconds.
This value is calculated from the `expires_in` value.

###### See

https://www.ietf.org/rfc/rfc6749.html#section-4.2.2
