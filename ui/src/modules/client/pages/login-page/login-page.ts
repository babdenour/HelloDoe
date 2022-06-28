import logoHelloDoe from '@assets/Logo-OneLine-Clear-Black.png';
import { checkInput, Form, getError, isFieldInError, setTouched, validateForm } from '@libs/form';
import { Component, Vue } from 'vue-property-decorator';
import { createForm, LoginPageForm } from './login-page-form';
import WithRender from './login-page.html?style=./login-page.scss';

@WithRender
@Component
export default class LoginPage extends Vue {
  form: Form<LoginPageForm> = createForm();

  loggingIn: boolean = false;

  get logoHelloDoe(): string {
    return logoHelloDoe;
  }

  get i18n(): { [k: string]: string } {
    return {
      email: this.$i18nSvc.t('forms.placeholders.email').toString(),
      login: this.$i18nSvc.t('actions.login').toString(),
      loginFailure: this.$i18nSvc.t('messages.login-failure').toString(),
      missionCode: this.$i18nSvc.t('forms.placeholders.mission-code').toString(),
      pageTitle: this.$i18nSvc.t('pages.client.login.title').toString(),
    };
  }

  get redirectUrl(): string {
    return this.$route.query.redirect;
  }

  get checkInput(): typeof checkInput {
    return checkInput;
  }

  get getError(): typeof getError {
    return getError;
  }

  get isFieldInError(): typeof isFieldInError {
    return isFieldInError;
  }

  get setTouched(): typeof setTouched {
    return setTouched;
  }

  mounted(): void {
    this.form = createForm();
  }

  async logIn(): Promise<void> {
    try {
      validateForm(this.form);
    } catch (ex) {
      return;
    }

    try {
      this.loggingIn = true;
      await this.$loginService.loginClient(this.form.values.email.value, this.form.values.missionCode.value);
      this.redirectToLoggedInUrl();
    } catch (err) {
      this.$toastService.error(this.i18n.loginFailure);
    } finally {
      this.loggingIn = false;
    }
  }

  redirectToLoggedInUrl(): void {
    if (this.redirectUrl) {
      return this.$router.push(this.redirectUrl);
    }

    return this.$navigationSvc.goToClientCandidatePage(this.form.values.missionCode.value);
  }
}
