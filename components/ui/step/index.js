import SasStep from '../steps/src/step';
//console.log(SasStep);
SasStep.install = function (Vue) {
  Vue.component(SasStep.name,SasStep);
};

export default SasStep;
