import MaximizeEfficiencyIcon from '@/components/common/icons/MaximizeEfficiency'
import { type JSX } from 'react'

interface UtilityServiceProps {
  icon: JSX.Element
  title: string
  content: string
}
const UtilityService = ({ icon, title, content }: UtilityServiceProps) => {
  return (
    <div className="flex flex-col justify-around items-center">
      <div>{icon}</div>
      <div>
        <span className="text-[#393978] font-medium">{title}</span>
      </div>
      <div>
        <span className="font-thin">{content}</span>
      </div>
      <div />
    </div>
  )
}

export default UtilityService
