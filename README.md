<img align="left" style="margin-right:40px; margin-bottom:80px;" width="180" height="80" src="./docs/a-logo-docs.png" alt="ADAAS Logo">

# a-os SDK 

| LTS | Latest | npm               |
|---------------|----------|---------------------------|
| v1.0.0      |   v1.0.1    |     [@adaas/a-os](https://npm.com)    |


<!-- TABLE OF CONTENTS -->
## Table of Contents

- [About the Project](#overview)
- [Quick Start](#quick-start)
- [ENV Variables](#environment-variables)
- [Links](#links)


## Quick Start

#### Step 1: Install SDK

```bash

cd /your/project/location
adf
npm i @adaas/a-os

```

#### Step 2: Provide Credentials 

You can pass credentials through ENV variable or via code:

##### BASH 

```bash
# Mandatory
ADAAS_API_CREDENTIALS_CLIENT_ID=ADAAS--client::769e6cb6597b...YOUR_ID...911f3060c161
ADAAS_API_CREDENTIALS_CLIENT_SECRET=ADAAS--secret::5ca6204b...YOUR_SECRET...e90c00a263f4db

```

##### In APPLICATION 

```javascript
const ADAAS_API_CREDENTIALS_CLIENT_ID = process.env.ADAAS_API_CREDENTIALS_CLIENT_ID!;
const ADAAS_API_CREDENTIALS_CLIENT_SECRET = process.env.ADAAS_API_CREDENTIALS_CLIENT_SECRET!
ADAAS_A_AUTH_Context.setCredentials(
    ADAAS_API_CREDENTIALS_CLIENT_ID,
    ADAAS_API_CREDENTIALS_CLIENT_SECRET

await ADAAS_A_AUTH_Context.authenticate();
```


#### Step 4: Start Using  
By installing this app into your application then you will be able to access the ADAAS API or ADAAS products API via SSO 


```javascript

```



## Environment Variables

| Variable Name | Required | Description               |
|---------------|----------|---------------------------|
| ADAAS_API_CREDENTIALS_CLIENT_ID      |    YES    |      Your ADAAS API Credentials Key. Not mandatory in case when  it's provided through the code     |
| ADAAS_API_CREDENTIALS_CLIENT_SECRET    |    YES    | Your ADAAS Api Credentials Secret Not mandatory in case when  it's provided through the code  |
| ADAAS_A_AUTH_CONFIG_SDK_VALIDATION    |    NO    | Allows to ignore configurations validation |
| ADAAS_A_AUTH_CONFIG_VERBOSE    |    NO    | Allows to turn off extra library logs |
| ADAAS_A_AUTH_CONFIG_IGNORE_ERRORS    |    NO    | Allows to ignore error  |

## Links

- [ADAAS Website](https://adaas.org)
- [Report Issues](https://github.com/ADAAS-org/adaas-adf-auth/issues)
- [Become Future Creator](https://sso.adaas.org)
---
