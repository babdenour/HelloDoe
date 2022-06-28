import { Doer, DoerProfile, DoerVideoCv, DoerVideoCvType, DoerWorkProfile } from '../domains/doer';
import { DoerImpl } from '../domains/doer.impl';

export class DoerFactory {
  static create(args?: Partial<Doer>): DoerImpl {
    const now: number = Date.now();
    const doer: Doer = {
      createdAt: args?.createdAt ?? now,
      updatedAt: args?.updatedAt ?? now,
      id: args?.id ?? null,
      profile: DoerFactory.createDoerProfile(args?.profile),
      workProfile: DoerFactory.createDoerWorkProfile(args?.workProfile),
    };

    return new DoerImpl(doer);
  }

  public static createDoerProfile(args?: Partial<DoerProfile>): DoerProfile {
    return {
      firstName: args?.firstName ?? '',
      lastName: args?.lastName ?? '',
      birthday: args?.birthday ?? '',
      gender: args?.gender ?? 0,
      email: args?.email ?? '',
      phone: args?.phone ?? '',
      department: args?.department ?? 0,
      address: args?.address ?? '',
      city: args?.city ?? '',
      country: args?.country ?? '',
      nationality: args?.nationality ?? '',
      residencePermitOk: args?.residencePermitOk ?? false,
      imgUrl: args?.imgUrl ?? '',
    };
  }

  public static createDoerWorkProfile(args?: Partial<DoerWorkProfile>): DoerWorkProfile {
    return {
      hasCompletedFreelanceProcess: args?.hasCompletedFreelanceProcess ?? false,
      siret: args?.siret ?? '',
      availabilities: args?.availabilities ?? {
        type: 0,
        timeSlots: [],
        deadline: 0,
      },
      location: args?.location ?? [],
      rating: args?.rating ?? 2.5,
      missions: args?.missions ?? [],
      videoCvs: (args?.videoCvs || []).map((videoCv: DoerVideoCv) => this.createVideoCv(videoCv)),
    };
  }

  public static createVideoCv(args?: Partial<DoerVideoCv>): DoerVideoCv {
    return {
      id: args?.id,
      imgUrl: args?.imgUrl ?? '',
      question: args?.question ?? '',
      videoUrl: args?.videoUrl ?? '',
      type: args?.type ?? DoerVideoCvType.INTRODUCTION,
    };
  }
}
