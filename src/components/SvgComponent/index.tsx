import { SvgType } from '@/types';

interface SvgComponentType {
    svg: SvgType,
    featureMode: number;
    deleteSvgElement: (id: number) => void;
};

const SvgComponent: React.FC<SvgComponentType> = ({
    svg,
    featureMode,
    deleteSvgElement
}) => (
    <rect
        onClick={featureMode === 2 ? () => deleteSvgElement(svg.id) :  undefined}
        width={`${svg.width}px`}
        height={`${svg.height}px`}
        x={svg.x}
        y={svg.y}
        fill={svg.color}
    />
);

export default SvgComponent;
