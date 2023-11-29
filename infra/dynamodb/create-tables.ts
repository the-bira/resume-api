import { DynamoDB } from 'aws-sdk';

const dynamoDB = new DynamoDB({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
});

async function createTables() {
  try {
    await createUserDataTable();
    await createResumeTable();
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

async function createUserDataTable() {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    TableName: 'UserDataTable',
  };

  await dynamoDB.createTable(params).promise();
  await dynamoDB
    .waitFor('tableExists', { TableName: 'UserDataTable' })
    .promise();

  console.log('UserDataTable created successfully');
}

async function createResumeTable() {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
    ],
    KeySchema: [
      {
        AttributeName: 'id',
        KeyType: 'HASH',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
    TableName: 'ResumeTable',
  };

  await dynamoDB.createTable(params).promise();
  await dynamoDB.waitFor('tableExists', { TableName: 'ResumeTable' }).promise();

  console.log('ResumeTable created successfully');
}

createTables();
