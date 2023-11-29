"use client";
import React, { useEffect } from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";

type FormData = {
  FirstName: string;
  LastName: string;
  Email: string;
  age: number;
  date: Date;
  phoneNumber: {
    number: string;
  }[];
};
function FormTemplate() {
  const form = useForm<FormData>({
    defaultValues: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      return {
        FirstName: data[0].name,
        LastName: data[0].username,
        Email: data[0].email,
        date: new Date().toISOString().substr(0, 10),
        age: 26,
        phoneNumber: [
          {
            number: "",
          },
        ],
      };
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    trigger,
  } = form;
  const { errors, touchedFields, dirtyFields } = formState;
  const onSubmit = async (data: FormData) => {
    if (dirtyFields.hasOwnProperty("FirstName")) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: data.FirstName, body: data.Email }),
        }
      );
      console.log(response);
    } else {
      console.log("no item has been changed!");
    }
  };
  const { fields, append, remove } = useFieldArray({
    name: "phoneNumber",
    control,
  });

  const handleGetValues = () => {
    console.log(getValues());
    console.log(trigger("Email"));
  };
  const handleSetValues = () => {
    setValue("LastName", "123");
    setValue("FirstName", "456");
  };
  const onError = (errors: FieldErrors<FormData>) => {
    console.log(errors);
  };
  useEffect(() => {
    const subscription = watch((value) => {});
    return () => subscription.unsubscribe();
  }, [watch]);
  return (
    <div className="h-screen flex items-center justify-center">
      <form
        className="w-full max-w-lg"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              First Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Jane"
              {...register("FirstName", {
                required: {
                  value: true,
                  message: "FirstName is Required",
                },
              })}
            />
            <p className="text-gray-600 text-xs italic">
              {errors.FirstName?.message}
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Last Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              disabled={watch("FirstName") === ""}
              placeholder="Doe"
              {...register("LastName", {
                required: {
                  value: true,
                  message: "LastName is Required",
                },
              })}
            />
            <p className="text-gray-600 text-xs italic">
              {errors.LastName?.message}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="email"
              placeholder="email"
              {...register("Email", {
                required: {
                  value: true,
                  message: "Email Is Required",
                },
                pattern: {
                  value:
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g,
                  message: "email is invalid",
                },
                validate: {
                  notAdmin: (fieldValue) => {
                    if (fieldValue === "admin@gmail.com") {
                      return "Validation Error";
                    }
                  },
                },
              })}
            />
            <p className="text-gray-600 text-xs italic">
              {errors.Email?.message}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              age
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              placeholder="age"
              {...register("age", {
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "Age Is Required",
                },
              })}
            />
            <p className="text-gray-600 text-xs italic">
              {errors.age?.message}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              date
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="date"
              placeholder="date"
              {...register("date", {
                valueAsDate: true,
                required: {
                  value: true,
                  message: "Date Is Required",
                },
              })}
            />
            <p className="text-gray-600 text-xs italic">
              {errors.date?.message}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            {fields.map((field, index) => {
              return (
                <div key={index}>
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    phone number
                  </label>
                  <div style={{ display: "flex" }}>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      type="text"
                      {...register(`phoneNumber.${index}.number`)}
                    />
                    <button
                      className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => remove(index)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="bg-teal-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => append({ number: "" })}
          >
            Add phone number
          </button>
        </div>
        <button
          className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleGetValues}
        >
          get values
        </button>
        <button
          className="bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSetValues}
        >
          set values
        </button>
        {/* <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              City
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-city"
              type="text"
              placeholder="Albuquerque"
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              State
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                <option>New Mexico</option>
                <option>Missouri</option>
                <option>Texas</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Zip
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-zip"
              type="text"
              placeholder="90210"
            />
          </div>
        </div> */}
        <button
          disabled={
            watch("Email") === "" ||
            watch("FirstName") === "" ||
            watch("age") < 0
          }
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          submit
        </button>
        {/* <DevTool control={control} /> */}
      </form>
      {Object.values(errors).length ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <ul>
            {Object.values(errors).map((x, index) => (
              <li key={index}>{x.message}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default FormTemplate;
