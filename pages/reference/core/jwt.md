# jwt

This module contains functions and types
to encode and decode [JWT](https://authjs.dev/concepts/session-strategies#jwt)s
issued and used by Auth.js.

The JWT issued by Auth.js is _encrypted by default_, using the _A256CBC-HS512_ algorithm ([JWE](https://www.rfc-editor.org/rfc/rfc7518.html#section-5.2.5)).
It uses the `AUTH_SECRET` environment variable or the passed `secret` propery to derive a suitable encryption key.

:::info Note
Auth.js JWTs are meant to be used by the same app that issued them.
If you need JWT authentication for your third-party API, you should rely on your Identity Provider instead.
:::

## Installation

```bash npm2yarn
npm install @auth/core
```

You can then import this submodule from `@auth/core/jwt`.

## Usage

:::warning Warning
This module *will* be refactored/changed. We do not recommend relying on it right now.
:::

## Resources

- [What is a JWT session strategy](https://authjs.dev/concepts/session-strategies#jwt)
- [RFC7519 - JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519)

## decode()

> **decode**\<`Payload`\>(`params`): `Promise`\<`Payload` \| `null`\>

Decodes a Auth.js issued JWT.

### Type parameters

• **Payload** = [`JWT`](jwt.md#jwt)

### Parameters

• **params**: `JWTDecodeParams`

### Returns

`Promise`\<`Payload` \| `null`\>

***

## encode()

> **encode**\<`Payload`\>(`params`): `Promise`\<`string`\>

Issues a JWT. By default, the JWT is encrypted using "A256CBC-HS512".

### Type parameters

• **Payload** = [`JWT`](jwt.md#jwt)

### Parameters

• **params**: `JWTEncodeParams`\<`Payload`\>

### Returns

`Promise`\<`string`\>

***

## getToken()

> **getToken**\<`R`\>(`params`): `Promise`\<`R` extends `true` ? `string` : [`JWT`](jwt.md#jwt) \| `null`\>

Takes an Auth.js request (`req`) and returns either the Auth.js issued JWT's payload,
or the raw JWT string. We look for the JWT in the either the cookies, or the `Authorization` header.

### Type parameters

• **R** extends `boolean` = `false`

### Parameters

• **params**: `GetTokenParams`\<`R`\>

### Returns

`Promise`\<`R` extends `true` ? `string` : [`JWT`](jwt.md#jwt) \| `null`\>

***

## JWT

Returned by the `jwt` callback and `getToken`, when using JWT sessions

[`jwt` callback](https://next-auth.js.org/configuration/callbacks#jwt-callback) | [`getToken`](https://next-auth.js.org/tutorials/securing-pages-and-api-routes#using-gettoken)

### Extends

- `Record`\<`string`, `unknown`\>.`DefaultJWT`
