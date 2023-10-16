import Layout from '@/components/layout';
import MainSearch from '@/components/Search/MainSearch';

export default function TruckRouting() {
  return (
    <Layout>
      <div className="h-full w-full bg-transparent px-5">
        <div className="mx-auto grid h-full grid-cols-7 gap-x-3 rounded-md lg:items-start">
          <div className="col-span-3 h-full rounded-xl bg-white font-bold">
            <MainSearch />
          </div>
          <div className="col-span-4 h-full rounded-xl bg-white text-2xl font-bold text-[#393978]">
            Search Available Loads
          </div>
        </div>
      </div>
    </Layout>
  );
}
