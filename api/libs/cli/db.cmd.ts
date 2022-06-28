import {
  AgencyFactory,
  AgencyImplBusiness,
  AgencyRepositoryBusiness,
  ClientBusinessImpl,
  ClientFactory,
  DoerFactory,
  DoerImplBsn,
  DoerRepositoryBusiness,
  EntryPointFactory,
  EntryPointRepositoryBusiness,
  JobBoardFactory,
  JobBoardImplBusiness,
  JobBoardRepositoryBusiness,
  MessagesFactory,
  MissionBusinessImpl,
  MissionFactory,
  MissionStatus,
  MissionTask,
  QuestionFactory,
  QuestionImplBusiness,
  QuizzFactory,
  QuizzImplBusiness,
  QuizzSheetFactory,
} from '@business';
import { DoerVideoCv } from '@business/domains/doer';
import { QuizzSheetRepository } from '@business/repositories/quizz-sheet.repository';
import {
  ClientRepository,
  InjectAgencyRepository,
  InjectClientRepository,
  InjectDoerRepository,
  InjectEntryPointRepository,
  InjectJobBoardRepository,
  InjectMissionRepository,
  InjectQuestionRepository,
  InjectQuizzRepository,
  InjectQuizzSheetRepository,
  MissionRepository,
  QuestionRepository,
  QuizzRepository,
} from '@database';
import { SchemaNames } from '@database/constants/schema-names';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { addDays, addYears, format } from 'date-fns';
import * as faker from 'faker';
import { includes, random, range } from 'lodash';
import { Collection, Connection } from 'mongoose';
import { Command, Option } from 'nestjs-command';

