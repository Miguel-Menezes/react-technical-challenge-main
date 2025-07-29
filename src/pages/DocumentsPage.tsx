import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import type { DocumentData } from '../types/Document';
import { api } from '../services/api';
import useWebSocket from '../hooks/useWebSocket';
import Header from '../components/Header';
import DocumentItem from '../components/DocumentItem';
import EditMatriculaModal from '../components/EditMatriculaModal';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../utils/isTokenExpired';

export default function DocumentsPage() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [startingDoc, setStartingDoc] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);
  const [newMatricula, setNewMatricula] = useState('');
  const size = 50;

  // WebSocket handler
  const handleDocumentUpdate = useCallback((updated: DocumentData) => {
     updated && setDocuments((prev) =>
      prev.map((doc) =>
        doc.cod_doc === updated.cod_doc ? updated : doc
      )
    );
  }, []);

  useWebSocket(token!, handleDocumentUpdate);

  // Atualizar matrícula
  const handleUpdate = async (cod_doc: string, matricula: string) => {
    try {
      await api.put(`/documents/${cod_doc}`, { matricula });
      setSelectedDoc(null);
    } catch (err: any) {
      if (err.response?.status === 401) navigate('/login');
      else alert('Erro ao atualizar matrícula');
    }
  };

  // Obter documentos
  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/documents?starting_doc=${startingDoc}&size=${size}`);
      setDocuments((prev) => [...prev, ...res.data]);
      setStartingDoc((prev) => prev + res.data.length);
    } catch (err) {
      console.error('Erro ao buscar documentos', err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers para modal
  const handleClickDoc = (doc: DocumentData) => {
    setSelectedDoc(doc);
    setNewMatricula(doc.matricula);
  };

  const handleSaveModal = async () => {
    if (selectedDoc) await handleUpdate(selectedDoc.cod_doc, newMatricula);
  };

  const handleCancelModal = () => setSelectedDoc(null);

  // Proteção contra token expirado
  useEffect(() => {
    if (!token || isTokenExpired()) navigate('/login');
    fetchDocuments();
  }, []);

  return (
    <div className="w-full h-screen bg-gray flex flex-col">
      <Header />

      <div className="flex-1 overflow-hidden bg-gray p-6">
        <div className="bg-white rounded-[15px] h-full flex flex-col p-5">
          <h1 className="text-[13px] text-red mb-4">LISTA DE PESAGENS</h1>

          <div className="flex-1 overflow-y-auto scrollbar-hidden">
            <table className="w-full table-auto border-collapse">
              <thead className="sticky top-0 bg-white text-xs text-black">
                <tr>
                  <th className="p-4 text-left w-[20%]">Data</th>
                  <th className="p-4 text-left">Matrícula</th>
                  <th className="p-4 text-right">Peso líquido (kg)</th>
                </tr>
              </thead>

              <tbody className="text-black">
                {documents.map((doc, index) => (
                  <DocumentItem
                    key={`${doc.cod_doc}-${index}`}
                    doc={doc}
                    index={index}
                    onClick={() => handleClickDoc(doc)}
                  />
                ))}
              </tbody>
            </table>

            <div className="flex justify-center mt-6">
              <button
                onClick={fetchDocuments}
                disabled={loading}
                className="border border-red text-red py-2 px-4 rounded-[8px] text-xs hover:bg-red hover:text-white transition-colors duration-200"
              >
                {loading ? 'Carregando...' : 'CARREGAR MAIS PESAGENS'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedDoc && (
        <EditMatriculaModal
          matricula={newMatricula}
          onChange={setNewMatricula}
          onCancel={handleCancelModal}
          onSave={handleSaveModal}
        />
      )}
    </div>
  );
}
