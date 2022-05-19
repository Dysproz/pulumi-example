# pulumi-example

This is an example code of infrastructure deplyoed with pulumi.

## Infrastructure

Project contains two component resources - cloudResources and k8sResources.

### cloudResources
This component creates VPC and then EKS cluster thats created withing previously created VPC.

### k8sResources
This component takes a provider that points to previoudly created EKS cluster and then deploy there Deployment, Service and helm Chart.

## Usage

1. Get aws credentials (manually or with `gimme-aws-creds`).
2. Make sure that all dependencies are installed with `npm install`
3. Run `pulumi up`
4. After finished work run `pulumi destroy` to delete resources
