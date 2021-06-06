#!/usr/bin/env node
import {App} from '@aws-cdk/core';
import {CdkDockerImageTagStrategyStack} from '../lib/cdk-docker-image-tag-strategy-stack';
import {execSync} from 'child_process';

const getCommitHashLong = () =>
  execSync('git rev-parse HEAD')
    .toString()
    .replace(/\r?\n|\r/g, '');

const app = new App();
new CdkDockerImageTagStrategyStack(app, 'CdkDockerImageTagStrategyStack', {
  imageTag: getCommitHashLong(),
});
