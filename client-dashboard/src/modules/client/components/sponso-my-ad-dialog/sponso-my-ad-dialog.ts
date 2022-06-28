import CardDialog, { CardDialogProps } from '@client/components/card-dialog/card-dialog';
import Dialog from '@client/components/dialog/dialog';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './sponso-my-ad-dialog.html';

export interface SponsoMyAdDialogProps {
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
export default class SponsoMyAdDialog extends Vue implements SponsoMyAdDialogProps {
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
      sponsoInfoDialogTitle: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.title'),
      sponsoInfoDialogDescription: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.description'),
      sponsoInfoDialogCta: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.cta'),
      sponsoInfoDialogIconSrc: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.iconSrc'),
      sponsoInfoDialogOption1: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option1'),
      sponsoInfoDialogOption2: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option2'),
      sponsoInfoDialogOption3: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option3'),
      sponsoInfoDialogOption4: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option3'),
      sponsoInfoDialogOption5: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option5'),
      sponsoInfoDialogOption6: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option6'),
    };
  }

  get cardDialogInfo(): CardDialogProps {
    return {
      title: this.i18n.sponsoInfoDialogTitle,
      description: this.i18n.sponsoInfoDialogDescription,
      cta: this.i18n.sponsoInfoDialogCta,
      iconSrc: this.i18n.sponsoInfoDialogIconSrc,
      options: [
        { text: this.i18n.sponsoInfoDialogOption1 },
        { text: this.i18n.sponsoInfoDialogOption2 },
        { text: this.i18n.sponsoInfoDialogOption3 },
        { text: this.i18n.sponsoInfoDialogOption4 },
        { text: this.i18n.sponsoInfoDialogOption5 },
        { text: this.i18n.sponsoInfoDialogOption6 },
      ],
    };
  }

  updateOpen(open: boolean): void {
    this.$emit(EmittedEvents.SYNC_OPEN, open);
  }

  handleCardDialogCtaClicked(): void {
    this.$navigationSvc.goToSponsoTypeform(this.missionCode, this.clientFirstName, this.clientEmail);
  }
}
