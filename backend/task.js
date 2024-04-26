import { ListTablesCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  UpdateCommand,
  PutCommand,
  ScanCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";


const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

export const fetchTasks = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name" },
    ProjectionExpression: "id, #name, completed",
    TableName: "tasks",
  });

  const resp = await docClient.send(command);
  return resp;
}

export const createTasks = async (name , completed) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "tasks",
    Item: { id: uuid, name: name, completed: completed },
  });

  const resp = await docClient.send(command);
  return resp;
};

export const updateTasks = async (id, name, completed) => {
  
  const command = new UpdateCommand({
    TableName: "tasks",
    Key: {
      id
    },
    ExpressionAttributeNames: { "#name": "name" },
    UpdateExpression: "set #name = :name, completed = :completed",
    ExpressionAttributeValues: {
      ":name": name,
      ":completed": completed
    },
    ReturnValues: "ALL_NEW"
  });

  const resp = await docClient.send(command);
  return resp;
};

export const deleteTasks = async (id) => {
  const command = new DeleteCommand({
    TableName: "tasks",
    Key: {
      id,
    }
  });

  const resp = await docClient.send(command);
  return resp;
};
