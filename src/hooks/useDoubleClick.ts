"use client";

import { useRef } from "react";

interface IUseDoubleClickOptions {
  onSingleClick: (id: string) => void;
  onDoubleClick: (id: string) => void;
  delay?: number;
}

export function useDoubleClick({
  onSingleClick,
  onDoubleClick,
  delay = 300,
}: IUseDoubleClickOptions) {
  const lastTapRef = useRef<{ time: number; nodeId: string | null }>({
    time: 0,
    nodeId: null,
  });

  const handleAction = (
    e: React.MouseEvent | React.TouchEvent,
    nodeId: string,
  ) => {
    e.stopPropagation();

    const now = Date.now();
    const timeDiff = now - lastTapRef.current.time;
    const isSameNode = lastTapRef.current.nodeId === nodeId;

    // Execute single-click logic immediately
    onSingleClick(nodeId);

    if (isSameNode && timeDiff < delay) {
      onDoubleClick(nodeId);
      // Reset reference state matrix to avoid action looping
      lastTapRef.current = { time: 0, nodeId: null };
    } else {
      // Track current timestamp interaction for next loop comparison
      lastTapRef.current = { time: now, nodeId };
    }
  };

  return handleAction;
}
