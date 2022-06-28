import { Component, Vue } from 'vue-property-decorator';
import WithRender from './play-button.html';

@WithRender
@Component
export default class PlayButton extends Vue {}
