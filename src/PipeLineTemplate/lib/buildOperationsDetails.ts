import * as cdk from "@aws-cdk/core";

export class BuildOperationsDetails implements cdk.StackProps {
  readonly githubRepositoryName: string;
  
  readonly githubRepositoryOwner: string;
  
  readonly githubRepositoryBranch: string;
  
  readonly projectName: string;
  //TODO: Remove and use repo name instead.
  
  readonly buildSpecFileRelativeLocation?: string;
  
  readonly artifactsBucket: string;
  
  readonly description?: string;
  
  readonly stackName?: string;
  
  readonly tags?: {[key: string]: string; };
  
  readonly buildAsRole: string;
  readonly gitHubTokenSecretName: string;
  readonly env?: cdk.Environment;
  
  readonly artifactsPrefix : string;
}
