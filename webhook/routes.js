const express = require('express');
const axios = require('axios');
const fs = require('fs');

const { Octokit } = require('@octokit/core');
const { createAppAuth, createOAuthUserAuth } = require('@octokit/auth-app');

require('dotenv').config();
const privateKey = fs.readFileSync('./.data/private.pem', { encoding: 'utf8' });

const router = express.Router();
const api = axios.create({
  baseURL: 'https://api.github.com',
});

router.get('/', function (req, res) {
  res.send('Welcome to the Webhooks API');
});

router.post('/github-webhook', async function (req, res) {
  const appOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: process.env.GITHUB_APP,
      privateKey: privateKey,
      clientId: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
      installationId: process.env.GITHUB_INSTALLATION,
    },
  });

  const payload = req.body;
  if (
    payload.action === 'opened' &&
    payload.issue?.title.includes('[element]') &&
    !Object.keys(payload).includes('pull_request')
  ) {
    try {
      await appOctokit.request(
        `PATCH /repos/apptension/openwind/issues/${payload.issue.number}`,
        { labels: ['element', 'todo'] }
      );
    } catch (e) {
      res.status(500);
    }
  }

  if (
    payload.action === 'created' &&
    payload.comment.body.includes('in progress') &&
    !Object.keys(payload).includes('pull_request')
  ) {
    try {
      await appOctokit.request(
        `PATCH /repos/apptension/openwind/issues/${payload.issue.number}`,
        {
          labels: ['element', 'in progress'],
          assignees: [...payload.issue.assignees, payload.sender.login],
        }
      );
    } catch (e) {
      res.status(500);
    }
  }
  console.log(payload);
  if (
    (payload.action === 'created' || payload.action === 'submitted') &&
    Object.keys(payload.issue).includes('pull_request')
  ) {
    if (payload.comment.body.toLowerCase().includes('resolves')) {
      const issueId = payload.comment.body
        .match(/#\d+/)[0]
        .replace(/^\D+/g, '');
      try {
        console.log('INSIDE');
        await appOctokit.request(
          `PATCH /repos/apptension/openwind/issues/${issueId}`,
          {
            labels: ['element', 'review'],
          }
        );
      } catch (e) {
        res.status(500);
      }
    }
    if (payload.comment.body.toLowerCase().includes('approved')) {
      const issueId = payload.comment.body
        .match(/#\d+/)[0]
        .replace(/^\D+/g, '');
      try {
        await appOctokit.request(
          `PATCH /repos/apptension/openwind/issues/${issueId}`,
          {
            labels: ['element', 'done'],
          }
        );
      } catch (e) {
        res.status(500);
      }
    }
  }

  if (
    payload.action === 'opened' &&
    Object.keys(payload).includes('pull_request')
  ) {
    if (payload.pull_request.body.toLowerCase().includes('resolves')) {
      const issueId = payload.pull_request.body
        .match(/#\d+/)[0]
        .replace(/^\D+/g, '');
      try {
        console.log('INSIDE');
        await appOctokit.request(
          `PATCH /repos/apptension/openwind/issues/${issueId}`,
          {
            labels: ['element', 'review'],
          }
        );
      } catch (e) {
        res.status(500);
      }
    }
  }
  res.status(201).send({
    message: 'Webhook Event successfully logged',
  });
});

module.exports = router;
