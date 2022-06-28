import * as Client from '../models/Client';
import * as Mission from '../models/Mission';
import * as Worker from '../models/Worker';
import * as mongoose from 'mongoose';

export async function connectDatabase() {
  const mongoUri = 'mongodb://localhost/jest';
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export async function disconnectDatabase() {
  await mongoose.disconnect();
}

export async function cleanDatabase() {
  const clearingDocuments = [
    Client.remove({}).exec(),
    Mission.remove({}).exec(),
    Worker.remove({}).exec(),
  ];
  await Promise.all(clearingDocuments);
}
