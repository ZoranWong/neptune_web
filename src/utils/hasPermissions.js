import Storage from 'good-storage'
import Config from '../config/app.js'
import _ from 'lodash'
export function hasPermission(slug) {
	let permissions = JSON.parse(Storage.get(Config.storageUserKey));
	let hasPermission = false;
	_.map(permissions, (permission)=>{
		if (permission['slug'] === slug) {
			hasPermission = true;
			return
		} else {
			return false
		}
	});
	return hasPermission;
}
