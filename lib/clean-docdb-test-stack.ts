import * as cdk from '@aws-cdk/core';
import { Vpc, InstanceType, InstanceClass, InstanceSize, SubnetType } from '@aws-cdk/aws-ec2';
import { DatabaseCluster } from '@aws-cdk/aws-docdb';

export class CleanDocdbTestStack extends cdk.Stack {
  username: "testUser";
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Same VPC as other code
    const vpc = Vpc.fromLookup(this, 'existing-vpc', {
      vpcId: "vpc-044f1f7fb9eb44197"
    });

    const databaseCluster = new DatabaseCluster(this, 'todos-database', {
      masterUser: {
          username: this.username, // NOTE: 'admin' is reserved by DocumentDB
      },
      instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MEDIUM), // T3 instead of M3
      vpcSubnets: {
          subnetType: SubnetType.PRIVATE
      },
      vpc: vpc,
      dbClusterName: "test-database-cluster",
  });
  }
}
