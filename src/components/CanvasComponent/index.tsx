import { MouseEvent } from 'react';
import { SvgComponent } from '@/components';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	selectData,
	addElementTmp,
	deleteElementTmp,
} from "@/appStore/reducers/drawElementsSlice";

import styles from './canvas.module.scss';

const CanvasComponent: React.FC = () => {
	const dispatch = useAppDispatch();
	const sideOffset = 300; // TODO : refactor that !!!
	/*
		Get needed data from the redux
	*/
	const {
		elements,
		currentColor,
		featureMode,
	} = useAppSelector(selectData);
	// ==
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [elementDimensions, setElementDimensions] = useState({ w: 0, h: 0});
	const [dragging, setDragging] = useState(false);
	const handleMouseDown = (event: MouseEvent) => {
		setDragging(true);
		const updatedPosition = {
			x: event.clientX - sideOffset,
			y: event.clientY,
		};
		setPosition(updatedPosition);
	};
	const handleMouseMove = (event: MouseEvent) => {
		if (dragging) {
			const newXcoordinate = event.clientX - sideOffset;
			const newYcoordinate = event.clientY;
			const newWidth = Math.abs(newXcoordinate - position.x);
			const newHeight = Math.abs(newYcoordinate - position.y);
			setElementDimensions({
				w: newWidth,
				h: newHeight
			});
		}
	};
	const handleMouseUp = () => {
		// restore local state
		setElementDimensions({
			w: 0,
			h: 0
		});
		setPosition({
			x: 0,
			y: 0
		});
		setDragging(false);
		// trigger redux
		const newSvgElement = {
			id: Date.now(),
			width: elementDimensions.w,
			height: elementDimensions.h,
			x: position.x,
			y: position.y,
			color: currentColor
		};
		dispatch(addElementTmp(newSvgElement));
	};
	const deleteSvgElement = (id: number) => {
		dispatch(deleteElementTmp(id));
	};
	return (
		<div className={styles.canvas}>
			<svg
				onMouseDown={featureMode === 1 ? (e) => handleMouseDown(e) : undefined}
				onMouseMove={featureMode === 1 ? (e) => handleMouseMove(e) : undefined}
				onMouseUp={featureMode === 1 ? () => handleMouseUp() : undefined}
				width="100%"
				height="100%"
			>
				<rect width={elementDimensions.w} height={elementDimensions.h} x={position.x} y={position.y} />
				{
					elements.map(element => <SvgComponent key={element.id} svg={element} featureMode={featureMode} deleteSvgElement={deleteSvgElement} />)
				}
			</svg>
		</div>
	)
};

export default CanvasComponent;
