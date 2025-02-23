import { useState } from "react";
import { createNewChapterType } from "../types/teacher";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil } from "lucide-react";

const DraggableCard = ({ item }: { item: createNewChapterType }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full p-4 bg-white shadow-md rounded-md flex items-center justify-between mb-2 cursor-auto"
    >
      <div className="divCenter gap-4">
        <GripVertical
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-600 bg-white"
        />
        <span>{item.chapterTitle}</span>
      </div>
      <div>
        <Pencil />
      </div>
    </div>
  );
};

const EditChapterList = ({
  chapters,
}: {
  chapters: createNewChapterType[];
}) => {
  const [items, setItems] = useState<createNewChapterType[]>(chapters);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    setItems(arrayMove(items, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.length > 0 && (
          <div className="flex flex-col space-y-2 max-h-80 overflow-hidden p-4 bg-gray-100">
            {items.map((item) => (
              <DraggableCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </SortableContext>
    </DndContext>
  );
};

export default EditChapterList;
