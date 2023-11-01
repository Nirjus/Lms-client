import React,{FC} from "react";
interface HeadingProps{
    title: string;
    description: string;
    keyword: string;
}

const Heading: FC<HeadingProps> = ({title, description, keyword}) => {
    return(
        <>
           <title>{title}</title>
           <meta name="viewport" content="width=device-width, initial-scale=1"/>
           <meta name="description" content={description}/>
           <meta name="keyword" content={keyword}/>
        </>
    )
};

export default Heading;