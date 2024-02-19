"use client";



import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable, PointerSensor, useSensors, DragEndEvent, useSensor } from "@dnd-kit/core";
import { CSSProperties } from "react";

interface Position {
  x: number;
  y: number;
}

interface DroppableProps {
  children: React.ReactNode; // Explicitly defining children prop
}

const Droppable: React.FC<DroppableProps> = ({ children }) => {
  const { setNodeRef } = useDroppable({ id: "droppable" });
  return <div ref={setNodeRef} className="w-full h-full border-2 border-dashed border-gray-400">{children}</div>;
};

interface DraggableProps {
  children: React.ReactNode;
  position: Position;
}

const Draggable: React.FC<DraggableProps> = ({ children, position }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: "draggable",
  });
  const style: CSSProperties = { // Using CSSProperties for correct typing
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    position: "absolute", // TypeScript understands this as a valid CSS position value
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="p-2 bg-blue-500 text-white cursor-grab rounded">
      {children}
    </div>
  );
};

export default function Page() {
  const sensors = useSensors(useSensor(PointerSensor));
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const handleDragEnd = (event: DragEndEvent) => {
    const { delta } = event;
    setPosition((currentPosition) => ({
      x: currentPosition.x + delta.x,
      y: currentPosition.y + delta.y,
    }));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="h-screen w-screen flex justify-center items-center">
        <Droppable>
          <Draggable position={position}>
            Drag Me
          </Draggable>
        </Droppable>
      </div>
    </DndContext>
  );
}
