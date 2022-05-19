# pulumi-example

This is an example code of infrastructure deplyoed with pulumi.

## Infrastructure

Project contains two component resources - cloudResources and k8sResources.

### cloudResources
This component creates VPC and then EKS cluster thats created withing previously created VPC.

### k8sResources
This component takes a provider that points to previoudly created EKS cluster and then deploy there Deployment, Service and helm Chart.
