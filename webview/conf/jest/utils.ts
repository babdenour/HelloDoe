import { Wrapper } from '@vue/test-utils';
import Vue from 'vue';
import { createRenderer } from 'vue-server-renderer';

export type StubsMap = { [cle: string]: any };
export type MocksMap = { [cle: string]: any };

export const createSnapshot: Function = async (wrapper: Wrapper<Vue>): Promise<string> => {
  await wrapper.vm.$nextTick();

  // On préserve l'utilisation de vue-server-renderer pour que nos attributs de snapshots soient en camelCase.
  // Sinon, on peut tout simplement faire return Promise.resolve(wrapper) et se passer de vue-server-renderer.
  const snapshot: string = await createRenderer().renderToString(wrapper.vm);

  return snapshot.replace(/<!---->/g, '');
};

// Function servant à générer un stub avec le nom du composant plutôt qu'un commentaire HTML
// <nom-composant> au lieu de <!--->
// https://github.com/vuejs/vue-test-utils/issues/410#issuecomment-377158238
export function generateStubs(component: any): {} | undefined {
  const children: {} =
    component instanceof Function ? component.extendOptions.components : component.components;
  const reducer: any = (
    accumulator: { [key: string]: any },
    value: string
  ): { [key: string]: any } => {
    const lhs: string = value[0];
    const rhs: string = value.substr(1);
    const name: string = (lhs + rhs.replace(/([A-Z])/g, '-$1')).toLowerCase();
    accumulator[name] = {
      render(createElement: any): any {
        return createElement(name, this.$slots.default);
      },
    };
    return accumulator;
  };
  return children ? Object.keys(children).reduce(reducer, {}) : undefined;
}

// Function permettant de garder les enfants d'un
// composant tout en stubant le parent. (ex: Utile pour les
// popup)
export const wrapChildrenStub: Function = (rootTag: string): any => {
  return {
    render(h: any): any {
      let children: any = this.$options._renderChildren;
      children = children.filter((c: any) => c.tag);
      return h(rootTag, {}, children);
    },
  };
};
