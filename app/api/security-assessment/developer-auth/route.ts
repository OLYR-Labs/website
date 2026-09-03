import crypto from "crypto";
import { NextResponse } from "next/server";
import { rateLimit, rateLimitedResponse } from "@/lib/rate-limit";

const COOKIE="securescan_developer_session";
const TTL=10*60*1000;
function secret(){const s=process.env.SECURESCAN_DEVELOPER_SECRET;if(!s||s.length<32)throw Error("MISSING_SECRET");return s;}
function sign(value:string){return crypto.createHmac("sha256",secret()).update(value).digest("base64url");}
function timingSafe(a:string,b:string){const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&crypto.timingSafeEqual(x,y);}
function session(){const exp=Date.now()+TTL,nonce=crypto.randomBytes(24).toString("base64url"),v=`${exp}.${nonce}`;return `${v}.${sign(v)}`;}
export async function POST(request:Request){try{const limit=rateLimit(request,"securescan-developer-auth",5,15*60*1000);if(!limit.allowed)return rateLimitedResponse(limit.retryAfter);if(!request.headers.get("content-type")?.toLowerCase().startsWith("application/json"))return NextResponse.json({error:"Invalid request format."},{status:415});const body=await request.json();const supplied=typeof body?.password==="string"?body.password:"";const expected=process.env.SECURESCAN_DEVELOPER_PASSWORD||"";if(!expected||!timingSafe(supplied,expected))return NextResponse.json({error:"Developer verification failed."},{status:401,headers:{"Cache-Control":"no-store"}});const response=NextResponse.json({authenticated:true,expiresIn:TTL},{headers:{"Cache-Control":"no-store"}});response.cookies.set(COOKIE,session(),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:Math.floor(TTL/1000)});return response;}catch{ return NextResponse.json({error:"Developer verification unavailable."},{status:503,headers:{"Cache-Control":"no-store"}});}}
export async function DELETE(){const response=NextResponse.json({authenticated:false},{headers:{"Cache-Control":"no-store"}});response.cookies.set(COOKIE,"",{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:0});return response;}
export function isDeveloperSessionValid(request:Request){try{const raw=request.headers.get("cookie")?.split(";").map(x=>x.trim()).find(x=>x.startsWith(`${COOKIE}=`))?.slice(COOKIE.length+1);if(!raw)return false;const parts=raw.split("."),exp=Number(parts[0]);if(parts.length!==3||!Number.isFinite(exp)||exp<Date.now())return false;const value=`${parts[0]}.${parts[1]}`;return timingSafe(parts[2],sign(value));}catch{return false;}}
