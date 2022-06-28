import CardDialog, { CardDialogProps } from '@client/components/card-dialog/card-dialog';
import Dialog from '@client/components/dialog/dialog';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './boost-my-ad-dialog.html';

export interface BoostMyAdDialogProps {
  missionCode: string;
  clientFirstName: string;
  clientEmail: string;
  open: boolean;
}

export enum EmittedEvents {
  SYNC_OPEN = 'update:open',
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.CLIENT_DIALOG]: Dialog,
    [COMPONENTS_NAMES.CLIENT_CARD_DIALOG]: CardDialog,
  },
})
export default class BoostMyAdDialog extends Vue implements BoostMyAdDialogProps {
  @Prop()
  readonly missionCode: string;

  @Prop()
  readonly clientFirstName: string;

  @Prop()
  readonly clientEmail: string;

  @Prop()
  readonly open: boolean;

  get i18n(): { [k: string]: string } {
    return {
      boostInfoDialogTitle: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.title'),
      boostInfoDialogDescription: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.description'),
      boostInfoDialogCta: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.cta'),
      boostInfoDialogIconSrc: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.iconSrc'),
      boostInfoDialogOption1: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.option1'),
      boostInfoDialogOption2: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.option2'),
      boostInfoDialogOption3: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.option3'),
      boostInfoDialogOption4: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.option4'),
      boostInfoDialogOption5: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.option5'),
      boostInfoDialogOption6: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.option6'),
      boostInfoDialogOption7: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.option7'),
    };
  }

  get cardDialogInfo(): CardDialogProps {
    return {
      title: this.i18n.boostInfoDialogTitle,
      description: this.i18n.boostInfoDialogDescription,
      cta: this.i18n.boostInfoDialogCta,
      iconSrc: this.i18n.boostInfoDialogIconSrc,
      options: [
        { text: this.i18n.boostInfoDialogOption1 },
        { text: this.i18n.boostInfoDialogOption2 },
        { text: this.i18n.boostInfoDialogOption3 },
        { text: this.i18n.boostInfoDialogOption4 },
        { text: this.i18n.boostInfoDialogOption5 },
        { text: this.i18n.boostInfoDialogOption6 },
        { text: this.i18n.boostInfoDialogOption7 },
      ],
    };
  }

  updateOpen(open: boolean): void {
    this.$emit(EmittedEvents.SYNC_OPEN, open);
  }

  handleCardDialogCtaClicked(): void {
    this.$navigationSvc.goToBoostTypeform(this.missionCode, this.clientFirstName, this.clientEmail);
  }
}
