import { Filter, MoveDown, MoveUp } from "lucide-react";
import Loading from "./Loading";
import { category } from "../types/courseCategories";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface componentProps {
  categoryData: category[];
  checkedItems: boolean[];
  onFilterChange: (idx: number) => void;
  onSortChange: (option: string) => void;
}

const FilterCategories: React.FC<componentProps> = ({
  categoryData,
  onSortChange,
  checkedItems,
  onFilterChange,
}) => {
  return (
    <div className="space-y-16">
      <div className="flex items-start justify-between m-4">
        <div className="md:hidden lg:hidden">
          <MobileFilterCategories
            categoryData={categoryData}
            onSortChange={onSortChange}
            checkedItems={checkedItems}
            onFilterChange={onFilterChange}
          />
        </div>
        <div className="hidden md:divCenter flex-col space-y-8">
          <h1 className="text-xl font-semibold text-hvrBrwn">Filter Items :</h1>
          {categoryData ? (
            <div className="flex items-start justify-start space-y-4 flex-col">
              {categoryData.map((data: category, idx: number) => (
                <div key={idx} className="items-top flex space-x-2">
                  <Checkbox
                    checked={checkedItems[idx]}
                    onCheckedChange={() => onFilterChange(idx)}
                    id="terms1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-hvrBrwn"
                    >
                      {data.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Loading skeletonType="filterCategories" />
          )}
        </div>
        <div className="divCenter">
          <Menubar className="bg-white text-Brwn border-2 bolder-solid border-brwn shadow-lg hover:bg-hvrBrwn hover:text-white">
            <MenubarMenu>
              <MenubarTrigger className="text-sm lg:text-lg">
                Sort By
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem
                  className="font-semibold"
                  onClick={() => onSortChange("priceHtL")}
                >
                  Price : High to Low
                  <MenubarShortcut>
                    <MoveUp size={20} />
                  </MenubarShortcut>
                </MenubarItem>
                <MenubarItem
                  className="font-semibold"
                  onClick={() => onSortChange("priceLtH")}
                >
                  Price : Low to High{" "}
                  <MenubarShortcut>
                    <MoveDown size={20} />
                  </MenubarShortcut>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
      <div className="w-full mx-2 hidden md:divCenter">
        <div className="w-full gap-4 flex items-center justify-between">
          <Button
            onClick={() => onFilterChange(-1)}
            className="w-full bg-hvrBrwn hover:bg-hdrBrwn"
          >
            Reset All Filters
          </Button>
          <Button
            onClick={() => onSortChange("undo")}
            className="w-full bg-hvrBrwn hover:bg-hdrBrwn"
          >
            Undo Sort
          </Button>
        </div>
      </div>
    </div>
  );
};

const MobileFilterCategories: React.FC<componentProps> = ({
  categoryData,
  onSortChange,
  checkedItems,
  onFilterChange,
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="rounded-md bg-brwn hover:bg-hvrBrwn">
          <Filter />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col">
        <SheetHeader className="my-8">
          <SheetTitle className="flex items-center justify-between">
            Filters by Category
          </SheetTitle>
        </SheetHeader>
        <Separator />
        <SheetDescription className="flex-1">
          {categoryData ? (
            <div className="mt-4 text-hvrBrwn text-xl space-y-4">
              {categoryData.map((data: category, idx: number) => (
                <div key={idx} className="items-top flex space-x-2">
                  <Checkbox
                    checked={checkedItems[idx]}
                    onCheckedChange={() => onFilterChange(idx)}
                    id="terms1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {data.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Loading skeletonType="filterCategories" />
          )}
        </SheetDescription>
        <SheetFooter>
          <div className="w-full mx-2">
            <div className="w-full gap-2 flex items-center justify-between">
              <Button
                onClick={() => onFilterChange(-1)}
                className="w-full bg-hvrBrwn hover:bg-hdrBrwn"
              >
                Reset All Filters
              </Button>
              <Button
                onClick={() => onSortChange("undo")}
                className="w-full bg-hvrBrwn hover:bg-hdrBrwn"
              >
                Undo Sort
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterCategories;
