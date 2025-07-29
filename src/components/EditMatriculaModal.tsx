import editIcon from '../assets/edit_icon.svg';
import closeIcon from '../assets/close_icon.svg';

interface Props {
  matricula: string;
  onChange: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function EditMatriculaModal({ matricula, onChange, onCancel, onSave }: Props) {
  return (
    <div className="fixed inset-0 fundo-modal flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-[15px] shadow-lg w-[300px]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <img src={editIcon} alt="Editar" />
            <h2 className="text-base font-medium">Editar Matrícula</h2>
          </div>
          <button onClick={onCancel} aria-label="Fechar" className='close-button'>
            <img src={closeIcon} alt="Fechar" />
          </button>
        </div>

        <label className="text-sm text-gray-dark block mb-1">Matrícula</label>
        <input
          type="text"
          value={matricula}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSave();
          }}
          className="border border-gray-soft p-2 w-full rounded-[8px] mb-4"
        />

        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-dark rounded-[8px] border border-gray-dark hover:bg-red hover:text-white hover:border-red transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-sm text-red rounded-[8px] border border-red hover:bg-red hover:text-white transition-colors"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
