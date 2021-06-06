import {App, RemovalPolicy, Stack, StackProps} from '@aws-cdk/core';
import {DockerImageAsset} from '@aws-cdk/aws-ecr-assets';
import {Repository, TagMutability} from '@aws-cdk/aws-ecr';
import {ECRDeployment, DockerImageName} from 'cdk-ecr-deployment';
import {resolve} from 'path';

import {ApplicationLoadBalancedFargateService} from '@aws-cdk/aws-ecs-patterns';
import {ContainerImage} from '@aws-cdk/aws-ecs';

export interface CdkDockerImageTagStrategyStackProps extends StackProps {
  imageTag: string;
}

export class CdkDockerImageTagStrategyStack extends Stack {
  constructor(
    scope: App,
    id: string,
    props: CdkDockerImageTagStrategyStackProps
  ) {
    super(scope, id, props);

    const repo = new Repository(this, 'repo', {
      repositoryName: 'app',
      imageTagMutability: TagMutability.IMMUTABLE,
      imageScanOnPush: true,
      // 検証用のコードなのでゴミを残さないためにDESTROY
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const image = new DockerImageAsset(this, 'image', {
      directory: resolve('app'),
    });

    new ECRDeployment(this, 'DeployDockerImage', {
      src: new DockerImageName(image.imageUri),
      dest: new DockerImageName(`${repo.repositoryUri}:${props.imageTag}`),
    });

    new ApplicationLoadBalancedFargateService(this, 'service', {
      publicLoadBalancer: true,
      taskImageOptions: {
        image: ContainerImage.fromEcrRepository(repo, props.imageTag),
        containerPort: 3000,
      },
    });
  }
}
