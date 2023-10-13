import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout'
import BannerImage from '@/public/images/banner.png'
import Button from '@/components/common/Button'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import UtilityServices from '@/components/UtilityServices'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout isHome={true}>
      <div className="w-full relative absolute top-0 left-0 bottom-0 right-0 max-h-[100vh] bg-transparent">
        <Image src={BannerImage} className="object-cover" alt="Flat 5" style={{ width: '100%', height: '100%' }} />
        <div className="absolute bottom-[100px] left-[55%]">
          <Button
            name="Search Available Loads"
            wrapperClass="rounded-md bg-[#F16521]"
            contentClass="text-white text-[16px] tracking-tight sm:tracking-normal normal-case"
          >
            &nbsp; <ArrowRightIcon className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
      <UtilityServices />
    </Layout>
  )
}
