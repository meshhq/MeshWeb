
// Base Mesh URL
let _url = ''
if (process.env.URL == 'local') {
	_url = 'http://localhost:3000'
} else {
	_url = 'http://api.meshdata.io/'
}

export const BASE_URL = _url
