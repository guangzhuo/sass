import SasSteps from './src/steps';

SasSteps.install = function (Vue) {
  Vue.component(SasSteps.name, SasSteps);
};

export default SasSteps;
