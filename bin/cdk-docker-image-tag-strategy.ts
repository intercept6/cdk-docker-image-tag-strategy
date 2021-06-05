#!/usr/bin/env node
import {App} from '@aws-cdk/core';
import {CdkDockerImageTagStrategyStack} from '../lib/cdk-docker-image-tag-strategy-stack';

const app = new App();
new CdkDockerImageTagStrategyStack(app, 'CdkDockerImageTagStrategyStack');
