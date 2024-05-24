import { SNSEvent, SNSHandler } from "aws-lambda";
import axios from "axios";
import { Message } from "./message";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

const BACKEND_TEAM = "1243438769059922032";
const FRONTENT_TEAM = "1243439242466824192";
const QA_TEAM = "1243439335563333673";

const BACKEND_REPO = "https://github.com/Monetizely-Inc/core-be.git";
const FRONTEND_REPO = "https://github.com/Monetizely-Inc/core-fe.git";

const formatMessage = (event: Message, logger: string[]): string => {
  const buildId = event.detail["build-id"];
  const status = event.detail["build-status"];
  const projectName = event.detail["project-name"];
  const initiator = event.detail["additional-information"].initiator;
  const rolesToMention = [QA_TEAM];

  let deploymentType = "";

  if (projectName.startsWith("dev-")) {
    deploymentType = "dev";
  }

  if (projectName.startsWith("qa-")) {
    deploymentType = "qa";
  }

  if (event.detail["additional-information"].source.location === BACKEND_REPO) {
    rolesToMention.push(BACKEND_TEAM);
  }
  if (
    event.detail["additional-information"].source.location === FRONTEND_REPO
  ) {
    rolesToMention.push(FRONTENT_TEAM);
  }

  const mentionsString = rolesToMention.map((role) => `<@&${role}>`).join(" ");

  return (
    `**${deploymentType.toUpperCase()} Build Notification**\n\n` +
    `**Build ID**: ${buildId}\n` +
    `**Status**: ${status}\n` +
    `**Project**: ${projectName}\n` +
    `**Initiator**: ${initiator}\n` +
    `**Teams**: ${mentionsString}\n`
  );
};

const sendToDiscord = async (
  message: string,
  logger: string[]
): Promise<void> => {
  try {
    logger.push("Sending message to Discord: " + message);
    logger.push("Discord Webhook URL: " + DISCORD_WEBHOOK_URL);

    await axios.post(DISCORD_WEBHOOK_URL, { content: message });
  } catch (error) {
    logger.push("Failed to send message to Discord: " + JSON.stringify(error));
    console.error(logger);
  }
};

export const lambdaHandler: SNSHandler = async (event: SNSEvent) => {
  const logger = [];

  logger.push("Received event:" + JSON.stringify(event, null, 2));

  const snsMessage = event.Records[0].Sns.Message;
  const buildEvent = JSON.parse(snsMessage) as Message;

  const formattedMessage = formatMessage(buildEvent, logger);
  await sendToDiscord(formattedMessage, logger);

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify("Message sent to Discord"),
  // };
};
