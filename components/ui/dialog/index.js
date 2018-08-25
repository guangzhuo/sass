import SasDialog from './src/dialog';

/* istanbul ignore next */
SasDialog.install = function(Vue) {
  Vue.component(SasDialog.name, SasDialog);
};

export default SasDialog;
