
// Base Mesh URL
let _url = ''
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == 'local') {
	_url = 'http://localhost:3000'
} else if (process.env.NODE_ENV == 'dev') {
	_url = 'http://dev.api.meshdata.io/'
} else {
	_url = 'https://api.meshdata.io/'
}

export const BASE_URL = _url
