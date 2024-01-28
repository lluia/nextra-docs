# providers/wikimedia

<div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b> Wikimedia</b> integration.</span>
<a href="https://mediawiki.org/">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/wikimedia.svg" height="48" />
</a>
</div>

## Contents

- [Functions](wikimedia.md#functions)
    - [default](wikimedia.md#default)

## Functions

### default()

> **default**\<`P`\>(`options`): `OAuthConfig`\<`P`\>

Add Wikimedia login to your page.

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/wikimedia
```

#### Configuration
```js
import Auth from "@auth/core"
import Wikimedia from "@auth/core/providers/wikimedia"

const request = new Request(origin)
const response = await Auth(request, {
  providers: [Wikimedia({ clientId: WIKIMEDIA_CLIENT_ID, clientSecret: WIKIMEDIA_CLIENT_SECRET })],
})
```

### Resources

- [Wikimedia OAuth documentation](https://www.mediawiki.org/wiki/Extension:OAuth)

## Configuration steps
- Go to and accept the Consumer Registration doc: https://meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration
- Request a new OAuth 2.0 consumer to get the `clientId` and `clientSecret`: https://meta.wikimedia.org/wiki/Special:OAuthConsumerRegistration/propose/oauth2
  - Add the following redirect URL into the console: `http://<your-next-app-url>/api/auth/callback/wikimedia`
  - Do not check the box next to This consumer is only for __your username__
  - Unless you explicitly need a larger scope, feel free to select the radio button labelled User identity verification only - no ability to read pages or act on the users behalf.

After registration, you can initially test your application only with your own Wikimedia account.
You may have to wait several days for the application to be approved for it to be used by everyone.

### Notes
This provider also supports all Wikimedia projects:
- Wikipedia
- Wikidata
- Wikibooks
- Wiktionary
- etc..

Please be aware that Wikimedia accounts do not have to have an associated email address. So you may want to add check if the user has an email address before allowing them to login.

By default, Auth.js assumes that the Wikimedia provider is
based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.

:::tip

The Wikimedia provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/wikimedia.ts).
To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

:::

:::info **Disclaimer**

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

:::

#### Type parameters

• **P** extends `WikimediaProfile`

#### Parameters

• **options**: `OAuthUserConfig`\<`P`\>

#### Returns

`OAuthConfig`\<`P`\>
