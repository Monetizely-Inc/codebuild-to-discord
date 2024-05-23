import { SNSEvent, SNSHandler } from "aws-lambda";
import axios from "axios";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL!;

const formatMessage = (event: any): string => {
  const buildId = event.id;
  const status = event.status;
  const projectId = event.projectId;
  const buildTriggerId = event.buildTriggerId;
  const logUrl = event.logUrl;

  return (
    `**Cloud Build Notification**\n\n` +
    `**Build ID**: ${buildId}\n` +
    `**Status**: ${status}\n` +
    `**Project ID**: ${projectId}\n` +
    `**Build Trigger ID**: ${buildTriggerId}\n` +
    `**Log URL**: [View Logs](${logUrl})\n`
  );
};

const sendToDiscord = async (message: string): Promise<void> => {
  try {
    await axios.post(DISCORD_WEBHOOK_URL, { content: message });
    console.log("Message sent to Discord successfully.");
  } catch (error) {
    console.error("Failed to send message to Discord:", error);
  }
};

export const lambdaHandler: SNSHandler = async (event: SNSEvent) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  const snsMessage = event.Records[0].Sns.Message;
  const buildEvent = JSON.parse(snsMessage);

  const formattedMessage = formatMessage(buildEvent);
  await sendToDiscord(formattedMessage);

  // return {
  //   statusCode: 200,
  //   body: JSON.stringify("Message sent to Discord"),
  // };
};
