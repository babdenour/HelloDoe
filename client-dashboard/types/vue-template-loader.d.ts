/*
vue-template-loader (@see https://github.com/ktsn/vue-template-loader)

This file tells Typescript to understand import statements which loads css, html or scss files
*/
/* tslint:disable:interface-name no-duplicate-imports */
declare module '*.html' {
  import Vue, { ComponentOptions, FunctionalComponentOptions } from 'vue';
  interface WithRender {
    <V extends Vue, U extends ComponentOptions<V> | FunctionalComponentOptions>(options: U): U;
    <V extends typeof Vue>(component: V): V;
  }
  const withRender: WithRender;
  export default withRender;
}

declare module '*.scss' {
  import Vue, { ComponentOptions, FunctionalComponentOptions } from 'vue';
  interface WithRender {
    <V extends Vue, U extends ComponentOptions<V> | FunctionalComponentOptions>(options: U): U;
    <V extends typeof Vue>(component: V): V;
  }
  const withRender: WithRender;
  export default withRender;
}

declare module '*.css' {
  import Vue, { ComponentOptions, FunctionalComponentOptions } from 'vue';
  interface WithRender {
    <V extends Vue, U extends ComponentOptions<V> | FunctionalComponentOptions>(options: U): U;
    <V extends typeof Vue>(component: V): V;
  }
  const withRender: WithRender;
  export default withRender;
}

// Image formats
declare module '*.jpg';
declare module '*.png';
