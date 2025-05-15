"use server";
import { Card, CardBody } from "@heroui/card";
import { Suspense } from "react";

import ListProducts from "@/components/producs/list-products";
import API from "@/config/api";
import SidebarFilter from "@/components/producs/sidebar-filter";

export default async function Home() {
  const CTG_LIST: string[] = await API("products/category-list", "GET");

  return (
    <section className="w-full gap-4 py-8 md:py-10">
      <div className="grid lg:grid-cols-12 grid-cols-auto gap-4">
        <div className="lg:col-span-3 ">
          <Card className="sticky top-20">
            <CardBody>
              <Suspense>
                <SidebarFilter ctg={CTG_LIST} />
              </Suspense>
            </CardBody>
          </Card>
        </div>
        <div className="lg:col-span-9">
          <Card className="p-4">
            <CardBody className="py-5">
              <Suspense>
                <ListProducts />
              </Suspense>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}
