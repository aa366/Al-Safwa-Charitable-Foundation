import Link from "next/link";
import Image from "next/image";
const GridItem = ({img, title ,id ,path}) => {

    return (
      <div className="relative mx-3 hover:scale-102 transition-transform duration-200 mb-4 w-[40%] md:w-[28%] lg:w-[22%]" key={id}>
        <Link href={`/${path + id}`}  >
        
          <Image
          width={100}
          height={100}
          unoptimized={true}
          priority={false}
            src={img}
              alt={title || 'News image'} 
            className="w-full h-full object-cover rounded-xl aspect-[4/3]"
        
          />

          <div className="  text-black shadow-sm w-[90%]  p-2 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4  text-center truncate bg-[rgba(126,252,174,0.75)] font-bold rounded-b-xl">
           {title}
          </div>
         
        </Link>
      </div>
    );
  };
  export default GridItem;