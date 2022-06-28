import { getConnectionToken } from '@nestjs/mongoose';
import { TestingModule } from '@nestjs/testing';
import { Connection, Model } from 'mongoose';

import { RepositoryNames } from '../modules/database';
import { ConverterNames } from '../modules/database/constants/converter-names';
import { SchemaNames } from '../modules/database/constants/schema-names';

export const getConnection = (module: TestingModule): Connection =>
  module.get<string, Connection>(getConnectionToken());

export const cleanDatabase = async (connection: Connection): Promise<void> => {
  const cleaningCollections = Object.keys(connection.collections).map((collectionName: string) => {
    const collection = connection.collections[collectionName];
    return collection.deleteMany({});
  });
  await Promise.all(cleaningCollections);
};

export const getModel = (name: 'client' | 'doer' | 'mission', connection: Connection): Model<any, any> => {
  let schemaName: string;
  if (name === 'client') {
    schemaName = SchemaNames.CLIENT;
  } else if (name === 'doer') {
    schemaName = SchemaNames.DOER;
  } else if (name === 'mission') {
    schemaName = SchemaNames.MISSION;
  }

  return connection.models[schemaName];
};

export const getRepository = <T>(name: 'client' | 'doer' | 'mission', moduleRef: TestingModule): T => {
  let repositoryName: string;
  if (name === 'client') {
    repositoryName = RepositoryNames.CLIENT;
  } else if (name === 'doer') {
    repositoryName = RepositoryNames.DOER;
  } else if (name === 'mission') {
    repositoryName = RepositoryNames.MISSION;
  }

  return moduleRef.get<T>(repositoryName);
};

export const getConverter = <T>(name: 'client' | 'doer' | 'mission', moduleRef: TestingModule): T => {
  let converterName: string;
  if (name === 'client') {
    converterName = ConverterNames.CLIENT;
  } else if (name === 'doer') {
    converterName = ConverterNames.DOER;
  } else if (name === 'mission') {
    converterName = ConverterNames.MISSION;
  }

  return moduleRef.get<T>(converterName);
};
