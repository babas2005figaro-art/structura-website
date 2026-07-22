'use client';

import {FormEvent, useRef, useState} from 'react';

type SubmissionState = 'idle' | 'sending' | 'success' | 'error';

const successMessage =
  'Thank you. Your inquiry has been received. Our team will respond shortly.';
const errorMessage =
  'We couldn’t submit your inquiry. Please check your details and try again.';

export function ContactForm({kind = 'General contact'}:{kind?:string}) {
  const [state, setState] = useState<SubmissionState>('idle');
  const [message, setMessage] = useState('');
  const submissionLocked = useRef(false);

  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionLocked.current) return;

    submissionLocked.current = true;
    setState('sending');
    setMessage('');
    const form = event.currentTarget;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: new FormData(form),
        headers: {Accept: 'application/json'},
      });
      const data = await response.json().catch(() => null);

      if (!response.ok || data?.ok !== true) {
        throw new Error(data?.error || errorMessage);
      }

      form.reset();
      setMessage(successMessage);
      setState('success');
    } catch (error) {
      submissionLocked.current = false;
      setMessage(error instanceof Error ? error.message : errorMessage);
      setState('error');
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <input type="hidden" name="kind" value={kind}/>
    <label>Name<input name="name" required autoComplete="name"/></label>
    <label>Email<input name="email" type="email" required autoComplete="email"/></label>
    <label>Organization<input name="organization" autoComplete="organization"/></label>
    <label className="full">How can we help?<textarea name="message" rows={5} minLength={10} required/></label>
    <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <button className="button dark" type="submit" disabled={state === 'sending' || state === 'success'}>
      {state === 'sending' ? 'Sending…' : 'Submit inquiry'}
    </button>
    {(state === 'success' || state === 'error') &&
      <p className={`form-state ${state}`} role={state === 'error' ? 'alert' : 'status'}>{message}</p>}
  </form>;
}
