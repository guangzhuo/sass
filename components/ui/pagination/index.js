import SasPagination from './src/pagination';

/* istanbul ignore next */
SasPagination.install = function(Vue) {
  Vue.component(SasPagination.name, SasPagination);
};

export default SasPagination;
