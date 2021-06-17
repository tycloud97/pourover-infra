import { CfnOutput, Construct, Stage, StageProps } from "@aws-cdk/core";
import { PouroverInfraStack } from "./pourover-infra-stack";

/**
 * Deployable unit of service
 */
export class PourOverInfraStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props: StageProps) {
    super(scope, id, props);

    new PouroverInfraStack(this, `PourOverInfraStackStage`);
  }
}
