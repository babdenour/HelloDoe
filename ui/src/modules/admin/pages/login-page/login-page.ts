import { ROUTE_NAMES } from '@/route-names';
import { Button, Card, Form, FormItem, Input, Message } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './login-page.html?style=./login-page.scss';

interface LoginForm {
  username: string;
  password: string;
}

@WithRender
@Component({
  components: {
    [Button.name]: Button,
    [Card.name]: Card,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
  },
})
export default class LoginPage extends Vue {
  form: LoginForm = {
    username: '',
    password: '',
  };
  logingIn: boolean = false;

  readonly rules = [{ required: true, message: 'Le champ est requis' }];

  async logIn() {
    const isFormValid = await this.validateForm();
    if (!isFormValid) {
      return;
    }

    this.logingIn = true;
    try {
      await this.$loginService.login(this.form.username, this.form.password);
      Message.success({
        message: `Vous êtes authentifié(e), bienvenue chez vous`,
        duration: 7500,
      });
      this.$router.push({ name: ROUTE_NAMES.ADMIN_DASHBOARD });
    } catch (err) {
      Message.error({
        message: `Nous n'avons pas pu vous authentifier, veuillez vérifier les informations`,
        duration: 7500,
      });
    }
    this.logingIn = false;
  }

  validateForm(): Promise<boolean> {
    return new Promise((resolve) => {
      (this.$refs.loginForm as any).validate((valid: boolean) => {
        resolve(valid);
      });
    });
  }
}
