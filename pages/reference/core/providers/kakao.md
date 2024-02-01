# providers/kakao

<div style={{backgroundColor: "#000", display: "flex", justifyContent: "space-between", color: "#fff", padding: 16}}>
<span>Built-in <b>Kakao</b> integration.</span>
<a href="https://www.kakaocorp.com/page/">
  <img style={{display: "block"}} src="https://authjs.dev/img/providers/kakao.svg" height="48" width="48"/>
</a>
</div>

## default()

```ts
function default<P>(options): OAuthConfig<P>
```

Add Kakao login to your page.

### Setup

#### Callback URL
```
https://example.com/api/auth/callback/kakao
```

#### Configuration
```js
import Auth from "@auth/core"
import Kakao from "@auth/core/providers/kakao"

const request = new Request(origin)
const response = await Auth(request, {
  providers: [Kakao({ clientId: KAKAO_CLIENT_ID, clientSecret: KAKAO_CLIENT_SECRET })],
})
```

### Resources

 - [Kakao OAuth documentation](https://developers.kakao.com/product/kakaoLogin)
 - [Kakao OAuth configuration](https://developers.kakao.com/docs/latest/en/kakaologin/common)

## Configuration
Create a provider and a Kakao application at https://developers.kakao.com/console/app. In the settings of the app under Kakao Login, activate web app, change consent items and configure callback URL.

### Notes

By default, Auth.js assumes that the Kakao provider is
based on the [OAuth 2](https://www.rfc-editor.org/rfc/rfc6749.html) specification.

The "Authorized redirect URIs" used when creating the credentials must include your full domain and end in the callback path. For example;

![스크린샷 2023-11-28 오후 9 27 41](https://github.com/nextauthjs/next-auth/assets/66895208/7d4c2df6-45a6-4937-bb10-4b47c987bff4)

- For production: `https://{YOUR_DOMAIN}/api/auth/callback/kakao`
- For development: `http://localhost:3000/api/auth/callback/kakao`

:::tip

The Kakao provider comes with a [default configuration](https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/providers/kakao.ts).
To override the defaults for your use case, check out [customizing a built-in OAuth provider](https://authjs.dev/guides/providers/custom-provider#override-default-options).

:::

:::tip

Kakao's client key is in **Summary(It is written as 요약정보 in Korean.) tab's App Keys Field**  
(My Application > App Settings > Summary)  

![스크린샷 2023-11-28 오후 9 47 17](https://github.com/nextauthjs/next-auth/assets/66895208/a87e5705-26b9-4f83-99d7-6df097a3632c)

Kakao's clientSecret key is in **Security(It is written as 보안 in Korean.) tab's App Keys Field**  
(My Application > Product Settings > Kakao Login > Security)  

![스크린샷 2023-11-28 오후 9 38 25](https://github.com/nextauthjs/next-auth/assets/66895208/6a763921-4f70-40f4-a3e1-9abc78276d45)

:::

:::tip

Kakao dev console has a button at the top right to change from KR to ENG

:::

:::info **Disclaimer**

If you think you found a bug in the default configuration, you can [open an issue](https://authjs.dev/new/provider-issue).

Auth.js strictly adheres to the specification and it cannot take responsibility for any deviation from
the spec by the provider. You can open an issue, but if the problem is non-compliance with the spec,
we might not pursue a resolution. You can ask for more help in [Discussions](https://authjs.dev/new/github-discussions).

:::

### Type parameters

• **P** extends [`KakaoProfile`](/reference/core/providers/kakao.md#kakaoprofile)

### Parameters

• **options**: `OAuthUserConfig`\<`P`\>

### Returns

`OAuthConfig`\<`P`\>

***

## KakaoProfile

https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api#req-user-info
type from : https://gist.github.com/ziponia/cdce1ebd88f979b2a6f3f53416b56a77

### Extends

- `Record`\<`string`, `any`\>
