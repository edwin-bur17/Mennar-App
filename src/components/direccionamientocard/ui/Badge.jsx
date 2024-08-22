import { TbCircleDashedCheck } from "react-icons/tb";
import { TbCircleCheck } from "react-icons/tb";

const Badge = ({ title, isCompleted }) => {
    return (
        <span className={`flex items-center ${isCompleted ? 'text-success-700' : 'text-orange'}`}>
            {isCompleted ? <TbCircleCheck size={21} /> : <TbCircleDashedCheck size={21}/>}
            <span className="text-sm font-medium ms-1">{title}</span>
        </span>
    )
}

export default Badge