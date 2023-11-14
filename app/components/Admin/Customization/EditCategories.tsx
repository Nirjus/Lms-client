import {
  useEditLAyoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layputApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader";
import { style } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Category", {
    refetchOnMountOrArgChange: true,
  });
  const [editLAyout, { isSuccess, error }] = useEditLAyoutMutation();

  const [categories, setCategories] = useState<any[]>([]);
   console.log(data);
  useEffect(() => {
    if (data) {
      setCategories(data.layout.category);
    }
    if(isSuccess){
        refetch();
        toast.success("Categories updated successfully");
    }
    if(error){
        if("data" in error){
          const errorData = error as any;
            toast.error(errorData?.data?.message);
        }
      }
  }, [data, isSuccess, error, refetch]);
  const handleCAtegoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };
  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };
  const areCategoriesUnchanged = (originalCategory:any[], newCategory:any[]) => {
     return JSON.stringify(originalCategory) === JSON.stringify(newCategory);
  };
  const isAnyCategoryTitleEmpty = (categories:any[]) => {
    return categories.some((q) => q.title === "");
  };
  const editCategoriesHandler = async () => {
    if(!areCategoriesUnchanged(data?.layout.category, categories) && !isAnyCategoryTitleEmpty(categories)){
   await editLAyout({
    type:"Category",
    category: categories,
    })
   }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px] text-center">
          <h1 className={`${style.title}`}>All Categories</h1>
          {categories &&
            categories.map((item: any, index: number) => {
              return (
                <div className="p-3" key={index}>
                  <div className="flex items-center w-full justify-center">
                    <input
                      type="text"
                      placeholder="Enter categoriy name"
                      className={`${style.input} !border-none !text-[20px] !w-[unset]`}
                      value={item.title}
                      onChange={(e) =>
                        handleCAtegoriesAdd(item._id, e.target.value)
                      }
                    />
                    <AiOutlineDelete
                      className=" dark:text-white text-black text-[18px] cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory: any) =>
                          prevCategory.filter((i: any) => i._id !== item._id)
                        );
                      }}
                    />
                  </div>
                </div>
              );
            })}
          <br />
          <br />
          <div className="w-full flex justify-center">
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer"
              onClick={newCategoriesHandler}
            />
          </div>
          <div
            className={`${
              style.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black 
${
  areCategoriesUnchanged(data.layout.category, categories) ||
  isAnyCategoryTitleEmpty(categories)
    ? "!cursor-not-allowed"
    : "!cursor-pointer !bg-[#42d383]"
}
 !rounded absolute bottom-12 right-12`}
            onClick={
              areCategoriesUnchanged(data.layout.category, categories) ||
              isAnyCategoryTitleEmpty(categories)
                ? () => null
                : editCategoriesHandler
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
