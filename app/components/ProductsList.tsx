import Image from "next/image";
import { ProductType } from "../api/products/route";

type ProductListProps = {
  products: ProductType[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <>
      {products.map((product, index) => (
        <div
          data-testid="product"
          key={index}
          className="bg-white rounded-2xl flex flex-col items-center shadow-md p-4 max-w-4xl mx-auto md:flex-row"
        >
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <Image
                src={product.image}
                alt={product.model}
                width={150}
                height={150}
                className="object-cover rounded-md"
                priority={index < 2}
              />
              <h1 className="text-stone-950 font-bold text-xl text-center mt-2">
                {product.model}
              </h1>
            </div>
            <div className="hidden md:block border-2 border-stone-950 h-36 mx-6" />
          </div>

          <div className="flex flex-col md:fle justify-between py-2">
            <h1 className="font-bold text-stone-950 text-2xl mb-2 text-center md:text-left">
              {product.name}
            </h1>

            <div className="grid md:grid-cols-3 gap-x-8 gap-y-4 text-center md:text-left">
              <div>
                <p className="text-stone-400 ">Durabilidade</p>
                <p className="font-semibold text-stone-950 ">
                  {product.treadwear}
                </p>
              </div>
              <div>
                <p className="text-stone-400 ">Tração</p>
                <p className="font-semibold text-stone-950 ">
                  {product.traction}
                </p>
              </div>
              <div>
                <p className="text-stone-400 ">Temperatura</p>
                <p className="font-semibold text-stone-950 ">
                  {product.temperature}
                </p>
              </div>

              <div>
                <p className="text-stone-400 ">Índice de Velocidade</p>
                <p className="font-semibold text-stone-950 ">
                  {product.speedRating}
                </p>
              </div>
              <div>
                <p className="text-stone-400 ">Capacidade de Carga</p>
                <p className="font-semibold text-stone-950 ">
                  {product.loadIndex}
                </p>
              </div>
              <div>
                <p className="text-stone-400 ">Desenho</p>
                <p className="font-semibold text-stone-950 ">
                  {product.pattern}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
