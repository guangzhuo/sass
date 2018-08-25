import SasSelect from './src/select';

/* istanbul ignore next */
SasSelect.install = function(Vue) {
  Vue.component(SasSelect.name, SasSelect);
};

export default SasSelect;
