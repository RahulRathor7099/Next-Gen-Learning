import { Code2, FileType, Layers, Database, HelpCircle, type LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Code2,
  FileType,
  Layers,
  Database,
}

interface DynamicIconProps {
  name: string
  className?: string
  size?: number
}

export default function DynamicIcon({ name, className, size = 24 }: DynamicIconProps) {
  const IconComponent = iconMap[name] || HelpCircle
  return <IconComponent className={className} size={size} />
}
