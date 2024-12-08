import { ReactNode } from "react";
import Image from "next/image";

interface PropertyImageProps {
  children?: ReactNode;
  images: string[];
}

const PropertyImages: React.FC<PropertyImageProps> = ({ images }) => {
  return (
    <section className="bg-50 p-4">
      <div className="mx-auto container">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className={`${index===images.length-1 && images.length % 2 !==0?'col-span-2':'col-span-1'}`}>
                <Image
                  src={image}
                  alt=""
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={1800}
                  height={400}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
