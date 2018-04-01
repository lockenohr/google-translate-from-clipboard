#!/usr/bin/env node

const clipboard = require('clipboardy');
const gt = require('google-translate-api');
const notifier = require('node-notifier');
const path = require('path');


function notifyErr(err) {
  notifier.notify({
    title: 'Error',
    message: err.message || 'Неизвестная ошибка',
    icon: path.join(__dirname, 'media', 'error.png'),
  }, (error) => {
    if (error) console.log(error);
  });
}

let originalText = '';
clipboard.read()
.then((data) => {
  originalText = data;
  return gt(data, { to: 'en' });
})
.then((res) => {
  notifier.notify({
    title: originalText,
    message: res.text,
    icon: path.join(__dirname, 'media', 'success.png'),
  });
})
.catch(err => notifyErr(err));
