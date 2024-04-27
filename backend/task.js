import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

const client = new DynamoDBClient({ region: "ap-southeast-2" });
const docClient = DynamoDBDocumentClient.from(client);

export const fetchTasks = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name" },
    ProjectionExpression: "id, #name, completed",
    TableName: "Tasks",
  });

  const resp = await docClient.send(command);
  return resp;
};

export const createTasks = async ({ name, completed }) => {
  const uuid = crypto.randomUUID();
  console.log(`backend: \n name=${name} \n completed=${completed}`);
  const command = new PutCommand({
    TableName: "Tasks",
    Item: { id: uuid, name, completed },
  });

  const resp = await docClient.send(command);
  return resp;
};

export const updateTasks = async ({ id, name, completed }) => {
  const command = new UpdateCommand({
    TableName: "Tasks",
    Key: {
      id,
    },
    ExpressionAttributeNames: { "#name": "name" },
    UpdateExpression: "set #name = :name, completed = :completed",
    ExpressionAttributeValues: {
      ":name": name,
      ":completed": completed,
    },
    ReturnValues: "ALL_NEW",
  });

  const resp = await docClient.send(command);
  return resp;
};

export const deleteTasks = async (id) => {
  const command = new DeleteCommand({
    TableName: "Tasks",
    Key: {
      id,
    },
  });

  const resp = await docClient.send(command);
  return resp;
};
