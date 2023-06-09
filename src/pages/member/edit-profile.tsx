import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Sidebar from "components/organisms/Sidebar";
import { JWTPayloadTypes, userTypes } from "services/data-types";
import { updateProfile } from "services/member";
import Input from "components/atoms/Input";

interface UserStateTypes {
  id: string;
  name: string;
  email: string;
  avatar: any;
}

export default function EditProfile() {
  const [user, setUser] = useState<UserStateTypes>({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });
  const [imagePreview, setImagePreview] = useState("/icon/upload.svg");
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: userTypes = payload.player;
      setUser(userFromPayload);
    }
  }, []);

  const onSubmit = async () => {
    const data = new FormData();

    data.append("image", user.avatar);
    data.append("name", user.name);
    const response = await updateProfile(data, user.id);
    if (response.error) {
      toast.error(response.message);
    } else {
      Cookies.remove("token");
      router.push("/sign-in");
    }
  };
  const IMG = process.env.NEXT_PUBLIC_IMG;
  return (
    <section className="edit-profile overflow-auto">
      <Sidebar activeMenu="settings" />
      <main className="main-wrapper">
        <div className="ps-lg-0">
          <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
          <div className="bg-card pt-30 ps-30 pe-30 pb-30">
            <form action="">
              <div className="photo d-flex">
                <div className="image-upload">
                  <label htmlFor="avatar">
                    {imagePreview === "/" ? (
                      <img
                        src={`${IMG}/${user.avatar}`}
                        alt="icon upload"
                        width={90}
                        height={90}
                        style={{ borderRadius: "100%" }}
                      />
                    ) : (
                      <img
                        src={imagePreview}
                        alt="icon upload"
                        width={90}
                        height={90}
                        style={{ borderRadius: "100%" }}
                      />
                    )}
                  </label>
                  <input
                    id="avatar"
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                    onChange={(event) => {
                      const img = event.target.files![0];
                      setImagePreview(URL.createObjectURL(img));
                      return setUser({
                        ...user,
                        avatar: img,
                      });
                    }}
                  />
                </div>
              </div>
              <div className="pt-30">
                <Input
                  label="Full Name"
                  value={user.name}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      name: event.target.value,
                    })
                  }
                />
              </div>
              <div className="pt-30">
                <Input label="Email Address" disabled value={user.email} />
              </div>
              {/* <div className="pt-30">
                <Input label="Phone" />
              </div> */}
              <div className="button-group d-flex flex-column pt-50">
                <button
                  type="button"
                  className="btn btn-save fw-medium text-lg text-white rounded-pill"
                  onClick={onSubmit}
                >
                  Save My Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}

// /* eslint-disable @next/next/no-img-element */
// import Button from "components/atoms/Button";
// import Input from "components/atoms/Input";
// import Sidebar from "components/organisms/Sidebar";
// import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
// // import Image from "next/image";
// import { useRouter } from "next/router";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import { JWTPayloadTypes, userTypes } from "services/data-types";
// import { updateProfile } from "services/member";

// interface UserStateTypes {
//   id: string;
//   name: string;
//   email: string;
//   avatar: any;
// }

// export default function EditProfile() {
//   const [user, setUser] = useState<UserStateTypes>({
//     id: "",
//     name: "",
//     email: "",
//     avatar: "",
//   });

//   const [imagePreview, setImagePreview] = useState("/");
//   const router = useRouter();

//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (token) {
//       const jwtToken = atob(token);
//       const payload: JWTPayloadTypes = jwtDecode(jwtToken);
//       const userFromPayload: userTypes = payload.player;
//       setUser(userFromPayload);
//       console.log("data :", userFromPayload);
//     }
//   }, []);

//   const onSubmit = async () => {
//     const data = new FormData();

