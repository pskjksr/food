export interface IApiProtect {
    method: ('get' | 'post' | 'put' | 'delete' | 'patch');
    pathname: string;
    premission: ('admin' | 'user');
}

const list_api_protect : IApiProtect[] = [
    {
        method: 'post',
        pathname: '/api/recipes',
        premission: 'admin'
    },
    {
        method: 'get',
        pathname: '/api/protected',
        premission: 'admin'
    },
    {
        method: 'get',
        pathname: '/api/recipes/recipe-like',
        premission: 'admin'
    },
    {
        method: 'get',
        pathname: '/api/recipes/latest',
        premission: 'admin'
    },
   
    
]

export default list_api_protect;