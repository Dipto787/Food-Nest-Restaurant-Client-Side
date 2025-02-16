import { useForm } from "react-hook-form";
import SectionTitle from "../../Components/Shared/SectionTitle/SectionTitle";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../Components/hooks/UseAxiosPublic";
import UseAxiosSecure from "../../Components/hooks/UseAxiosSecure";

let image_hoisting_Key = import.meta.env.VITE_IMAGE_HOISTING_KEY;
let image_hoisting_api = `https://api.imgbb.com/1/upload?key=${image_hoisting_Key}`;
const UpdateItems = () => {
    let axiosPublic = UseAxiosPublic();
    let { name, price, recipe, category, _id } = useLoaderData();
    let axiosSecure = UseAxiosSecure();
    let { register, handleSubmit, reset } = useForm();
    let onSubmit = async (data) => {
        console.log(data)
        let imageFile = { image: data.image[0] };
        let res = await axiosPublic.post(image_hoisting_api, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        if (res.data.success) {
            let itemInfo = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            let menuRes = await axiosSecure.patch(`/menu/${_id}`, itemInfo);
            console.log(menuRes.data);
            if (menuRes.data.modifiedCount > 0) {
                // show success up 
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            console.log(res.data);
        }
    };
    return (
        <div>
            <SectionTitle heading={'Update Item'} subHeading={'Refresh Info'}></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Recipe name*</span>
                    </div>
                    <input defaultValue={name} type="text" placeholder="Recipe name*" {...register('name')} className="input input-bordered w-full " />

                </label>


                <div className="flex gap-6">
                    <div className="from-control w-full my-6">
                        <select defaultValue={'default'}
                            {...register('category')}
                            className="select select-bordered w-full mt-4"
                        >
                            <option disabled value={category}>Select a category</option>
                            <option value={'salad'}>salad</option>
                            <option value={'pizza'}>pizza</option>
                            <option value={'soup'}>soup</option>
                            <option value={'dessert'}>dessert</option>
                            <option value={'drink'}>drink</option>

                        </select>
                    </div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text"> price*</span>
                        </div>
                        <input defaultValue={price} type="number" placeholder="price" {...register('price')} className="input input-bordered w-full " />

                    </label>
                </div>


                <label className="form-control">
                    <div className="label">
                        <span className="label-text">Recipe Details*</span>
                    </div>
                    <textarea defaultValue={recipe} {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                </label>

                <div className="form-control w-full my-6 ">
                    <input {...register('image')} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                </div>

                <button className="btn">Update Recipe Details</button>
            </form>
        </div>
    );
};

export default UpdateItems;