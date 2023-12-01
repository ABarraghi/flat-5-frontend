import Layout from '@/components/layout';
import Button from '@/components/common/Button';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import UtilityServices from '@/components/UtilityServices';
import HomeBanner from '@/components/layout/HomeBanner';

export default function Home() {
  return (
    <Layout isHome={true}>
      <div className="absolute relative bottom-0 left-0 right-0 top-0 max-h-[100vh] w-full bg-transparent">
        <HomeBanner>
          <div className="absolute ">
            <Button
              name="Search Available Loads"
              wrapperClass="rounded-md bg-[#F16521]"
              contentClass="text-white text-[12px] md:text-[16px] tracking-tight sm:tracking-normal normal-case"
              internalHref={'/routes'}
            >
              &nbsp; <ArrowRightIcon className="h-5 w-5 text-white" />
            </Button>
          </div>
        </HomeBanner>
      </div>
      <UtilityServices />
    </Layout>
  );
}
