import SasBreadcrumb from './src/breadcrumb';

/* istanbul ignore next */
SasBreadcrumb.install = function(Vue) {
  Vue.component(SasBreadcrumb.name, SasBreadcrumb);
};

export default SasBreadcrumb;
