import { style } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layputApi'
import React, { useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {}

const FAQ = (props: Props) => {
    const {data, isLoading} = useGetHeroDataQuery("FAQ");
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [question, setQuestion] = useState<any[]>([]);
    
    useEffect(() => {
         if(data){
            setQuestion(data.layout.faq);
         }
    },[data])
    
    const toggleQuestion = (id: any) => {
        setActiveQuestion(activeQuestion === id ? null : id);
    }
  return (
    <div>
          <div className="w-[90%] 800px:w-[80%] m-auto mt-[120px]">
            <h1 className={`${style.title} 800px:!text-[40px]`}>
                Frequently <span className='bg-clip-text text-[#0000] font-[600] bg-gradient-to-r from-[#0c39ff] to-[#17c7d7]'>Asked</span> Question
            </h1>
        <div className="mt-12">
          <dl className="space-y-8">
            {question.map((q: any) => (
              <div
                key={q._id}
                className={`${
                  q._id !== question[0]?._id && "border-t"
                } border-gray-200 pt-6`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <span
                      className={` font-medium text-black dark:text-white`}
                    >{q.question}</span>
                    <span className="ml-6 flex-shrink-0">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6 text-black dark:text-white" />
                      ) : (
                        <HiPlus className="h-6 w-6 text-black dark:text-white" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                    <dd className=' mt-2 pr-2'>
                 <p className=' text-base font-Poppins text-[#525151] dark:text-[#b4b4b4]'>{q.answer}</p>
                    </dd>
                )}
              </div>
            ))}
          </dl>
          <br />
          <br />
        </div>
       
      </div>
    </div>
  )
}

export default FAQ