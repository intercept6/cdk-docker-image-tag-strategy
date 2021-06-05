// import {expect as expectCDK, haveResource} from '@aws-cdk/assert';
import {App} from '@aws-cdk/core';
import {CdkDockerImageTagStrategyStack} from '../lib/cdk-docker-image-tag-strategy-stack';

test('SQS Queue Created', () => {
  const app = new App();
  // WHEN
  const stack = new CdkDockerImageTagStrategyStack(app, 'MyTestStack');
  // THEN
  // expectCDK(stack).to(
  //   haveResource('AWS::SQS::Queue', {
  //     VisibilityTimeout: 300,
  //   })
  // );
});
