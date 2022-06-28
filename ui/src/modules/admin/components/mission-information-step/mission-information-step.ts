import MissionInformationForm from '@admin/components/mission-information-form/mission-information-form';
import { Events } from '@constants/events';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './mission-information-step.html?style=./mission-information-step.scss';

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.ADMIN_MISSION_INFORMATION_FORM]: MissionInformationForm,
  },
})
export default class MissionInformationStep extends Vue {
  cguCheked: boolean = false;
  formValues = {
    data: null,
    completed: false,
  };

  get enableNextButton(): boolean {
    return this.cguCheked && this.formValues.completed;
  }

  public onFormCompleted(event) {
    this.formValues = event;
  }

  public previousStep(e: MouseEvent) {
    e.preventDefault();
    const data = this.formValues;
    this.$emit(Events.PREVIOUS, data);
  }

  public nextStep(e: MouseEvent) {
    e.preventDefault();
    if (!this.enableNextButton) {
      return;
    }

    const { data } = this.formValues;
    this.$emit(Events.NEXT, data);
  }
}
