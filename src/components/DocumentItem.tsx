import type { DocumentData } from '../types/Document';
import { calculateWeight } from '../utils/calculateWeight';
import { formatDate, formatHours } from '../utils/formatDate';

interface Props {
  doc: DocumentData;
  index: number;
  onClick?: () => void;
}

const DocumentItem = ({ doc, index, onClick }: Props) => {
  return (
    <tr
      onClick={onClick}
      className={`${
        index % 2 === 0 ? 'bg-gray' : 'bg-white'
      } cursor-pointer hover:bg-red-soft transition-colors duration-200 h-[60px]`}
    >
      <td className="px-5 text-black text-sm rounded-l-[8px]">
        <div className="flex flex-wrap xl:flex-nowrap items-center gap-2">
          <span>{formatDate(doc.data)}</span>
          <span className="hidden xl:inline">-</span>
          <span>{formatHours(doc.data)}</span>
        </div>
      </td>

      <td className="px-5 text-black text-sm">
        {doc.matricula}
      </td>

      <td className="px-5 text-green text-2xl font-bold text-right rounded-r-[8px]">
        {calculateWeight(doc.linhas).toLocaleString('pt-PT').replace(/\s/g, '.')} kg
      </td>
    </tr>
  );
};

export default DocumentItem;
