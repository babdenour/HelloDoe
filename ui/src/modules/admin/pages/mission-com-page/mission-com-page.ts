import ticket from '@/assets/emoji-edited-background/2x/admission-tickets_1f39f-bg@2x.png';
import { default as logospeech } from '@/assets/emoji-edited-background/2x/speech-balloon_1f4ac-bg@2x.png';
import logoHelloDoeBlack from '@/assets/Logo-Round-Black-Messenger.png';
import logoHelloDoeWhite from '@/assets/Logo-Round-White-Messenger.png';
import { logoList } from '@admin/pages/mission-com-page/logo-list';
import { Item } from '@components/page/components/menu-item/menu-item';
import Page from '@components/page/page';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Button, Card } from 'element-ui';
import html2canvas from 'html2canvas';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './mission-com-page.html?style=./mission-com-page.scss';

interface MissionComPageProps {
  menu: Item[];
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.PAGE]: Page,
    [Button.name]: Button,
    [Card.name]: Card,
  },
})
export default class MissionComPage extends Vue implements MissionComPageProps {
  @Prop({ required: true })
  menu: Item[];

  formData = {
    category: { value: 'Category', show: true },
    id: { value: 'Id', show: true },
    typejob: { value: 'Contrat', show: true },
    date: { value: 'Date', show: true },
    workDays: { value: 'WorkDays', show: true },
    workHours: { value: 'WorkHours', show: true },
    city: { value: 'City', show: true },
    district: { value: 'District', show: true },
    amountbyH: { value: 'AmountbyH', show: true },
    amountLarge: { value: 'AmountLarge', show: true },
    amountLargebywhat: { value: 'AmountLargebywhat', show: true },
    volumeH: { value: 'VolumeH', show: true },
    volumeHbywhat: { value: 'VolumeHbywhat', show: true },
    duree: { value: 'Duree', show: true },
    description: { value: 'Description', show: true },
    task1: { value: 'Task1', show: true },
    task2: { value: 'Task2', show: true },
    task3: { value: 'Task3', show: true },
    task4: { value: 'Task4', show: true },
  };

  logoHelloDoeList = [
    { name: 'black', asset: logoHelloDoeBlack },
    { name: 'white', asset: logoHelloDoeWhite },
  ];
  logoname = {
    text: '🎟️',
    value: ticket,
  };

  gradientcolor: string = 'Color';

  adBackgroundClassList: string[] = ['background-purple', 'background-blue', 'background-green', 'background-orange', 'background-yellow', 'background-pink'];
  adBackgroundGradientClassList: string[] = ['gradient-blue', 'gradient-green', 'gradient-orange', 'gradient-pink'];
  adBackgroundClassIdx: number = 0;
  adBackgroundGradientClassIdx: number = 0;

  get logoslist(): { text: string; value: string }[] {
    return logoList;
  }

  get logoHelloDoe(): string {
    return logoHelloDoeWhite;
  }

  get logospeech(): string {
    return logospeech;
  }

  get adBackgroundClass(): string {
    return this.adBackgroundClassList[this.adBackgroundClassIdx];
  }

  get adBackgroundGradientClass(): string {
    return this.adBackgroundGradientClassList[this.adBackgroundGradientClassIdx];
  }

  changeAdBackgroundColor(): void {
    this.adBackgroundClassIdx = (this.adBackgroundClassIdx + 1) % this.adBackgroundClassList.length;
  }

  changeAdBackgroundGradientColor(): void {
    this.adBackgroundGradientClassIdx = (this.adBackgroundGradientClassIdx + 1) % this.adBackgroundGradientClassList.length;
  }

  screenshot(itemId) {
    html2canvas(document.getElementById(itemId), {
      scale: 3.6,
    }).then((canvas) => {
      let a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = itemId + this.formData.category.value + '.png';
      a.click();
    });
  }

  screenAll() {
    this.screenshot('Weekly');
    this.screenshot('PostInstagram1');
    this.screenshot('PostInstagram2');
    this.screenshot('StoryInstagram');
  }

  getdescriptionToCopy() {
    return `[Nouvelle Mission] ${this.formData.category.value} :
${this.formData.task1.value}
${this.formData.task2.value}
${this.formData.task3.value}
${this.formData.task4.value}
-
ℹ️ Rappel: il te suffit d'envoyer l'ID mission pour la retrouver via notre chatbot @messenger 🤖
-
📅 ${this.formData.typejob.value}
⏰ ${this.formData.volumeH.value} / ${this.formData.volumeHbywhat.value}
📍 ${this.formData.district.value} , ${this.formData.city.value}
💸 ${this.formData.amountLarge.value} / ${this.formData.amountLargebywhat.value}
💬 ID : ${this.formData.id.value}`;
  }

  doCopy() {
    let description = this.getdescriptionToCopy();
    this.$copyText(description);
    alert('Description copied');
  }
}
