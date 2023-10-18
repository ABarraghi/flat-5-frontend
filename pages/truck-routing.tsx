import Layout from '@/components/layout';
import MainSearch from '@/components/Search/MainSearch';

export default function TruckRouting() {
  return (
    <Layout>
      <div className="grid h-[calc(100vh_-_15rem)] h-full w-full grid-cols-7 gap-x-3 bg-transparent px-5 lg:items-start">
        <div className="col-span-3 h-full rounded-xl bg-white font-bold">
          <MainSearch />
        </div>
        <div className="col-span-4 h-auto h-full rounded-xl bg-white text-2xl font-bold text-[#393978]"></div>
      </div>
    </Layout>
  );
}
