
import {BASE_URL} from '../constants/api'

// URL composer helper
export function URLWithPath(path) {
	return `${BASE_URL}/${path}`
}