@Injectable()
export class DbCmd {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectAgencyRepository private readonly agencyRepo: AgencyRepositoryBusiness,
    @InjectClientRepository private readonly cilentRepo: ClientRepository,
    @InjectDoerRepository private readonly doerRepo: DoerRepositoryBusiness,
    @InjectEntryPointRepository private readonly entryPtRepo: EntryPointRepositoryBusiness,
    @InjectJobBoardRepository private readonly jobBoardRepo: JobBoardRepositoryBusiness,
    @InjectMissionRepository private readonly missionRepo: MissionRepository,
    @InjectQuestionRepository private readonly questionRepo: QuestionRepository,
    @InjectQuizzRepository private readonly quizzRepo: QuizzRepository,
    @InjectQuizzSheetRepository private readonly quizzShtRepo: QuizzSheetRepository,
  ) {}

  @Command({
    command: 'db:init',
    describe: 'Clean the database and load fresh data',
    autoExit: true,
  })
  async initDb(
    @Option({
      name: 'pageId',
      describe: 'Id of the Facebook page',
      type: 'string',
      demandOption: true,
    })
    pageId: string,
  ): Promise<void> {
    console.log('🧹 Clean database');
    await this.cleanDatabase();

    console.log('🌱 Load fresh data');
    const agencyName: string = 'Hello Doe';
    await this.createAgency(agencyName, pageId);
    const [agencyHd]: AgencyImplBusiness[] = await this.agencyRepo.findAll();
    await this.initMission(agencyHd.id);
  }

  @Command({
    command: 'db:mission:init',
    describe: 'Clean mission data and load fresh data',
    autoExit: true,
  })
  async initMission(
    @Option({
      name: 'agencyId',
      describe: 'Id of the missions agency',
      type: 'string',
      demandOption: true,
    })
    agencyId: string,
  ): Promise<void> {
    console.log('Clean mission data');
    const modelNamesToClean: SchemaNames[] = [SchemaNames.CLIENT, SchemaNames.DOER, SchemaNames.MISSION, SchemaNames.QUESTION, SchemaNames.QUIZZ, SchemaNames.QUIZZ_SHEET];
    await Promise.all(this.cleanCollections(modelNamesToClean));

    console.log('Create clients');
    const [google, ubisoft]: ClientBusinessImpl[] = await Promise.all([
      this.cilentRepo.save(
        ClientFactory.create({
          address: '1600 Amphitheatre Parkway, Mountain View, California',
          companyName: 'Google',
          contact: ClientFactory.createClientContact({
            email: 'admin@google.com',
            firstName: 'Larry',
            lastName: 'Page',
            phone: '5833859259',
          }),
          siren: '443061841',
        }),
      ),
      this.cilentRepo.save(
        ClientFactory.create({
          address: '	Montreuil, France',
          companyName: 'Ubisoft',
          contact: ClientFactory.createClientContact({
            email: 'admin@ubisoft.com',
            firstName: 'Yves',
            lastName: 'Guillemot',
            phone: '0612875903',
          }),
          siren: '421613266',
        }),
      ),
    ]);

    console.log('Create missions');
    const missions: MissionBusinessImpl[] = await Promise.all([
      this.missionRepo.save(
        MissionFactory.create({
          agency: agencyId,
          client: google.id,
          category: 'BABY_SITTING',
          code: 'GO-001',
          description:
            "Google was founded in September 1998 by Larry Page and Sergey Brin while they were Ph.D. students at Stanford University in California. Together they own about 14 percent of its shares and control 56 percent of the stockholder voting power through supervoting stock. They incorporated Google as a California privately held company on September 4, 1998, in California. Google was then reincorporated in Delaware on October 22, 2002.[12] An initial public offering (IPO) took place on August 19, 2004, and Google moved to its headquarters in Mountain View, California, nicknamed the Googleplex. In August 2015, Google announced plans to reorganize its various interests as a conglomerate called Alphabet Inc. Google is Alphabet's leading subsidiary and will continue to be the umbrella company for Alphabet's Internet interests. Sundar Pichai was appointed CEO of Google, replacing Larry Page, who became the CEO of Alphabet.",
          address: 'Rue de Ménilmontant',
          district: 11,
          tasks: [MissionTask.BABY_SITTING_CLEAN_UP, MissionTask.BABY_SITTING_HOMEWORK, MissionTask.BABY_SITTING_OUTDOOR_ACTIVITIES],
          requirements: {
            attributes: ['Musclé'],
            skills: ['Harass', 'Agilité du poignet'],
            tools: ['Casquette Google', 'Baskets blanches'],
          },
          status: MissionStatus.BEING_PREPARED,
          nbWorkers: 4,
          amount: 1000,
        }),
      ),
      this.missionRepo.save(
        MissionFactory.create({
          agency: agencyId,
          client: ubisoft.id,
          category: 'TICKETING',
          code: 'UB-001',
          description:
            "The Guillemot family had established themselves as a support business for farmers in the Brittany province in northwest France and nearby regions, including into the United Kingdom. The five sons of the family – Christian, Claude, Gérard, Michel, and Yves – helped with the company's sales, distribution, accounting, and management with their parents before university. All five gained business experience while at university, which they brought back to the family business after graduating. The brothers came up with the idea of diversification to sell other products of use to farmers; Claude began with selling CD audio media. Later, the brothers expanded to computers and additional software that included video games.",
          address: 'Allée des pêchés',
          district: 7,
          tasks: [MissionTask.TICKETING, MissionTask.EVENT_CUSTOMER_RECEPTION],
          requirements: {
            attributes: ['>1m80'],
            skills: ['Bon contact', 'Stabilité du poignet'],
            tools: ['Smartphone', 'Machine à café Senseo'],
          },
          status: MissionStatus.BEING_PREPARED,
          nbWorkers: 1,
          amount: 100,
        }),
      ),
    ]);

    console.log('Create quizzes');
    const questions: QuestionImplBusiness[] = await Promise.all([
      this.questionRepo.save(
        QuestionFactory.create({
          messages: [
            MessagesFactory.createQuickReplies({
              text: 'Ma ville, mon clan, mon style, mon ...',
              choices: [MessagesFactory.createQuickRepliesChoice({ text: 'Flow', score: 10 }), MessagesFactory.createQuickRepliesChoice({ text: 'Dope', score: 0 })],
            }),
          ],
        }),
      ),
      this.questionRepo.save(
        QuestionFactory.create({
          messages: [
            MessagesFactory.createImage({ url: 'https://pbs.twimg.com/media/BMGq9eoCIAAcrXs.jpg' }),
            MessagesFactory.createQuickReplies({
              text: "C'est quel film ça ?",
              choices: [
                MessagesFactory.createQuickRepliesChoice({ text: 'The Gentleman', score: 0 }),
                MessagesFactory.createQuickRepliesChoice({ text: 'Arizona Junior', score: 0 }),
                MessagesFactory.createQuickRepliesChoice({ text: 'Snatch', score: 10 }),
              ],
            }),
          ],
        }),
      ),
    ]);
    const quizzes: QuizzImplBusiness[] = await Promise.all([
      this.quizzRepo.save(
        QuizzFactory.create({
          mission: missions[0].id,
          questions: [questions[0].id, questions[1].id],
        }),
      ),
      this.quizzRepo.save(
        QuizzFactory.create({
          mission: missions[1].id,
          questions: [questions[0].id, questions[1].id],
        }),
      ),
    ]);

    console.log('Create candidates');
    const CANDIDATE_COUNT: number = 40;
    await this.createCandidates(CANDIDATE_COUNT, quizzes[0].id);
    await this.createCandidates(CANDIDATE_COUNT, quizzes[1].id);
  }

  private async createCandidates(candidateCount: number, quizzId: string): Promise<void> {
    for (let i: number = 0; i < candidateCount; i++) {
      const firstName: string = faker.name.firstName();
      const lastName: string = faker.name.lastName();
      const doer: DoerImplBsn = await this.doerRepo.save(
        DoerFactory.create({
          profile: DoerFactory.createDoerProfile({
            address: faker.address.streetAddress(),
            birthday: this.buildDoerBirthday(),
            city: faker.address.city(),
            country: faker.address.country(),
            email: faker.internet.email(firstName, lastName),
            firstName: firstName,
            lastName: lastName,
            gender: random(0, 1),
            phone: faker.phone.phoneNumber(),
          }),
          workProfile: DoerFactory.createDoerWorkProfile({
            videoCvs: this.buildDoerVideoCv(),
          }),
        }),
      );

      await this.quizzShtRepo.save(
        QuizzSheetFactory.create({
          completedAt: addDays(Date.now(), -random(1, 5)).getTime(),
          doer: doer.id,
          isFavorite: false,
          isUnlocked: false,
          quizz: quizzId,
          score: random(5, 10),
        }),
      );
    }
  }

  private buildDoerBirthday(): string {
    const age: number = random(19, 27);

    return format(addYears(Date.now(), -age), 'yyyy-MM-dd');
  }

  private buildDoerVideoCv(): DoerVideoCv[] {
    return range(random(2, 3)).map(() =>
      DoerFactory.createVideoCv({
        imgUrl: faker.image.people(),
        question: faker.lorem.sentence(20, 3),
        videoUrl: this.buildVideoCvVideoUrl(),
      }),
    );
  }

  private buildVideoCvVideoUrl(): string {
    const id: number = random(999);
    const videoCvUrls: string[] = [
      `https://d8aldl4u8goaz.cloudfront.net/confinement.mp4?id=${id}`,
      `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4?id=${id}`,
      `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4?id=${id}`,
      `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4?id=${id}`,
      `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4?id=${id}`,
    ];

    return videoCvUrls[Math.floor(Math.random() * videoCvUrls.length)];
  }

  @Command({
    command: 'db:agency:create',
    describe: 'Create an agency with its job board and entry point from Messenger',
    autoExit: true,
  })
  async createAgency(
    @Option({
      name: 'name',
      describe: 'Name of the agency',
      type: 'string',
      demandOption: true,
    })
    name: string,
    @Option({
      name: 'pageId',
      describe: 'Id of the Facebook page',
      type: 'string',
      demandOption: true,
    })
    pageId: string,
  ): Promise<void> {
    console.log(`Create agency ${name}`);
    const agencyHd: AgencyImplBusiness = await this.agencyRepo.save(
      AgencyFactory.create({
        name,
      }),
    );
    const jobBoardHd: JobBoardImplBusiness = await this.jobBoardRepo.save(
      JobBoardFactory.create({
        name,
        missionSources: [agencyHd.id],
      }),
    );
    await this.entryPtRepo.save(
      EntryPointFactory.createFacebookEntryPoint({
        jobBoard: jobBoardHd.id,
        pageId,
      }),
    );
  }

  private cleanCollections(modelNamesToClean: string[]): Promise<any>[] {
    return this.connection.modelNames().map((modelName: string) => {
      if (includes(modelNamesToClean, modelName)) {
        return (this.connection.model(modelName).deleteMany({}) as unknown) as Promise<any>;
      }

      return Promise.resolve();
    });
  }

  private async cleanDatabase(): Promise<void> {
    const cleaningCollections: Promise<any>[] = Object.keys(this.connection.collections).map((collectionName: string) => {
      const collection: Collection = this.connection.collections[collectionName];

      return collection.deleteMany({});
    });
    await Promise.all(cleaningCollections);
  }
}
