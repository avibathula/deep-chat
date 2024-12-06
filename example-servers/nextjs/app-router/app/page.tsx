/* eslint-disable @next/next/no-img-element */
'use client';

import {RequestDetails} from 'deep-chat/dist/types/interceptors';
import dynamic from 'next/dynamic';
import styles from './style.module.css';

// Need to import the component dynamically as it uses the 'window' property
const DeepChat = dynamic(
  () => import('deep-chat-react').then((mod) => mod.DeepChat),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1>
          Deep Chat test ground for{' '}
          <a href="https://github.com/OvidijusParsiunas/deep-chat/tree/main/example-servers/nextjs">NextJs</a>
        </h1>
      </div>
      <div className={styles.chatContainer}>
        <DeepChat
          style={{
            borderRadius: '10px',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
          messageStyles={{
            default: {
              shared: {
                innerContainer: {
                  fontSize: '1rem',
                  flex: '1 1 auto',
                  display: 'flex',
                  flexDirection: 'column'
                },
                bubble: {
                  maxWidth: '85%',
                  padding: '0.75rem 1rem',
                  marginBottom: '0.5rem'
                }
              },
              user: {
                bubble: {
                  backgroundColor: '#2563eb',
                  color: 'white',
                  borderRadius: '1rem 1rem 0 1rem'
                }
              },
              ai: {
                bubble: {
                  backgroundColor: '#f3f4f6',
                  color: '#1f2937',
                  borderRadius: '1rem 1rem 1rem 0'
                }
              }
            }
          }}
          introMessage={{text: 'Send a streamed chat message through an example server to OpenAI.'}}
          connect={{url: '/api/openai/chat-stream', stream: true, additionalBodyProps: {model: 'gpt-4o'}}}
          requestBodyLimits={{maxMessages: -1}}
          errorMessages={{displayServiceErrorMessages: true}}
        />
      </div>
    </main>
  );
}
