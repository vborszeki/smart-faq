# smart-faq
Smart FAQ

App demo: [https://kiwicom.github.io/smart-faq/](https://kiwicom.github.io/smart-faq/)  
Frontend staging: [https://introduce-smart-faq.fe.staging.kiwi.com/](https://introduce-smart-faq.fe.staging.kiwi.com/)

## Instalation

Clone the repo `git clone git@github.com:kiwicom/smart-faq.git`

Install all the dependencies with `yarn`


In order to be able to login one requires an `.env` file at the root of the codebase, with the following contents:
```javascript
GRAPHQL_URI=XXXXXXXX
KIWILOGIN_USER=XXXXXXXX
```
`KIWILOGIN_USER` is only needed for this standalone app to work

Where the value of `GRAPHQL_URI` and `KIWILOGIN_USER` will be provided privately.

Webpack and particularly `dotenv-webpack` package will take care of importing the variables from `.env` to your resulting build app or dev-server.


## Translations

- Check out [react-i18next](https://react.i18next.com/) and [i18next](https://www.i18next.com/) docs for more info.
- [DOCs for Phraseapp](https://phraseapp.com/docs/) - where the translations are stored for translators
- List of all supported languages is defined by file `i18n/languages.js`

### How to use translations in code

- be declarative & use `Trans` component whenever it's possible: 
```
<Trans i18nKey="translationKey">
  Hello <strong>{{name}}</strong>, you have {{count}} unread message.
</Trans>
```

- Children of the `Trans` component will be used as default translation when executing `yarn translations:collect` & during development when the key is missing (collect command haven't been executed yet).
- When executing `yarn translations:collect`, such translation key will be saved like this:

```json
{
  "translationKey": "Hello <1><0>{{name}}</0></1>, you have <3>{{count}}</3> unread message."
}

```

- on places where it's not possible, use function named `__t`:

```
<div title={__t('translationKey')}></div>
```

- such key is saved with the value `__STRING_NOT_TRANSLATED__` - you need to provide translation manually.

### Typical flow with translations

1. *(In future)* Download latest translations from PhraseApp via `yarn trasnlations:download`.
2. Before you push your changes and create PR, collect your translations via `yarn translations:collect`.
3. Translate all `__STRING_NOT_TRANSLATED__` fields.
4. *(In future)* Upload collected translations to be translated by professionals into all Kiwi.com languages via `yarn translations:upload`.
5. *(In future)* When the new version is published to npm, translations are uploaded on CDN.

## Cypress test

Steps to run Cypress tests:
1. Start smart-faq via `yarn start` if you still don't have it running.
2. Start up cypress app with `yarn cypress:open`
3. Run tests with `yarn cypress:run`

*Note*: If you need to change the baseUrl, you can either change it on `cypress.json` or 
set the `CYPRESS_baseUrl` variable before running tests eg. `CYPRESS_baseUrl=http://mybaseUrl:myPort  yarn cypress:run` . [More info](https://docs.cypress.io/guides/guides/environment-variables.html)

## Build process

Test script `test-ci` is run on each push

### Surge Deploy
- after each push a circleci `test-ci-and-surge-deploy` script is run
- it generates a live preview link on surge  ie. `https://smartfaq-branch-name.surge.sh`

### Github Pages
- After every merge into master, standalone version of this project is published using Github Pages 
- Inspired by repository [Circle CI and Github Pages](https://github.com/Villanuevand/deployment-circleci-gh-pages) and further described on [Github](https://github.com/DevProgress/onboarding/wiki/Using-Circle-CI-with-Github-Pages-for-Continuous-Delivery)
- Deployed on [https://kiwicom.github.io/smart-faq/](https://kiwicom.github.io/smart-faq/)

### Release

Done automatically when you add a new release tag on [Github](https://github.com/kiwicom/smart-faq/releases/new)

- automatically updates package.json with correct version
- publish changes onto npm

