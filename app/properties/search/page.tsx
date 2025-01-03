import PropertyCard from "@/components/PropertyCard";
import SearchForm from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { IProperty } from "@/types";
import { Props } from "@/types/interfaces";


import Link from "next/link";
import { FaArrowCircleLeft } from "react-icons/fa";

const SearchResultPage = async ({ searchParams }: { searchParams: Promise<Props> }) => {
  const { location, propertyType } = await searchParams;

  await connectDB();

  let result: IProperty[] = [];

  const typeQuery = {
    $or: [{ type: { $regex: `.*${propertyType}.*` }, $options: "i" }],
  };

  const locactionQuery = {
    $or: [
      { name: { $regex: `.*${location}.*` }, $options: "i" },
      { description: { $regex: `.*${location}.*` }, $options: "i" },
      { "location.street": { $regex: `.*${location}.*` }, $options: "i" },
      { "location.state": { $regex: `.*${location}.*` }, $options: "i" },
      { "location.city": { $regex: `.*${location}.*` }, $options: "i" },
      { "location.zipcode": { $regex: `.*${location}.*` }, $options: "i" },
    ],
  };

  const allQuery = {
    $or: [
      { name: { $regex: `.*${location}.*` }, $options: "i" },
      { description: { $regex: `.*${location}.*` }, $options: "i" },
      { "location.street": { $regex: `.*${location}.*` }, $options: "i" },
      { "location.state": { $regex: `.*${location}.*` }, $options: "i" },
      { "location.city": { $regex: `.*${location}.*` }, $options: "i" },
      { "location.zipcode": { $regex: `.*${location}.*` }, $options: "i" },
      { type: { $regex: `.*${propertyType}.*` }, $options: "i" },
    ],
  };

  const search = async () => {
    console.log(location, propertyType);
    if (
      (!location || location === "") &&
      propertyType &&
      propertyType !== "All"
    ) {
      const propertiesQueryResults = await Property.find(typeQuery);
      result = propertiesQueryResults
    } else if (location && propertyType === "All") {
      const propertiesQueryResults = await Property.find(locactionQuery);
      result = propertiesQueryResults
    } else {
      const propertiesQueryResults = await Property.find(allQuery);
      result = propertiesQueryResults
    }
    return result;
  };

  const properties = await search();


  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <SearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href={"/properties"}
            className="text-blue-500 hover:underline mb-3"
          >
            <FaArrowCircleLeft className="mr-2 mb-1" /> Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property._id?.toString()}
                  property={property}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultPage;
