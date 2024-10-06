
import {
  makeMoveable,
  DraggableProps,
  OnDrag,
  Draggable,
  OnDragEnd
} from "react-moveable";

// https://daybrush.com/moveable/release/latest/doc/Moveable.html
const ReactMoveable = makeMoveable<DraggableProps>([Draggable]);

type MoveableProps = {
  containerRef: React.RefObject<HTMLDivElement>,
  targetRef: HTMLParagraphElement,
  OnDragEnd: (left: number, top: number) => void
}

export const Moveable: React.FC<MoveableProps> = ({
  containerRef,
  targetRef,
  OnDragEnd
}) => {
  return (
    <ReactMoveable
      draggable={true}
      snappable
      keepRatio
      target={targetRef}
      dragContainer={containerRef}
      hideDefaultLines
      onDrag={({
        target,
        left, top,
      }: OnDrag) => {
        target!.style.left = `${left}px`;
        target!.style.top = `${top}px`;
      }}
      onDragEnd={({
        currentTarget
      }: OnDragEnd) => {
        const rect = currentTarget.getRect();
        OnDragEnd(rect.left, rect.top)
      }}
    />
  );
};
