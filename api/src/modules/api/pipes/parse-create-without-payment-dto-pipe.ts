import { ClientBusinessImpl, ClientFactory, MissionBusinessImpl, MissionFactory, TimeTableFactory } from '@business';
import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

import { CreateWithoutPaymentParams } from '../controllers/missions/params/create-without-payment.params';

export interface ParsedCreateWithoutPaymentDto {
  client: ClientBusinessImpl;
  mission: MissionBusinessImpl;
}

@Injectable()
export class ParseCreateWithoutPaymentDtoPipe
  implements PipeTransform<CreateWithoutPaymentParams, ParsedCreateWithoutPaymentDto> {
  public transform(value: CreateWithoutPaymentParams): ParsedCreateWithoutPaymentDto {
    this.validateValue(value);

    return {
      client: this.toClient(value),
      mission: this.toMission(value),
    };
  }

  private validateValue(value: CreateWithoutPaymentParams): void {
    const validationErrors = validateSync(plainToClass(CreateWithoutPaymentParams, value));

    if (validationErrors.length > 0) {
      throw new BadRequestException(validationErrors);
    }
  }

  private toClient(params: CreateWithoutPaymentParams): ClientBusinessImpl {
    return ClientFactory.create({
      address: params.companyAddress,
      companyName: params.companyName,
      siren: params.companySiren,
      contact: {
        firstName: params.contactFirstName,
        lastName: params.contactLastName,
        email: params.contactEmail,
        phone: params.contactPhone,
      },
    });
  }

  private toMission(params: CreateWithoutPaymentParams): MissionBusinessImpl {
    return MissionFactory.create({
      agency: params.agency,
      contractType: params.contractType,
      code: params.code,
      category: params.category,
      description: params.description,
      tasks: params.tasks,
      requirements: {
        attributes: params.attributes,
        skills: params.skills,
        tools: params.tools,
      },
      dates: params.dates,
      timeTable: TimeTableFactory.create(params.timeTable),
      address: params.location,
      district: params.district,
      nbWorkers: params.doersCount,
      amount: params.price,
    });
  }
}
