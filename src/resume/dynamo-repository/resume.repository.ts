import { DynamoDB } from 'aws-sdk';
import { CreateResumeDto } from '../dto/create-resume.dto';
import { ResumeOutputDto } from '../dto/resume-output.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateResumeDto } from '../dto/update-resume.dto';
import { ResumeRepository } from '../repository/resume.repository';
import { Inject } from '@nestjs/common';
import { FindByDto } from '../dto/find-by.dto';

const dynamoDb = new DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});

export class DynamoResumeRepository implements ResumeRepository {
  constructor(@Inject('DYNAMO_TABLE_NAME') private tableName: string) {}

  async save(createResumeDto: CreateResumeDto): Promise<ResumeOutputDto> {
    const id = uuidv4();
    createResumeDto.id = id;

    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: createResumeDto,
    };

    await dynamoDb.put(params).promise();
    return createResumeDto as ResumeOutputDto;
  }

  async findAll(): Promise<ResumeOutputDto[]> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    const result = await dynamoDb.scan(params).promise();

    return result.Items as ResumeOutputDto[];
  }

  async findOne(id: string): Promise<ResumeOutputDto | null> {
    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    const result = await dynamoDb.get(params).promise();
    return result.Item as ResumeOutputDto | null;
  }

  async update(
    id: string,
    updateResumeDto: UpdateResumeDto,
  ): Promise<ResumeOutputDto> {
    const expressionAttributesNames = {};
    const expressionAttributeValues = {};

    let updateExpression = 'SET';

    Object.keys(updateResumeDto).forEach((key, index) => {
      const attributeName = `#${key}`;
      const attributeValue = `:value${index}`;

      expressionAttributesNames[attributeName] = key;
      expressionAttributeValues[attributeValue] = updateResumeDto[key];

      updateExpression += ` ${attributeName} = ${attributeValue},`;
    });

    updateExpression = updateExpression.slice(0, -1);

    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: this.tableName,
      Key: {
        id,
      },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributesNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW',
    };

    const result = await dynamoDb.update(params).promise();
    console.log(result);
    return result.Attributes as ResumeOutputDto;
  }

  async remove(id: string): Promise<ResumeOutputDto> {
    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName: this.tableName,
      Key: {
        id,
      },
      ReturnValues: 'ALL_OLD',
    };

    const result = await dynamoDb.delete(params).promise();
    return result.Attributes as ResumeOutputDto;
  }

  async findBy(query: FindByDto): Promise<ResumeOutputDto[]> {
    const filterExpressionParts = [];
    const expressionAttributeNames = {};
    const expressionAttributeValues = {};

    const processAttribute = (key: string, value: any) => {
      const attributeName = `#${key}`;
      const attributeValue = `:value${
        Object.keys(expressionAttributeValues).length
      }`;

      expressionAttributeNames[attributeName] = key;
      expressionAttributeValues[attributeValue] = value;

      filterExpressionParts.push(`${attributeName} = ${attributeValue}`);
    };

    const processListAttribute = (key: string, values: any[]) => {
      const attributeName = `#${key}`;
      const attributeValue = `:value${
        Object.keys(expressionAttributeValues).length
      }`;

      expressionAttributeNames[attributeName] = key;
      expressionAttributeValues[attributeValue] = values;

      filterExpressionParts.push(
        `contains(${attributeName}, ${attributeValue})`,
      );
    };

    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        processListAttribute(key, value);
      } else {
        processAttribute(key, value);
      }
    });

    const filterExpression = filterExpressionParts.join(' AND ');

    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
      FilterExpression: filterExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
    };

    const result = await dynamoDb.scan(params).promise();
    return result.Items as ResumeOutputDto[];
  }
}
