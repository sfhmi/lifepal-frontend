"use server";
import Filters from '@/components/producs/filters';
import ListProducts from '@/components/producs/list-products';
import API from '@/config/api';
import { Card, CardBody } from '@heroui/card';

export default async function Home() {
  const CTG_LIST: string[] = await API('products/category-list', 'GET')

  return (
    <section className="w-full gap-4 py-8 md:py-10">
      <div className="grid lg:grid-cols-12 grid-cols-auto gap-4">
        <div className="lg:col-span-3 ">
          <Card className='sticky top-20'>
            <CardBody>
              <Filters ctg={CTG_LIST} />
            </CardBody>
          </Card>
        </div>
        <div className="lg:col-span-9">
          <Card className='p-4'>
            <CardBody className='py-5'>
              <ListProducts />
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
