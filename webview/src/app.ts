import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './app.html';

@WithRender
@Component({
  name: 'h-app',
})
export default class App extends Vue {}
