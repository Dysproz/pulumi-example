import {
    ComponentResource,
    ComponentResourceOptions,
    Input,
} from "@pulumi/pulumi";
import { Deployment } from "@pulumi/kubernetes/apps/v1";
import { Namespace, Service } from "@pulumi/kubernetes/core/v1";
import { Chart } from "@pulumi/kubernetes/helm/v3";

export interface K8sResourcesInputs {
    labels: Input<{
        [key: string]: Input<string>;
    }>
}

export class K8sResources extends ComponentResource {
    Deployment: Deployment;
    Service: Service;
    NginxIngress: Chart;
    TestNamespace: any;

    constructor(name: string, args: K8sResourcesInputs, opts?: ComponentResourceOptions) {
        super("example:resources:k8s", name, {}, opts);

        this.Deployment = new Deployment(`${name}-deployment`, {
            metadata: { labels: args.labels },
            spec: {
                replicas: 2,
                selector: { matchLabels: args.labels },
                template: {
                    metadata: { labels: args.labels },
                    spec: {
                        containers: [{
                            name: "nginx",
                            image: "nginx",
                            ports: [{ name: "http", containerPort: 80 }]
                        }],
                    }
                }
            },
        }, {
            provider: opts?.provider
        });

        this.Service = new Service(`${name}-svc`, {
            metadata: { labels: args.labels },
            spec: {
                type: "LoadBalancer",
                ports: [{ port: 80, targetPort: "http" }],
                selector: args.labels,
            },
        }, {
            provider: opts?.provider
        });

        this.TestNamespace = new Namespace(`${name}-ns`, {
            metadata: {
                name: `test-namespace`
            }
        }, {
            provider: opts?.provider
        })

        this.NginxIngress = new Chart("nginx-ingress", {
            chart: "nginx-ingress",
            version: "1.24.4",
            namespace: "test-namespace",
            fetchOpts:{
                repo: "https://charts.helm.sh/stable",
            },
        }, {
            dependsOn: this.TestNamespace,
            provider: opts?.provider
        });

        this.registerOutputs()
    }
}