import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import type { DocumentData } from '../types/Document';

export default function useWebSocket(
  token: string,
  onDocumentUpdate: (doc: DocumentData) => void
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    const socket = io('ws://localhost/ws', {
      query: { token },
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🟢 WebSocket conectado:', socket.id);
    });

    socket.on('document_updated', (doc: DocumentData) => {
      onDocumentUpdate(doc);
    });

    socket.on('disconnect', () => {
      console.log('🔴 WebSocket desconectado:', socket.id);
    });

    socket.on('connect_error', (err) => {
      console.error('Erro na conexão WebSocket:', err.message);
      if (err?.message === 'Unauthorized') {
        window.location.href = '/login';
      }
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, onDocumentUpdate]);
}
