"use client"

import React from 'react'
import { Badge } from './ui/badge'

interface NotificationBadgeProps {
  count?: number
}

export function NotificationBadge({ count }: NotificationBadgeProps) {
  if (count && count > 0) {
    return (
      <Badge
        variant="destructive"
        className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs rounded-full flex items-center justify-center">
        {count}
      </Badge>
    )
  }
  return <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
}