//     data.append("image", user.avatar);
//     data.append("name", user.name);
//     const response = await updateProfile(data, user.id);
//     console.log("response data :", response);
//     if (response.error) {
//       toast.error(response.message);
//     } else {
//       Cookies.remove("token");
//       router.push("/sign-in");
//     }
//   };
//   const IMG = process.env.NEXT_PUBLIC_IMG;
//   return (
//     <section className="edit-profile overflow-auto">
//       <Sidebar activeMenu="settings" />
//       <main className="main-wrapper">
//         <div className="ps-lg-0">
//           <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
//           <div className="bg-card pt-30 ps-30 pe-30 pb-30">
//             <form action="">
//               <div className="photo d-flex">
//                 <div className="image-upload">
//                   <label htmlFor="avatar">
//                     {imagePreview === "/" ? (
//                       <img
//                         src={`${IMG}/${user.avatar}`}
//                         alt="icon upload"
//                         width={90}
//                         height={90}
//                         style={{ borderRadius: "100%" }}
//                       />
//                     ) : (
//                       <img
//                         src={imagePreview}
//                         alt="icon upload"
//                         width={90}
//                         height={90}
//                         style={{ borderRadius: "100%" }}
//                       />
//                     )}
//                   </label>
//                   <input
//                     id="avatar"
//                     type="file"
//                     name="avatar"
//                     accept="image/png, image/jpeg"
//                     onChange={(event) => {
//                       const img = event.target.files![0];
//                       setImagePreview(URL.createObjectURL(img));
//                       return setUser({
//                         ...user,
//                         avatar: img,
//                       });
//                     }}
//                   />
//                 </div>
//               </div>
//               <div className="pt-30">
//                 <Input
//                   label="Full Name"
//                   value={user.name}
//                   onChange={(event) =>
//                     setUser({
//                       ...user,
//                       name: event.target.value,
//                     })
//                   }
//                 />
//               </div>
//               <div className="pt-30">
//                 <Input label="Email Address" disabled value={user.email} />
//               </div>
//               {/* <div className="pt-30">
//               <Input label="Phone" />
//             </div> */}
//               <div className="button-group d-flex flex-column pt-50">
//                 <button
//                   type="button"
//                   className="btn btn-save fw-medium text-lg text-white rounded-pill"
//                   onClick={onSubmit}
//                 >
//                   Save My Profile
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </section>

//     <section className="edit-profile overflow-auto">
//       <Sidebar activeMenu="settings" />
//       <main className="main-wrapper">
//         <div className="ps-lg-0">
//           <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
//           <div className="bg-card pt-30 ps-30 pe-30 pb-30">
//             <form action="">
//               <div className="photo d-flex">
//                 <div className="position-relative me-20">
//                   <img
//                     src="/img/avatar-1.png"
//                     width="90"
//                     height="90"
//                     className="avatar img-fluid"
//                     alt=""
//                   />
//                   <div className="avatar-overlay position-absolute top-0 d-flex justify-content-center align-items-center">
//                     <img
//                       src={`${IMG}/${user.avatar}`}
//                       alt="icon upload"
//                       width={90}
//                       height={90}
//                       style={{ borderRadius: "100%" }}
//                     />
//                   </div>
//                 </div>
//                 <div className="image-upload">
//                   <label htmlFor="avatar">
//                     <img
//                       src={imagePreview}
//                       alt="icon upload"
//                       width={90}
//                       height={90}
//                       style={{ borderRadius: "100%" }}
//                     />
//                   </label>
//                   <input
//                     id="avatar"
//                     type="file"
//                     name="avatar"
//                     accept="image/png, image/jpeg"
//                   />
//                 </div>
//               </div>
//               <div className="pt-30">
//                 {/* <Input
//                   htmlfor="name"
//                   label_style="form-label text-lg fw-medium color-palette-1 mb-10"
//                   label="Full Name"
//                   type="text"
//                   input_style="form-control rounded-pill text-lg"
//                   id="name"
//                   name="name"
//                   placeholder="Enter Your Name"
//                 />
//               </div>
//               <div className="pt-30">
//                 <Input
//                   htmlfor="email"
//                   label_style="form-label text-lg fw-medium color-palette-1 mb-10"
//                   label="Email Address"
//                   type="email"
//                   input_style="form-control rounded-pill text-lg"
//                   id="email"
//                   name="email"
//                   placeholder="Enter your email address"
//                 />
//               </div>
//               <div className="pt-30">
//                 <Input
//                   htmlfor="phone"
//                   label_style="form-label text-lg fw-medium color-palette-1 mb-10"
//                   label="Phone"
//                   type="tel"
//                   input_style="form-control rounded-pill text-lg"
//                   id="phone"
//                   name="phone"
//                   placeholder="Enter your Phone Number"
//                 /> */}
//               </div>
//               <div className="button-group d-flex flex-column pt-50">
//                 <Button
//                   class_style="btn btn-save fw-medium text-lg text-white rounded-pill"
//                   name="Save My Profile"
//                   to_address="/"
//                   type="submit"
//                 />
//               </div>
//             </form>
//           </div>
//         </div>
//       </main>
//     </section>
//   );
// }
