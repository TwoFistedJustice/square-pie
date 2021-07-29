// https://javascript.info/mixinsV
class SomeClass {
  _apiName = 'some api';
  _obj = {
    propDefined: 'JSON strinfify will ignore props set to undefined',
    propUndefined: undefined
  }
  constructor (someArg) {
    this._prop = someArg;
  }
}

let mixin = {
  // this is the correct mixin syntax for accessing class properties
  mixinMethod : function(){
    console.log('ES5 syntax');
    console.log(this._apiName);
    console.log(JSON.stringify(this._obj));
    console.log(this._prop);
  },
}
Object.assign(SomeClass.prototype, mixin)



export function runMixin (){
  let someClass = new SomeClass('This is a poperty on the constructor');
  someClass.mixinMethod();
}