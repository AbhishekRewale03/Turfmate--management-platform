import { describe,expect,it } from 'vitest'
import { unsignedWebhookProbe } from '../../lib/api/webhook-probe-policy'

describe('Cashfree webhook connectivity probe policy',()=>{
 it('accepts only harmless unsigned probes',()=>{expect(unsignedWebhookProbe('',null,null)).toBe(true);expect(unsignedWebhookProbe('{}',null,null)).toBe(true);expect(unsignedWebhookProbe('{"test":true}',null,null)).toBe(true)})
 it('rejects unsigned event-like bodies',()=>{expect(()=>unsignedWebhookProbe('{"type":"PAYMENT_SUCCESS_WEBHOOK"}',null,null)).toThrowError(expect.objectContaining({code:'FORBIDDEN'}));expect(()=>unsignedWebhookProbe('{"data":{"refund":{}}}',null,null)).toThrowError(expect.objectContaining({code:'FORBIDDEN'}))})
 it('rejects partial signature headers',()=>{expect(()=>unsignedWebhookProbe('{}','signature',null)).toThrowError(expect.objectContaining({code:'FORBIDDEN'}));expect(()=>unsignedWebhookProbe('{}',null,'123')).toThrowError(expect.objectContaining({code:'FORBIDDEN'}))})
})
