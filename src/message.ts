export interface Message {
  account: string;
  detailType: string;
  region: string;
  source: string;
  time: Date;
  notificationRuleArn: string;
  detail: Detail;
  resources: string[];
  additionalAttributes: AdditionalAttributes;
}

export class BuildStatuses {
  static readonly SUCCESS = "SUCCEEDED";
  static readonly FAILURE = "FAILED";
  static readonly FAULT = "FAULT";
  static readonly IN_PROGRESS = "IN_PROGRESS";
  static readonly STOPPED = "STOPPED";
  static readonly TIMED_OUT = "TIMED_OUT";
}

export interface AdditionalAttributes {}

export interface Detail {
  "build-status": string;
  "project-name": string;
  "build-id": string;
  "additional-information": AdditionalInformation;
  "current-phase": string;
  "current-phase-context": string;
  version: string;
}

export interface AdditionalInformation {
  cache: Cache;
  "timeout-in-minutes": number;
  "build-complete": boolean;
  initiator: string;
  "build-start-time": string;
  source: Source;
  "source-version": string;
  artifact: Artifact;
  environment: Environment;
  "project-file-system-locations": any[];
  logs: Logs;
  "queued-timeout-in-minutes": number;
}

export interface Artifact {
  location: string;
}

export interface Cache {
  type: string;
}

export interface Environment {
  image: string;
  "privileged-mode": boolean;
  "image-pull-credentials-type": string;
  "compute-type": string;
  type: string;
  "environment-variables": any[];
}

export interface Logs {
  "deep-link": string;
}

export interface Source {
  "report-build-status": boolean;
  location: string;
  "git-clone-depth": number;
  type: string;
  "git-submodules-config": GitSubmodulesConfig;
}

export interface GitSubmodulesConfig {
  "fetch-submodules": boolean;
}
