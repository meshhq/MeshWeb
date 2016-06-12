
// Base Mesh URL
let _url = ''
if (process.env.ORIGIN == 'local') {
	_url = 'http://localhost:3000'
} else if (process.env.ORIGIN == 'dev') {
	_url = 'https://dev.api.meshdata.io/'
} else {
	_url = 'https://api.meshdata.io/'
}

export const BASE_URL = _url
