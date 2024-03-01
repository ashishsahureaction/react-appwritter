import React from 'react'
import {Controller} from "react-hook-form"
import {Editor} from "@tinymce/tinymce-react"


function RTE({
    name, control, label, defaultValue = ""
}) {
  return (
    <div className='w-full'>
        {
            label && <label className='inline-block mb-1 pl-1'> {label}</label>
        }
        <Controller
        name={name || "content"}
        control={control}
        render={({field: {onChange}}) => (
            <Editor
            initialValue={defaultValue}
            init={{
                branding: false,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
            />
        )}
        />
    </div>
  )
}

export default RTE

//Controller from React-Hook-Form will integrate 3rd party libabries components with react-hook-form as we can not use external library componnet
//with reat-hook-form. For that we have Controller component within R-H-F and Controller component provide control() method and render() method. 
//Have to provide name for all input field as like used in register method of R-H-F.

//Editor from TinyMCE to provide text editor in place of text area where user can write anything.

//ex-React hook form with Controller 
// import Select from "react-select"
// import { useForm, Controller } from "react-hook-form"
// import { Input } from "@material-ui/core"


// const App = () => {
//   const { control, handleSubmit } = useForm({
//     defaultValues: {
//       firstName: "",
//       select: {}, },})

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
//     </form>
//   )
// }


// TinyMCE:

// <script>
//   tinymce.init({
//     selector: 'textarea',
//     plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
//     toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
//     tinycomments_mode: 'embedded',
//     tinycomments_author: 'Author name',
//     mergetags_list: [
//       { value: 'First.Name', title: 'First Name' },
//       { value: 'Email', title: 'Email' },
//     ],
//     ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
//   });
// </script>
// <textarea>
//   Welcome to TinyMCE!
// </textarea>