
let dev = process.env.NODE_ENV == 'development' || process.env.REACT_APP_BUILD_LOCAL_SERVER == 'development';

export let config = {
        host:  dev ? 'http://localhost:3006' : 'http://ebwa.in',
}
