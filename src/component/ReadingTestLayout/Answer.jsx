import { FaCheck, FaTimes } from "react-icons/fa";
export default function Answer({number, studentAnswer, answer}) {
    return (
        <div className="mt-7 flex flex-row gap-3 items-center">
            <p className="bg-[#e8f2ff] text-[#35509a] w-8 h-8 flex justify-center items-center font-semibold rounded-full">{number}</p>
            <p className={`uppercase text-[#35509a] font-semibold`}>{`${answer}:`}</p>
            <i className={`${(studentAnswer === answer) ? '' : 'line-through'}`}>{studentAnswer}</i>
            {(studentAnswer === answer) ? <FaCheck className="text-[#3cb46e]"/> : <FaTimes className="text-[#e43a45]"/>}
        </div>
    )
}