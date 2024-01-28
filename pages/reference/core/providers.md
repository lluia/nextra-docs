# providers

## Provider\<P\>

```ts
type Provider<P>: OIDCConfig<P> | OAuth2Config<P> | EmailConfig | CredentialsConfig & InternalProviderOptions | (...args) => OAuth2Config<P> | OIDCConfig<P> | EmailConfig | CredentialsConfig & InternalProviderOptions & InternalProviderOptions;
```

Must be a supported authentication provider config:
- [OAuthConfig]([object Object])
- EmailConfigInternal
- CredentialsConfigInternal

For more information, see the guides:

### See

 - [OAuth/OIDC guide](https://authjs.dev/guides/providers/custom-provider)
 - [Email (Passwordless) guide](https://authjs.dev/guides/providers/email)
 - [Credentials guide](https://authjs.dev/guides/providers/credentials)

### Type parameters

• **P** extends [`Profile`](types.md#profile) = `any`

***

## ProviderType

```ts
type ProviderType: "oidc" | "oauth" | "email" | "credentials";
```

Providers passed to Auth.js must define one of these types.

### See

 - [RFC 6749 - The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749.html#section-2.3)
 - [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication)
 - [Email or Passwordless Authentication](https://authjs.dev/concepts/oauth)
 - [Credentials-based Authentication](https://authjs.dev/concepts/credentials)

***

## CommonProviderOptions

Shared across all [ProviderType](providers.md#providertype)

### Extended by

- [`CredentialsConfig`](providers/credentials.md#credentialsconfig)
- [`OAuth2Config`](providers.md#oauth2config)

### Properties

#### id

```ts
id: string;
```

Uniquely identifies the provider in AuthConfig.providers
It's also part of the URL

#### name

```ts
name: string;
```

The provider name used on the default sign-in page's sign-in button.
For example if it's "Google", the corresponding button will say:
"Sign in with Google"

#### type

```ts
type: ProviderType;
```

See [ProviderType](providers.md#providertype)

***

## OAuth2Config\<Profile\>

TODO: Document

### Extends

- [`CommonProviderOptions`](providers.md#commonprovideroptions).`PartialIssuer`

### Type parameters

• **Profile**

### Properties

#### id

```ts
id: string;
```

Identifies the provider when you want to sign in to
a specific provider.

##### Example

```ts
signIn('github') // "github" is the provider ID
```

##### Overrides

[`providers.CommonProviderOptions.id`](providers.md#id)

#### name

```ts
name: string;
```

The name of the provider. shown on the default sign in page.

##### Overrides

[`providers.CommonProviderOptions.name`](providers.md#name)

#### account?

```ts
account?: AccountCallback;
```

Receives the full [TokenSet](types.md#tokenset) returned by the OAuth provider, and returns a subset.
It is used to create the account associated with a user in the database.

:::note
You need to adjust your database's [Account model](https://authjs.dev/reference/core/adapters#account) to match the returned properties.
Check out the documentation of your [database adapter](https://authjs.dev/reference/core/adapters) for more information.
:::

Defaults to: `access_token`, `id_token`, `refresh_token`, `expires_at`, `scope`, `token_type`, `session_state`

##### Example

```ts
import GitHub from "@auth/core/providers/github"
// ...
GitHub({
  account(account) {
    // https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens#refreshing-a-user-access-token-with-a-refresh-token
    const refresh_token_expires_at =
      Math.floor(Date.now() / 1000) + Number(account.refresh_token_expires_in)
    return {
      access_token: account.access_token,
      expires_at: account.expires_at,
      refresh_token: account.refresh_token,
      refresh_token_expires_at
    }
  }
})
```

##### See

 - [Database Adapter: Account model](https://authjs.dev/reference/core/adapters#account)
 - https://openid.net/specs/openid-connect-core-1_0.html#TokenResponse
 - https://www.ietf.org/rfc/rfc6749.html#section-5.1

#### allowDangerousEmailAccountLinking?

```ts
allowDangerousEmailAccountLinking?: boolean;
```

Normally, when you sign in with an OAuth provider and another account
with the same email address already exists,
the accounts are not linked automatically.

Automatic account linking on sign in is not secure
between arbitrary providers and is disabled by default.
Learn more in our [Security FAQ](https://authjs.dev/reference/faq#security).

However, it may be desirable to allow automatic account linking if you trust that the provider involved has securely verified the email address
associated with the account. Set `allowDangerousEmailAccountLinking: true`
to enable automatic account linking.

#### authorization?

```ts
authorization?: string | AuthorizationEndpointHandler;
```

The login process will be initiated by sending the user to this URL.

[Authorization endpoint](https://datatracker.ietf.org/doc/html/rfc6749#section-3.1)

#### checks?

```ts
checks?: ("none" | "state" | "pkce")[];
```

The CSRF protection performed on the callback endpoint.

##### Default

```ts
["pkce"]
```

##### Note

When `redirectProxyUrl` or [AuthConfig.redirectProxyUrl](module.index.md#redirectproxyurl) is set,
`"state"` will be added to checks automatically.

[RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients (PKCE)](https://www.rfc-editor.org/rfc/rfc7636.html#section-4) |
[RFC 6749 - The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749.html#section-4.1.1) |
[OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html#IDToken) |

#### client?

```ts
client?: Partial<Client>;
```

Pass overrides to the underlying OAuth library.
See [`oauth4webapi` client](https://github.com/panva/oauth4webapi/blob/main/docs/interfaces/Client.md) for details.

#### profile?

```ts
profile?: ProfileCallback<Profile>;
```

Receives the full [Profile](providers.md#oauth2config) returned by the OAuth provider, and returns a subset.
It is used to create the user in the database.

Defaults to: `id`, `email`, `name`, `image`

##### See

[Database Adapter: User model](https://authjs.dev/reference/core/adapters#user)

#### wellKnown?

```ts
wellKnown?: string;
```

OpenID Connect (OIDC) compliant providers can configure
this instead of `authorize`/`token`/`userinfo` options
without further configuration needed in most cases.
You can still use the `authorize`/`token`/`userinfo`
options for advanced control.

[Authorization Server Metadata](https://datatracker.ietf.org/doc/html/rfc8414#section-3)

***

## OIDCConfig\<Profile\>

Extension of the [OAuth2Config](providers.md#oauth2config).

### See

https://openid.net/specs/openid-connect-core-1_0.html

### Extends

- `Omit`\<[`OAuth2Config`](providers.md#oauth2config)\<`Profile`\>, `"type"` \| `"checks"`\>

### Type parameters

• **Profile**

### Properties

#### id

```ts
id: string;
```

Identifies the provider when you want to sign in to
a specific provider.

##### Example

```ts
signIn('github') // "github" is the provider ID
```

##### Inherited from

`Omit.id`

#### name

```ts
name: string;
```

The name of the provider. shown on the default sign in page.

##### Inherited from

`Omit.name`

#### account?

```ts
account?: AccountCallback;
```

Receives the full [TokenSet](types.md#tokenset) returned by the OAuth provider, and returns a subset.
It is used to create the account associated with a user in the database.

:::note
You need to adjust your database's [Account model](https://authjs.dev/reference/core/adapters#account) to match the returned properties.
Check out the documentation of your [database adapter](https://authjs.dev/reference/core/adapters) for more information.
:::

Defaults to: `access_token`, `id_token`, `refresh_token`, `expires_at`, `scope`, `token_type`, `session_state`

##### Example

```ts
import GitHub from "@auth/core/providers/github"
// ...
GitHub({
  account(account) {
    // https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/refreshing-user-access-tokens#refreshing-a-user-access-token-with-a-refresh-token
    const refresh_token_expires_at =
      Math.floor(Date.now() / 1000) + Number(account.refresh_token_expires_in)
    return {
      access_token: account.access_token,
      expires_at: account.expires_at,
      refresh_token: account.refresh_token,
      refresh_token_expires_at
    }
  }
})
```

##### See

 - [Database Adapter: Account model](https://authjs.dev/reference/core/adapters#account)
 - https://openid.net/specs/openid-connect-core-1_0.html#TokenResponse
 - https://www.ietf.org/rfc/rfc6749.html#section-5.1

##### Inherited from

`Omit.account`

#### allowDangerousEmailAccountLinking?

```ts
allowDangerousEmailAccountLinking?: boolean;
```

Normally, when you sign in with an OAuth provider and another account
with the same email address already exists,
the accounts are not linked automatically.

Automatic account linking on sign in is not secure
between arbitrary providers and is disabled by default.
Learn more in our [Security FAQ](https://authjs.dev/reference/faq#security).

However, it may be desirable to allow automatic account linking if you trust that the provider involved has securely verified the email address
associated with the account. Set `allowDangerousEmailAccountLinking: true`
to enable automatic account linking.

##### Inherited from

`Omit.allowDangerousEmailAccountLinking`

#### authorization?

```ts
authorization?: string | AuthorizationEndpointHandler;
```

The login process will be initiated by sending the user to this URL.

[Authorization endpoint](https://datatracker.ietf.org/doc/html/rfc6749#section-3.1)

##### Inherited from

`Omit.authorization`

#### client?

```ts
client?: Partial<Client>;
```

Pass overrides to the underlying OAuth library.
See [`oauth4webapi` client](https://github.com/panva/oauth4webapi/blob/main/docs/interfaces/Client.md) for details.

##### Inherited from

`Omit.client`

#### profile?

```ts
profile?: ProfileCallback<Profile>;
```

Receives the full [Profile](providers.md#oauth2config) returned by the OAuth provider, and returns a subset.
It is used to create the user in the database.

Defaults to: `id`, `email`, `name`, `image`

##### See

[Database Adapter: User model](https://authjs.dev/reference/core/adapters#user)

##### Inherited from

`Omit.profile`

#### wellKnown?

```ts
wellKnown?: string;
```

OpenID Connect (OIDC) compliant providers can configure
this instead of `authorize`/`token`/`userinfo` options
without further configuration needed in most cases.
You can still use the `authorize`/`token`/`userinfo`
options for advanced control.

[Authorization Server Metadata](https://datatracker.ietf.org/doc/html/rfc8414#section-3)

##### Inherited from

`Omit.wellKnown`
