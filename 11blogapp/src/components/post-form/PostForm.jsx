import React, {useCallback} from "react";
import {useForm} from "react-hook-form"
import Button from "../Button"
import Input from "../Input"
import RTE from "../RTE"
import Select from "../Select"
import service from "../../appwrite/config"
import {useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"


export default function PostForm({post}){
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            tittle: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active"

        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async(data) => {
    // to handle the submission of a form, either for updating an existing post (if (post)) or creating a new post (else).
        if (post) {
            //Updating an existing post
            const file = data.image[0] ? await service.uploadFile(data.image[0]) : null

            if (file) {   // Delete the old featured image file if a new file is uploaded
                service.deleteFile(post.featuredImage)
            }
            // Update the post in the database
            const dbPost = await service.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined 
            })
           if (dbPost) {
                navigate(`/post/${dbPost.$id}`)//Navigate to the updated post
            }
        } else {
            //Creating a new post
            const file = await service.uploadFile(data.image[0])
            if (file) {
                // Set the featuredImage property in data to the new file's ID
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await service.createPost({...data, userId: userData.$id})
                // Create the post in the database
                if (dbPost) {
                    // Navigate to the newly created post
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }

    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === "string") return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, "-")
    }, [])

    React.useEffect(() => {
        watch((value, {name}) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {shouldValidate: true})
            }
        }) 
    }, [watch, slugTransform, setValue])
    return (
        <form onSubmit={handleSubmit(submit)}
        className="flex flex-wrap"
        >
            <div className="w-2/3 px-2">
                <Input
                label="Title"
                placeholder="Title"
                className="mb-4"
                {...register("title", {required: true})}
                />
                <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", {required: true})}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
                }}
                />
                <RTE
                label="Content: "
                name="content"
                control={control}
                defaultValue={getValues("content")}
                />
            </div>
            <div className="1/3 px-2">
                <Input
                label="Featured Image"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg"
                {...register("image", {required: !post})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img src={appwriteSerice.getFilePreview(post.featuredImage)} alt={post.title}
                        className="rounded-lg"
                        />
                        
                    </div>
                )}
                <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", {required: true})}
                />
                <Button
                type="submit"
                bgColor={post ? "bg-green-500": undefined}
                className="w-full"
                >{post ? "Update": "Submit"}</Button>
            </div>
        </form>
    )
}

//slugTransform function, wrapped with useCallback, is designed to transform a string into a slug. 
//It removes whitespace, converts characters to lowercase, and replaces non-alphanumeric characters with hyphen.
//if(value && typeof value === "string") checks whether a variable value is both truthy and of the type "string"
//We dont need to create State in react hook form that will be taken care by useForm() hook itself
// watch((value, {name}) means watchout of all the value in the form looking for one value which is name



//react-hook-from working
// import { useForm } from "react-hook-form"

// export default function App() {
// const {register, handleSubmit, watch, formState: { errors },} = useForm()

// const onSubmit = (data) => console.log(data)

// console.log(watch("example")) // watch input value by passing the name of it


//   return ( <form onSubmit={handleSubmit(onSubmit)}>
//       <input defaultValue="test" {...register("example")} />
//       <input {...register("exampleRequired", { required: true })} />
//       {errors.exampleRequired && <span>This field is required</span>}
//       <input type="submit" />
//     </form>)}

//ex-2 react-hook form wrokinf with controller and external libraires cna check in RTE.jsx

// import Select from "react-select"
// import { useForm, Controller } from "react-hook-form"
// import { Input } from "@material-ui/core"

// const App = () => {
//   const { control, handleSubmit } = useForm({defaultValues: {firstName: "", select: {},},})
//   const onSubmit = (data) => console.log(data)

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Controller
//         name="firstName"
//         control={control}
//         render={({ field }) => <Input {...field} />}
//       />
//       <Controller
//         name="select"
//         control={control}
//         render={({ field }) => (
//           <Select
//             {...field}
//             options={[
//               { value: "chocolate", label: "Chocolate" },
//               { value: "strawberry", label: "Strawberry" },
//               { value: "vanilla", label: "Vanilla" },
//             ]}
//           />
//         )}
//       />
//       <input type="submit" />
//     </form>)}