import CardDialog, { CardDialogProps } from '@client/components/card-dialog/card-dialog';
import Dialog from '@client/components/dialog/dialog';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './help-dialog.html';

export interface HelpDialogProps {
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
export default class HelpDialog extends Vue implements HelpDialogProps {
  @Prop()
  readonly open: boolean;

  get i18n(): { [k: string]: string } {
    return {
      emailCopied: this.$i18nSvc.t('messages.email-copied'),
      helpInfoDialogTitle: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.title'),
      helpInfoDialogDescription: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.description'),
      helpInfoDialogCta: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.cta'),
      helpInfoDialogIconSrc: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.iconSrc'),
    };
  }

  get emailHelloDoe(): string {
    return 'lucas@hellodoe.co';
  }

  get cardDialogInfo(): CardDialogProps {
    return {
      title: this.i18n.helpInfoDialogTitle,
      description: this.i18n.helpInfoDialogDescription,
      cta: this.i18n.helpInfoDialogCta,
      iconSrc: this.i18n.helpInfoDialogIconSrc,
    };
  }

  updateOpen(open: boolean): void {
    this.$emit(EmittedEvents.SYNC_OPEN, open);
  }

  copyEmail(): void {
    const description = this.emailHelloDoe;
    this.$copyText(description);
    this.$toastService.success(this.i18n.emailCopied);
  }
}
