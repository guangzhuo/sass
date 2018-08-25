import SasButton from './src/button';

/* istanbul ignore next */
SasButton.install = function(Vue) {
  Vue.component(SasButton.name, SasButton);
};

export default SasButton;
