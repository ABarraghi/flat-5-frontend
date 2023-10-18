import Layout from '@/components/layout';
import MainSearch from '@/components/Search/MainSearch';

export default function TruckRouting() {
  return (
    <Layout>
      <div className="w-full  bg-transparent px-5">
        <div className=" grid grid-cols-7 gap-x-3 lg:items-start">
          <div className="col-span-3 flex rounded-xl bg-white font-bold">
            <MainSearch />
          </div>
          <div className="col-span-4 h-auto h-full rounded-xl bg-white text-2xl font-bold text-[#393978]"></div>
        </div>
      </div>
    </Layout>
  );
}
