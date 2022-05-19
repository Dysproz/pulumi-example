import {
    ComponentResource,
    ComponentResourceOptions,
  } from "@pulumi/pulumi";
import { Cluster, InputTags } from "@pulumi/eks";
import { Vpc } from "@pulumi/awsx/ec2";

export interface CloudResourcesInputs {
  tags?: InputTags
}

export class CloudResources extends ComponentResource {
  EKS: Cluster;
  VPC: Vpc;

  constructor(name: string, args: CloudResourcesInputs, opts?: ComponentResourceOptions) {
    super("example:resources:cloud", name, {}, opts);

    this.VPC = new Vpc(`${name}-vpc`, {
      tags: args.tags
    })

    this.EKS = new Cluster(`${name}-cluster`, {
      tags: args.tags,
      vpcId: this.VPC.id,
      subnetIds: this.VPC.privateSubnetIds
    })

    this.registerOutputs()
  }
}