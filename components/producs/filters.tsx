"use client"
import { Button } from "@heroui/button";
import { Image } from "@heroui/image";
import { Link } from "@heroui/link";
import { Radio, RadioGroup } from "@heroui/radio";
import { Select, SelectItem } from "@heroui/select";
import { Slider } from "@heroui/slider";
import { parseAsInteger, useQueryState } from "nuqs";
import { Fragment, memo, useState } from "react"

export const MAX_VALUE_RANGE: number = 100000
const RATINGS: number[] = [1, 2, 3, 4, 5]
const Filters = ({
  ctg
}: {
  ctg: string[]
}): React.JSX.Element => {
  const [rating, setRatings] = useQueryState('r', parseAsInteger.withDefault(0))
  const [category, setCategory] = useQueryState('ctg')
  const [mP, setMP] = useQueryState('mp', parseAsInteger.withDefault(MAX_VALUE_RANGE))

  return (
    <Fragment>
      <div className="flex flex-col gap-4">
        <Select
          classNames={{
            base: "max-w-xs",
            trigger: "min-h-12 py-2",
            value: 'capitalize',
            label: 'text-sm'
          }}
          radius="sm"
          aria-label="category"
          label="Category"
          labelPlacement="outside"
          placeholder="Choose a category"
          variant="bordered"
          onChange={(e) => {
            if (!e.target.value) {
              setCategory(null)
              return
            }
            setCategory(e.target.value)
          }}
        >
          {ctg && ctg.map((item: string) => (
            <SelectItem key={item} className="capitalize">{item.replaceAll('-', ' ')}</SelectItem>
          ))}
        </Select>
        <hr />
        <Slider
          size="sm"
          className="max-w-md"
          classNames={{
            label: 'text-sm'
          }}
          aria-label="price-range"
          defaultValue={mP || 0}
          maxValue={MAX_VALUE_RANGE}
          formatOptions={{
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }}
          label="Price Range"
          showTooltip={true}
          tooltipValueFormatOptions={{
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
          }}
          onChange={(value) => setMP(value as number)
          }
        />
        <hr />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <span className="text-sm">Rating</span>
            <Button as={Link} size="sm" variant="light" color="primary" className="p-0" onPress={() => setRatings(null)}>Reset</Button>
          </div>
          <RadioGroup
            value={rating.toString()}
            aria-label="radio"
            classNames={{
              label: 'text-sm'
            }}
            onChange={(e) => setRatings(parseInt(e.target.value))}
          >
            {RATINGS.map((rating: number) =>
              <Radio key={rating} classNames={{
                label: 'flex flex-row items-center'
              }} value={rating.toString()}>
                {[...Array(rating)].map((_, idx: number) =>
                  <Image key={`rating-${idx}`} src='/icons/icon-star.svg' alt={`rating-${idx}`} width={15} height={15} />
                )}
              </Radio>
            )}
          </RadioGroup>
        </div>
      </div>
    </Fragment >
  )
}

export default memo(Filters)