import {App, Stack, StackProps} from '@aws-cdk/core';
import {resolve} from 'path';

import {ApplicationLoadBalancedFargateService} from '@aws-cdk/aws-ecs-patterns';
import {ContainerImage} from '@aws-cdk/aws-ecs';

export class CdkDockerImageTagStrategyStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    new ApplicationLoadBalancedFargateService(this, 'service', {
      publicLoadBalancer: true,
      taskImageOptions: {
        image: ContainerImage.fromAsset(resolve('app')),
        containerPort: 3000,
      },
    });
  }
}
