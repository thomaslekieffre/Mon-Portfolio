"use client";

import { useState, useCallback, useRef } from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const counterRef = useRef(0);

  const push = useCallback((title: string, message: string) => {
    counterRef.current++;
    const id = `notif-${counterRef.current}`;
    setNotifications((prev) => [...prev, { id, title, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return { notifications, push, dismiss };
}
