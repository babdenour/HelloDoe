import { Component } from 'vue-property-decorator';
import Vue from 'vue';
import WithRender from './app.html?style=./app.scss';

@WithRender
@Component({
  name: 'h-app',
})
export default class App extends Vue {}
