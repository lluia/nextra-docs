# providers/credentials

## default()

```ts
function default<CredentialsInputs>(config): CredentialsConfig
```

The Credentials provider allows you to handle signing in with arbitrary credentials,
such as a username and password, domain, or two factor authentication or hardware device (e.g. YubiKey U2F / FIDO).

It is intended to support use cases where you have an existing system you need to authenticate users against.

It comes with the constraint that users authenticated in this manner are not persisted in the database,
and consequently that the Credentials provider can only be used if JSON Web Tokens are enabled for sessions.

:::caution
The functionality provided for credentials-based authentication is intentionally limited to discourage the use of passwords due to the inherent security risks of the username-password model.

OAuth providers spend significant amounts of money, time, and engineering effort to build:

- abuse detection (bot-protection, rate-limiting)
- password management (password reset, credential stuffing, rotation)
- data security (encryption/salting, strength validation)

and much more for authentication solutions. It is likely that your application would benefit from leveraging these battle-tested solutions rather than try to rebuild them from scratch.

If you'd still like to build password-based authentication for your application despite these risks, Auth.js gives you full control to do so.

:::

See the [callbacks documentation](/reference/core#authconfig#callbacks) for more information on how to interact with the token. For example, you can add additional information to the token by returning an object from the `jwt()` callback:

```js
callbacks: {
  async jwt({ token, user, account, profile, isNewUser }) {
    if (user) {
      token.id = user.id
    }
    return token
  }
}
```

### Type parameters

• **CredentialsInputs** extends `Record`\<`string`, [`CredentialInput`](/reference/core/providers/credentials.md#credentialinput)\> = `Record`\<`string`, [`CredentialInput`](/reference/core/providers/credentials.md#credentialinput)\>

### Parameters

• **config**: `Partial`\<[`CredentialsConfig`](/reference/core/providers/credentials.md#credentialsconfigcredentialsinputs)\<`CredentialsInputs`\>\>

### Returns

[`CredentialsConfig`](/reference/core/providers/credentials.md#credentialsconfigcredentialsinputs)

### Example

```js
import Auth from "@auth/core"
import Credentials from "@auth/core/providers/credentials"

const request = new Request("https://example.com")
const response = await AuthHandler(request, {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: {  label: "Password", type: "password" }
      },
      async authorize({ request }) {
        const response = await fetch(request)
        if(!response.ok) return null
        return await response.json() ?? null
      }
    })
  ],
  secret: "...",
  trustHost: true,
})
```

### See

 - [Username/Password Example](https://authjs.dev/guides/providers/credentials#example---username--password)
 - [Web3/Signin With Ethereum Example](https://authjs.dev/guides/providers/credentials#example---web3--signin-with-ethereum)

***

## CredentialInput

Besides providing type safety inside [CredentialsConfig.authorize](/reference/core/providers/credentials.md#authorize)
it also determines how the credentials input fields will be rendered
on the default sign in page.

### Extends

- `Partial`\<`JSX.IntrinsicElements`\[`"input"`\]\>

***

## CredentialsConfig\<CredentialsInputs\>

The Credentials Provider needs to be configured.

### Extends

- [`CommonProviderOptions`](/reference/core/providers.md#commonprovideroptions)

### Type parameters

• **CredentialsInputs** extends `Record`\<`string`, [`CredentialInput`](/reference/core/providers/credentials.md#credentialinput)\> = `Record`\<`string`, [`CredentialInput`](/reference/core/providers/credentials.md#credentialinput)\>

### Properties

#### authorize

```ts
authorize: (credentials: Partial<Record<keyof CredentialsInputs, unknown>>, request: Request) => Awaitable<null | User>;
```

Gives full control over how you handle the credentials received from the user.

:::warning
There is no validation on the user inputs by default, so make sure you do so
by a popular library like [Zod](https://zod.dev)
:::

##### Parameters

• **credentials**: `Partial`\<`Record`\<keyof `CredentialsInputs`, `unknown`\>\>

The available keys are determined by [CredentialInput](/reference/core/providers/credentials.md#credentialinput).

**Note**
The existence/correctness of a field cannot be guaranteed at compile time,
so you should always validate the input before using it.

You can add basic validation depending on your use case,
or you can use a popular library like [Zod](https://zod.dev) for example.

• **request**: [`Request`]( https://developer.mozilla.org/en-US/docs/Web/API/Request )

The original request is forward for convenience

##### Returns

`Awaitable`\<`null` \| [`User`](/reference/core/types.md#user)\>

##### Example

```ts
//...
async authorize(credentials, request) {
  if(!isValidCredentials(credentials)) return null
  const response = await fetch(request)
  if(!response.ok) return null
  return await response.json() ?? null
}
//...
```

#### id

```ts
id: string;
```

Uniquely identifies the provider in AuthConfig.providers
It's also part of the URL

##### Inherited from

[`CommonProviderOptions`](/reference/core/providers.md#commonprovideroptions).[`id`](/reference/core/providers.md#id)

#### name

```ts
name: string;
```

The provider name used on the default sign-in page's sign-in button.
For example if it's "Google", the corresponding button will say:
"Sign in with Google"

##### Inherited from

[`CommonProviderOptions`](/reference/core/providers.md#commonprovideroptions).[`name`](/reference/core/providers.md#name)
