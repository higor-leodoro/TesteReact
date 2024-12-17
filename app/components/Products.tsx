"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import ProductList from "./ProductsList";
import { ProductType } from "../api/products/route";

export default function Products() {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(
    products || []
  );

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: ProductType[]) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
        setProducts([]);
        setFilteredProducts([]);
      });
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts(products);
    } else {
      const searchTerms = search.toLowerCase().split(" ");
      const filtered = products.filter((product) => {
        const productStr = [product.name, product.model, ...product.cars]
          .join(" ")
          .toLowerCase();

        return searchTerms.every((term) => productStr.includes(term));
      });

      setFilteredProducts(filtered);
    }
  }, [search, products]);

  return (
    <div className="w-full flex justify-center flex-col h-full">
      <div className="border-gray-500 md:w-1/2 md:mx-auto mb-4">
        <label
          htmlFor="search"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Pesquisa
        </label>
        <div className="mt-2 grid grid-cols-1">
          <input
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
            id="search"
            name="search"
            type="search"
            placeholder="Pesquisar produtos"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
          />
        </div>
      </div>

      <div className="mb-4 border-b border-1"></div>
      <div className="flex flex-col gap-5">
        {filteredProducts.length === 0 ? (
          <h1 className="text-center text-2xl font-semibold">
            Nenhum produto encontrado
          </h1>
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
