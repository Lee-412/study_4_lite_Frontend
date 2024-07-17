import ReactMarkdown from "react-markdown";
export default function Filling({question, handleInput}) {
    return (
        <div className="mt-7 flex flex-row gap-3">
            <p className="bg-[#e8f2ff] text-[#35509a] w-8 h-8 flex justify-center items-center font-semibold rounded-full">{question.number}</p>
            <div className="flex flex-col gap-2">
                <p className="font-semibold">{question.question}</p>
                <input className="px-4 py-2 border border-gray-300 rounded-lg" type="text" data-number={question.number - 1} onBlur={handleInput}/>
            </div>
        </div>
    )
}