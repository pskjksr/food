import { NextResponse } from 'next/server';

import {config as authOptions} from "@/config/auth";
import { getToken } from "next-auth/jwt"; // ต้องกำหนด authOptions
import type { NextRequest } from 'next/server';
import list_api_protect,{type IApiProtect} from '@/config/protected';


export default async function middleware(request: NextRequest) {
    const { origin, pathname } = request.nextUrl;

    const token = await getToken({ req: request})
    

    //check api protect
    const list_protect:IApiProtect[] = list_api_protect;
    
    if(!token){
        for (let i = 0; i < list_protect.length; i++) {
            const element = list_protect[i];
            
            //check method premission
            if(element.pathname == pathname && request.method.toLocaleLowerCase() == element.method.toLocaleLowerCase()){
                return NextResponse.json({success: false, message: 'not login to connect api'}, {status: 400})
            }
        }
    }

    if(token){

        const role = token.role;
        for (let i = 0; i < list_protect.length; i++) {
            const element = list_protect[i];
            
            //check method premission
            if(element.pathname == pathname){
                if(element.method.toLocaleLowerCase() == request.method.toLocaleLowerCase()){
                    if(role.toLocaleLowerCase() == element.premission){
                        return NextResponse.next()
                    }else{
                        return NextResponse.json({success: false, message: 'not permission to access api'}, {status: 400})
                    }
                }
            }
        }
    }
}

export const config = {
    matcher: '/api/:path*',
}