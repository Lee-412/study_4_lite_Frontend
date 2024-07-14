import Filling from "./Filling";
import Multiplechoice from "./Multiplechoice";

export default function Question({question, handleInput}) {
    return (
        <>
            {question.type === "filling" ? (
                <Filling question={question} handleInput={handleInput} />
            ) : (
                <Multiplechoice question={question} handleInput={handleInput}/>
            )}       
               
        </>
    )
}