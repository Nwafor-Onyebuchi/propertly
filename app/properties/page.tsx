// 'use client'

import Pagination from '../../components/Pagination';
import PropertyCard from '../../components/PropertyCard';
import connectDB from '../../config/database';
import Property from '../../models/Property';
import { PropertiesPageProps } from '../../types';

const PropertiesPage = async ({ searchParams }: { searchParams: Promise<PropertiesPageProps> }) => {
    const { page = 1, pageSize = 3 } = await searchParams;

    await connectDB();

    const skip = (page - 1) * pageSize;
    const total = await Property.countDocuments({});

    const showPagination = total > pageSize;

    const properties = await Property.find({}).skip(skip).limit(pageSize);

    return (
        <section className='px-4 py-6'>
            <div className="container-xl lg:container m-auto px-6 py-6">
                {properties.length === 0 ? (
                    <p>No properties found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {properties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                )}
                {showPagination && <Pagination page={page} pageSize={pageSize} total={total} />}
            </div>
        </section>
    );
};

export default PropertiesPage;
