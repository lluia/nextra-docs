**@auth/core** • API

***

# providers/email

## Functions

### html()

> **html**(`params`): `string`

Email HTML body
Insert invisible space into domains from being turned into a hyperlink by email
clients like Outlook and Apple mail, as this is confusing because it seems
like they are supposed to click on it to sign in.

#### Parameters

• **params**: `Object`

• **params\.host**: `string`

• **params\.theme**: [`Theme`](../types.md#theme)

• **params\.url**: `string`

#### Returns

`string`

#### Note

We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!

***

### text()

> **text**(`__namedParameters`): `string`

Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)

#### Parameters

• **\_\_namedParameters**: `Object`

• **\_\_namedParameters\.host**: `string`

• **\_\_namedParameters\.url**: `string`

#### Returns

`string`
