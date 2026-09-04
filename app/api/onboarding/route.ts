import { requireOnboardingSession } from '@/lib/auth/session'
import { fail,limitedJson,ok,requestId } from '@/lib/api/response'
import { assertOrigin } from '@/lib/api/security'
import { createWorkspace,onboardingSchema } from '@/lib/services/onboarding/onboarding-service'
export const runtime='nodejs'
export async function GET(request:Request){const id=requestId(request.headers);try{const identity=await requireOnboardingSession();return ok({state:'ONBOARDING_REQUIRED',email:identity.email},id)}catch(error){return fail(error,id)}}
export async function POST(request:Request){const id=requestId(request.headers);try{assertOrigin(request);const identity=await requireOnboardingSession(),input=onboardingSchema.parse(await limitedJson(request)),result=await createWorkspace(identity.uid,identity.email,input,id),response=ok(result,id,result.created?201:200);response.cookies.set('turfmate_active_tenant',result.tenantId,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:Number(process.env.SESSION_COOKIE_MAX_AGE??432000)});return response}catch(error){return fail(error,id)}}
