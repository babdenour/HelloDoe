export class MissionRequirements {
  readonly attributes: string[];
  readonly skills: string[];
  readonly tools: string[];

  constructor(requirements: MissionRequirements) {
    this.attributes = requirements.attributes;
    this.skills = requirements.skills;
    this.tools = requirements.tools;
  }
}
