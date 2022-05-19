import { CloudResources } from "./src/lib/cloud"
import { K8sResources } from "./src/lib/k8s"

export const cloudResources = new CloudResources("example-cloud-resources", {
    tags: {
        environment: "dev",
        owner: "dysproz"
    }
})

export const k8sResources = new K8sResources("example-k8s-resources", {
    labels: {
        "app": "example"
    }
}, {
    dependsOn: cloudResources,
    provider: cloudResources.EKS.provider
})
