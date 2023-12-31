import { MouseEvent, useRef } from 'react';
import { SvgComponent } from '@/components';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from "@/appStore/hooks";
import {
	selectData,
	addElementTmp,
	deleteElementTmp,
	addElement,
} from "@/appStore/reducers/drawElementsSlice";

import styles from './canvas.module.scss';

const CanvasComponent: React.FC = () => {
	const canvasRef = useRef<any>(null);
	const dispatch = useAppDispatch();
	const MIN_WIDTH = 10;
	const MIN_HEIGHT = 10;
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
		if (canvasRef.current) {
			setDragging(true);
			const rect = canvasRef.current.getBoundingClientRect();
			const updatedPosition = {
				x: event.clientX - rect.left,
				y: event.clientY - rect.top
			};
			setPosition(updatedPosition);
		}
	};
	const handleMouseMove = (event: MouseEvent) => {
		if (dragging) {
			if (canvasRef.current) {
				const rect = canvasRef.current.getBoundingClientRect();
				const newXcoordinate = event.clientX - rect.left;
				const newYcoordinate = event.clientY - rect.top;
				const newWidth = Math.abs(newXcoordinate - position.x);
				const newHeight = Math.abs(newYcoordinate - position.y);
				setElementDimensions({
					w: newWidth,
					h: newHeight
				});
			}
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
		if (elementDimensions.w > MIN_WIDTH && elementDimensions.h > MIN_HEIGHT) {
			const newSvgElement = {
				id: Date.now(),
				width: elementDimensions.w,
				height: elementDimensions.h,
				x: position.x,
				y: position.y,
				color: currentColor
			};
			// dispatch(addElementTmp(newSvgElement));
			dispatch(addElement(newSvgElement));
		}
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
				ref={canvasRef}
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
