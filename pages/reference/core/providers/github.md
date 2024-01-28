# providers/github

<div style={{backgroundColor: "#24292f", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>GitHub</b> integration.</span>
<a href="https://github.com">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/github.svg" height="48" width="48"/>
</a>
</div>

## default()

```ts
function default(config): OAuthConfig<GitHubProfile>
```

Add GitHub login to your page and make requests to [GitHub APIs](https://docs.github.com/en/rest).

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/github
```

#### Configuration
```ts
import { Auth } from "@auth/core"
import GitHub from "@auth/core/providers/github"

const request = new Request(origin)
const response = await Auth(request, {
  providers: [GitHub({ clientId: GITHUB_CLIENT_ID, clientSecret: GITHUB_CLIENT_SECRET })],
})
```

### Resources

- [GitHub - Creating an OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
- [GitHub - Authorizing OAuth Apps](https://docs.github.com/en/developers/apps/building-oauth-apps/authorizing-oauth-apps)
- [GitHub - Configure your GitHub OAuth Apps](https://github.com/settings/developers)
- [Learn more about OAuth](https://authjs.dev/concepts/oauth)
- [Source code](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/github.ts)

### Notes

By default, Auth.js assumes that the GitHub provider is
based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.

:::tip

The GitHub provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/github.ts).
To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

:::

:::info **Disclaimer**

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

:::

### Parameters

• **config**: `OAuthUserConfig`\<[`GitHubProfile`](github.md#githubprofile)\> & \{
  `enterprise`: \{
     `baseUrl`: `string`;
  };
  }

### Returns

`OAuthConfig`\<[`GitHubProfile`](github.md#githubprofile)\>

***

## GitHubProfile

### See

[Get the authenticated user](https://docs.github.com/en/rest/users/users#get-the-authenticated-user)
