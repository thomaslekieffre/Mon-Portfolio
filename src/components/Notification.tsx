"use client";

import { motion, AnimatePresence } from "framer-motion";
import { notificationVariants } from "@/lib/animations";
import type { Notification as NotifType } from "@/hooks/useNotifications";

interface NotificationStackProps {
  notifications: NotifType[];
  onDismiss: (id: string) => void;
}

export default function NotificationStack({
  notifications,
  onDismiss,
}: NotificationStackProps) {
  return (
    <div className="fixed bottom-14 right-2 z-[85] flex flex-col gap-2 max-w-[280px]">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-surface/95 dark:bg-ds/95 backdrop-blur-xl border border-primary/20 dark:border-dp/20 rounded-xl shadow-lg p-3 cursor-pointer"
            onClick={() => onDismiss(notif.id)}
          >
            <div className="text-xs font-heading font-bold text-primary-dark dark:text-dh tracking-wider mb-1">
              {notif.title}
            </div>
            <div className="text-xs text-body/80 dark:text-db/80">
              {notif.message}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
