import { requireOnboardingSession } from '@/lib/auth/session'
import { fail,ok,requestId } from '@/lib/api/response'
import { slugAvailable } from '@/lib/services/onboarding/onboarding-service'
export const runtime='nodejs'
export async function GET(request:Request){const id=requestId(request.headers);try{await requireOnboardingSession();return ok(await slugAvailable(new URL(request.url).searchParams.get('slug')??''),id)}catch(error){return fail(error,id)}}
