import express = require('express');
import msal = require('@azure/msal-node');
import open = require('open');
import getToken from './getToken';

export const OAUTH_HOST = 'https://login.microsoftonline.com';

export {
    getToken
}