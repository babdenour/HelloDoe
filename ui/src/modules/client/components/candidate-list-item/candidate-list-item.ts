import HeartButton from '@client/components/heart-button/heart-button';
import { CandidateStatus } from '@domains/candidate';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import WithRender from './candidate-list-item.html?style=./candidate-list-item.scss';

export interface CandidateListItemProps {
  isSelected: boolean;
  isSeen: boolean;
}

export enum EmittedEvents {
  SET_CANDIDATE_FAVORITE = 'set-candidate-favorite',
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.HEART_BUTTON]: HeartButton,
  },
})
export default class CandidateListItem extends Vue implements CandidateListItemProps {
  @Prop()
  readonly firstName: string;

  @Prop()
  readonly age: number;

  @Prop()
  readonly score: number;

  @Prop()
  readonly imgUrl: string;

  @Prop()
  readonly status: string;

  @Prop()
  readonly phoneNumber: string;

  @Prop()
  readonly isSelected: boolean;

  @Prop({ default: false })
  readonly isSeen: boolean;

  get isUnlocked(): boolean {
    return this.status === CandidateStatus.UNLOCKED;
  }

  get isFavorite(): boolean {
    return this.status === CandidateStatus.FAVORITE;
  }

  get isPhoneNumber(): boolean {
    return this.phoneNumber != '';
  }

  get listItemCssClass(): string {
    return this.isSelected ? 'candidate-list-item--selected' : this.isSeen ? 'candidate-list-item--seen' : '';
  }

  @Emit(EmittedEvents.SET_CANDIDATE_FAVORITE)
  emitSetCandidateFavorite(): void {}
}
