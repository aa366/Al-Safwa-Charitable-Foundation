import Link from "next/link";
const GridItem = ({img, title ,id ,path}) => {

    return (
      <div className="relative mx-3 hover:scale-102 transition-transform duration-200 mb-4" key={id}>
        <Link href={`/${path + id}`}  >
        
          <img
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