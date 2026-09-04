import { FirestoreRepository } from '@/lib/repositories/firestore/firestore-repository'
import { getPaymentProvider } from '@/lib/payments/factory'
import { processCashfreeWebhook } from '@/lib/services/payments/payment-service'
import { fail,ok,requestId } from '@/lib/api/response'
import { unsignedWebhookProbe,webhookEventType } from '@/lib/api/webhook-probe'
import { DomainError } from '@/lib/domain/errors'
export const runtime='nodejs'
export async function POST(request:Request){const id=requestId(request.headers);try{const raw=await request.text(),signature=request.headers.get('x-webhook-signature'),timestamp=request.headers.get('x-webhook-timestamp'),eventId=request.headers.get('x-idempotency-header')??undefined;request.headers.get('x-webhook-version');if(unsignedWebhookProbe(raw,signature,timestamp))return ok({received:true,probe:true},id);const provider=getPaymentProvider();if(!provider.verifyWebhook(raw,timestamp!,signature!))throw new DomainError('FORBIDDEN','Invalid webhook signature.',401);const type=webhookEventType(raw);if(!['PAYMENT_SUCCESS_WEBHOOK','PAYMENT_FAILED_WEBHOOK','PAYMENT_USER_DROPPED_WEBHOOK'].includes(type??''))return ok({received:true,ignored:true},id);const data=await processCashfreeWebhook(new FirestoreRepository(),provider,raw,timestamp!,signature!,id,eventId);return ok(data,id)}catch(error){return fail(error,id)}}
