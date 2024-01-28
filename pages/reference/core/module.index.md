# index

:::warning Experimental
`@auth/core` is under active development.
:::

This is the main entry point to the Auth.js library.

Based on the [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
and [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) Web standard APIs.
Primarily used to implement [framework](https://authjs.dev/concepts/frameworks)-specific packages,
but it can also be used directly.

## Installation

```bash npm2yarn
npm install @auth/core
```

## Usage

```ts
import { Auth } from "@auth/core"

const request = new Request("https://example.com")
const response = await Auth(request, {...})

console.log(response instanceof Response) // true
```

## Resources

- [Getting started](https://authjs.dev/getting-started/introduction)
- [Most common use case guides](https://authjs.dev/guides)

## Auth()

### Auth(request, config)

```ts
function Auth(request, config): Promise<ResponseInternal>
```

Core functionality provided by Auth.js.

Receives a standard [Request]([object Object]) and returns a [Response]([object Object]).

#### Parameters

• **request**: [`Request`]( https://developer.mozilla.org/en-US/docs/Web/API/Request )

• **config**: [`AuthConfig`](module.index.md#authconfig)

#### Returns

`Promise`\<`ResponseInternal`\>

#### Example

```ts
import Auth from "@auth/core"

const request = new Request("https://example.com")
const response = await AuthHandler(request, {
  providers: [...],
  secret: "...",
  trustHost: true,
})
```

#### See

[Documentation](https://authjs.dev)

### Auth(request, config)

```ts
function Auth(request, config): Promise<Response>
```

Core functionality provided by Auth.js.

Receives a standard [Request]([object Object]) and returns a [Response]([object Object]).

#### Parameters

• **request**: [`Request`]( https://developer.mozilla.org/en-US/docs/Web/API/Request )

• **config**: `Omit`\<[`AuthConfig`](module.index.md#authconfig), `"raw"`\>

#### Returns

`Promise`\<[`Response`]( https://developer.mozilla.org/en-US/docs/Web/API/Response )\>

#### Example

```ts
import Auth from "@auth/core"

const request = new Request("https://example.com")
const response = await AuthHandler(request, {
  providers: [...],
  secret: "...",
  trustHost: true,
})
```

#### See

[Documentation](https://authjs.dev)

***

## setEnvDefaults()

```ts
function setEnvDefaults(envObject, config): void
```

Set default env variables on the config object

### Parameters

• **envObject**: `any`

• **config**: [`AuthConfig`](module.index.md#authconfig)

### Returns

`void`

***

## AuthConfig

Configure the [Auth](module.index.md#auth) method.

### Example

```ts
import Auth, { type AuthConfig } from "@auth/core"

export const authConfig: AuthConfig = {...}

const request = new Request("https://example.com")
const response = await AuthHandler(request, authConfig)
```

### See

[Initialization](https://authjs.dev/reference/configuration/auth-options)

### Properties

#### providers

```ts
providers: Provider[];
```

List of authentication providers for signing in
(e.g. Google, Facebook, Twitter, GitHub, Email, etc) in any order.
This can be one of the built-in providers or an object with a custom provider.

##### Default

```ts
[]
```

#### adapter?

```ts
adapter?: Adapter;
```

You can use the adapter option to pass in your database adapter.

#### basePath?

```ts
basePath?: string;
```

The base path of the Auth.js API endpoints.

##### Default

```ts
"/auth"
```

#### callbacks?

```ts
callbacks?: Partial<CallbacksOptions<Profile, Account>>;
```

Callbacks are asynchronous functions you can use to control what happens when an action is performed.
Callbacks are *extremely powerful*, especially in scenarios involving JSON Web Tokens
as they **allow you to implement access controls without a database** and to **integrate with external databases or APIs**.

#### cookies?

```ts
cookies?: Partial<CookiesOptions>;
```

You can override the default cookie names and options for any of the cookies used by Auth.js.
You can specify one or more cookies with custom properties
and missing options will use the default values defined by Auth.js.
If you use this feature, you will likely want to create conditional behavior
to support setting different cookies policies in development and production builds,
as you will be opting out of the built-in dynamic policy.

- ⚠ **This is an advanced option.** Advanced options are passed the same way as basic options,
but **may have complex implications** or side effects.
You should **try to avoid using advanced options** unless you are very comfortable using them.

##### Default

```ts
{}
```

#### debug?

```ts
debug?: boolean;
```

Set debug to true to enable debug messages for authentication and database operations.

- ⚠ If you added a custom [AuthConfig.logger](module.index.md#logger), this setting is ignored.

##### Default

```ts
false
```

#### events?

```ts
events?: Partial<EventCallbacks>;
```

Events are asynchronous functions that do not return a response, they are useful for audit logging.
You can specify a handler for any of these events below - e.g. for debugging or to create an audit log.
The content of the message object varies depending on the flow
(e.g. OAuth or Email authentication flow, JWT or database sessions, etc),
but typically contains a user object and/or contents of the JSON Web Token
and other information relevant to the event.

##### Default

```ts
{}
```

#### experimental?

```ts
experimental?: Record<string, boolean>;
```

Use this option to enable experimental features.
When enabled, it will print a warning message to the console.

##### Note

Experimental features are not guaranteed to be stable and may change or be removed without notice. Please use with caution.

##### Default

```ts
{}
```

#### jwt?

```ts
jwt?: Partial<JWTOptions>;
```

JSON Web Tokens are enabled by default if you have not specified an [AuthConfig.adapter](module.index.md#adapter).
JSON Web Tokens are encrypted (JWE) by default. We recommend you keep this behaviour.

#### logger?

```ts
logger?: Partial<LoggerInstance>;
```

Override any of the logger levels (`undefined` levels will use the built-in logger),
and intercept logs in NextAuth. You can use this option to send NextAuth logs to a third-party logging service.

##### Example

```ts
// /pages/api/auth/[...nextauth].js
import log from "logging-service"
export default NextAuth({
  logger: {
    error(code, ...message) {
      log.error(code, message)
    },
    warn(code, ...message) {
      log.warn(code, message)
    },
    debug(code, ...message) {
      log.debug(code, message)
    }
  }
})
```

- ⚠ When set, the [AuthConfig.debug](module.index.md#debug) option is ignored

##### Default

```ts
console
```

#### pages?

```ts
pages?: Partial<PagesOptions>;
```

Specify URLs to be used if you want to create custom sign in, sign out and error pages.
Pages specified will override the corresponding built-in page.

##### Default

```ts
{}
```

##### Example

```ts
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  }
```

#### redirectProxyUrl?

```ts
redirectProxyUrl?: string;
```

When set, during an OAuth sign-in flow,
the `redirect_uri` of the authorization request
will be set based on this value.

This is useful if your OAuth Provider only supports a single `redirect_uri`
or you want to use OAuth on preview URLs (like Vercel), where you don't know the final deployment URL beforehand.

The url needs to include the full path up to where Auth.js is initialized.

##### Note

This will auto-enable the `state` OAuth2Config.checks on the provider.

##### Example

```
"https://authjs.example.com/api/auth"
```

You can also override this individually for each provider.

##### Example

```ts
GitHub({
  ...
  redirectProxyUrl: "https://github.example.com/api/auth"
})
```

##### Default

`AUTH_REDIRECT_PROXY_URL` environment variable

See also: [Guide: Securing a Preview Deployment](https://authjs.dev/getting-started/deployment#securing-a-preview-deployment)

#### secret?

```ts
secret?: string | string[];
```

A random string used to hash tokens, sign cookies and generate cryptographic keys.

To generate a random string, you can use the Auth.js CLI: `npx auth secret`

##### Note

You can also pass an array of secrets, in which case the first secret that successfully
decrypts the JWT will be used. This is useful for rotating secrets without invalidating existing sessions.
The newer secret should be added to the start of the array, which will be used for all new sessions.

#### session?

```ts
session?: {
  generateSessionToken: () => string;
  maxAge: number;
  strategy: "jwt" | "database";
  updateAge: number;
};
```

Configure your session like if you want to use JWT or a database,
how long until an idle session expires, or to throttle write operations in case you are using a database.

##### Type declaration

###### generateSessionToken?

```ts
generateSessionToken?: () => string;
```

Generate a custom session token for database-based sessions.
By default, a random UUID or string is generated depending on the Node.js version.
However, you can specify your own custom string (such as CUID) to be used.

###### Returns

`string`

###### Default

`randomUUID` or `randomBytes.toHex` depending on the Node.js version

###### maxAge?

```ts
maxAge?: number;
```

Relative time from now in seconds when to expire the session

###### Default

```ts
2592000 // 30 days
```

###### strategy?

```ts
strategy?: "jwt" | "database";
```

Choose how you want to save the user session.
The default is `"jwt"`, an encrypted JWT (JWE) in the session cookie.

If you use an `adapter` however, we default it to `"database"` instead.
You can still force a JWT session by explicitly defining `"jwt"`.

When using `"database"`, the session cookie will only contain a `sessionToken` value,
which is used to look up the session in the database.

[Documentation](https://authjs.dev/reference/core#authconfig#session) | [Adapter](https://authjs.dev/reference/core#authconfig#adapter) | [About JSON Web Tokens](https://authjs.dev/reference/faq#json-web-tokens)

###### updateAge?

```ts
updateAge?: number;
```

How often the session should be updated in seconds.
If set to `0`, session is updated every time.

###### Default

```ts
86400 // 1 day
```

#### theme?

```ts
theme?: Theme;
```

Changes the theme of built-in [AuthConfig.pages](module.index.md#pages).

#### trustHost?

```ts
trustHost?: boolean;
```

Auth.js relies on the incoming request's `host` header to function correctly. For this reason this property needs to be set to `true`.

Make sure that your deployment platform sets the `host` header safely.

:::note
Official Auth.js-based libraries will attempt to set this value automatically for some deployment platforms (eg.: Vercel) that are known to set the `host` header safely.
:::

#### useSecureCookies?

```ts
useSecureCookies?: boolean;
```

When set to `true` then all cookies set by NextAuth.js will only be accessible from HTTPS URLs.
This option defaults to `false` on URLs that start with `http://` (e.g. http://localhost:3000) for developer convenience.
You can manually set this option to `false` to disable this security feature and allow cookies
to be accessible from non-secured URLs (this is not recommended).

- ⚠ **This is an advanced option.** Advanced options are passed the same way as basic options,
but **may have complex implications** or side effects.
You should **try to avoid using advanced options** unless you are very comfortable using them.

The default is `false` HTTP and `true` for HTTPS sites.

***

## raw

```ts
const raw: *typeof* raw;
```

:::danger
This option is intended for framework authors.
:::

Auth.js returns a web standard [Response]([object Object]) by default, but
if you are implementing a framework you might want to get access to the raw internal response
by passing this value to [AuthConfig.raw]([object Object]).

***

## skipCSRFCheck

```ts
const skipCSRFCheck: *typeof* skipCSRFCheck;
```

:::danger
This option is intended for framework authors.
:::

Auth.js comes with built-in [CSRF](https://authjs.dev/concepts/security#csrf) protection, but
if you are implementing a framework that is already protected against CSRF attacks, you can skip this check by
passing this value to [AuthConfig.skipCSRFCheck]([object Object]).
