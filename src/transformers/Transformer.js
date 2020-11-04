export default class Transformer {
	_renderField = {};
	_resource = {};   // 真实返回的字段
	_renderData = {};
	constructor(resource) {
		this._resource = resource;
		this._transformer();
	}
	
	_transformer(){
		this._renderField.forEach((key, value)=> {
			this._renderData[key] = this._resource[value];
			Object.defineProperty(this, key, {
				get:(key) => {
					return this._renderData[key];
				},
				writable : false,
				enumerable : true,
				configurable : true
			});
		})
	}
}