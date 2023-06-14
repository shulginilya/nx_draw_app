import { SvgType } from '@/types';

interface SvgComponentType {
    svg: SvgType,
    deleteSvgElement: (id: number) => void;
};

const SvgComponent: React.FC<SvgComponentType> = ({
    svg,
    deleteSvgElement
}) => (
    <rect
        onClick={() => deleteSvgElement(svg.id)}
        width={`${svg.width}px`}
        height={`${svg.height}px`}
        x={svg.x}
        y={svg.y}
    />
);

export default SvgComponent;
