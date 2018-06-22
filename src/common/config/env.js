
let baseUrl = ''
let routerMode = 'hash'


if (process.env.NODE_ENV == 'development') {
    baseUrl = 'https://www.vue-js.com/'

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'https://www.vue-js.com/'
}

export {
	baseUrl,
	routerMode,
}