require('dotenv').config();
const fs = require('fs');
const request = require('request-promise-native');
const argv = require('minimist')(process.argv.slice(2));

const prepareRequest = translationOpts => {
  const projectId = process.env.PHRASE_PROJECT_ID;
  const accessToken = process.env.PHRASE_ACCESS_TOKEN;
  const options = {
    method: 'POST',
    uri: `https://api.phraseapp.com/api/v2/projects/${projectId}/uploads`,
    headers: {
      authorization: `token ${accessToken}`,
    },
    formData: {
      file: {
        value: fs.createReadStream(`src/translations/enKeys.json`),
        options: {
          filename: 'translation.json',
          contentType: 'application/json',
        },
      },
      locale_id: 'en',
      file_format: 'simple_json',
      ...translationOpts,
    },
  };

  return request(options);
};

const uploadTranslations = async () => {
  const options = {
    update_translations: Boolean(argv.force).toString(),
    branch: argv.branch || '',
  };

  await prepareRequest(options);
};

uploadTranslations().then(
  () => console.log('Success'),
  error => {
    console.log(error);
    process.exit(1);
  },
);
