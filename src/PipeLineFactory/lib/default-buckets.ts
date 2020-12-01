import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as ssm from "@aws-cdk/aws-ssm";
import * as kms from "@aws-cdk/aws-kms";

export default class DefaultBuckets extends cdk.Construct {
  transientArtifactsBucket: s3.Bucket;
  artifactsBucket: s3.Bucket;
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);
   
    const stack = cdk.Stack.of(this);

    const bucketEncryptionKey = new kms.Key(this , "BucketEncryption" , {
      removalPolicy : cdk.RemovalPolicy.RETAIN
    })
    this.transientArtifactsBucket = new s3.Bucket(this, "transientBucket", {
      bucketName: `${stack.stackName.toLowerCase()}-${stack.account}-${
        stack.region
      }-transient`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      encryptionKey : bucketEncryptionKey,
      encryption : s3.BucketEncryption.KMS
    });

    new ssm.StringParameter(this, "transientArtifactsBucketSsm", {
      parameterName: `/${stack.stackName}/transientArtifactsBucket`,
      stringValue: this.transientArtifactsBucket.bucketName,
    });

    this.artifactsBucket = new s3.Bucket(this, "artifactsBucket", {
      bucketName: `${stack.stackName.toLowerCase()}-${stack.account}-${
        stack.region
      }-artifacts`,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
      encryptionKey : bucketEncryptionKey,
      encryption : s3.BucketEncryption.KMS
    });

    new ssm.StringParameter(this, "artifactsBucketSsm", {
      parameterName: `/${stack.stackName}/artifactsBucket`,
      stringValue: this.artifactsBucket.bucketName,
    });
  }
}