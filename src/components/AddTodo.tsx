"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";

import { usePostUplMutation } from "@/redux/api/upload";
import {
  useDeleteTodoMutation,
  useGetTodoQuery,
  usePostTodoMutation,
  useUpdateTodoMutation,
} from "@/redux/api/auth";

interface IFormAdd {
  _id: number;
  name: string;
  surname: string;
  age: number;
  file: FileList;
}

const AddTodo = () => {
  const [postMutation] = usePostTodoMutation();
  const [postUploadMutation] = usePostUplMutation();
  const [deleteMutation] = useDeleteTodoMutation();
  const [updateMutation] = useUpdateTodoMutation();
  const { data } = useGetTodoQuery();
  console.log(data);
  
  const { register: registerAdd, handleSubmit: handleSubmitAdd } =
    useForm<IFormAdd>();
  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    setValue,
    reset,
  } = useForm<IFormAdd>();
  const [isEditId, setIsEditId] = useState<number | null>(null);
  const [editImageUrl, setEditImageUrl] = useState<string | null>(null);
  console.log(isEditId);

  const onSubmit: SubmitHandler<IFormAdd> = async (data) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);

    const response = await postUploadMutation(formData).unwrap();
    console.log(response);

    const newData = {
      _id: data._id,
      name: data.name,
      surname: data.surname,
      age: data.age,
      file: response.url,
    };
    await postMutation(newData);
  };

  const onSubmitEdit: SubmitHandler<IFormAdd> = async (data) => {
    const file = data.file[0];
    const formData = new FormData();
    formData.append("file", file);
    const response = await postUploadMutation(formData).unwrap();

    const newData = {
      name: data.name,
      surname: data.surname,
      age: data.age,
      file: response.url,
      updateAt: new Date().toISOString(),
    };

    await updateMutation({ _id: isEditId!, updateTodo: newData });
    setIsEditId(null);
    reset();
    setEditImageUrl(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmitAdd(onSubmit)} className="content">
        <input
          type="text"
          placeholder="name"
          {...registerAdd("name", { required: true })}
        />
        <input
          type="text"
          placeholder="surname"
          {...registerAdd("surname", { required: true })}
        />
        <input
          type="number"
          placeholder="age"
          {...registerAdd("age", { required: true })}
        />
        <input
          type="file"
          placeholder="file"
          {...registerAdd("file", { required: true })}
        />
        <button type="submit">create</button>
      </form>
      {data?.map((el) => (
        <div key={el._id}>
          {isEditId === el._id ? (
            <>
              <form
                onSubmit={handleSubmitEdit(onSubmitEdit)}
                className="content"
              >
                <input
                  type="text"
                  placeholder="name"
                  {...registerEdit("name", { required: true })}
                />
                <input
                  type="text"
                  placeholder="surname"
                  {...registerEdit("surname", { required: true })}
                />
                <input
                  type="number"
                  placeholder="age"
                  {...registerEdit("age", { required: true })}
                />
                <input
                  type="file"
                  placeholder="file"
                  {...registerEdit("file", { required: true })}
                />
                {editImageUrl && (
                  <Image
                    width={200}
                    height={200}
                    src={editImageUrl}
                    alt="Edit image"
                  />
                )}
                <button type="submit">save</button>
              </form>
            </>
          ) : (
            <>
              <h1>{el.name}</h1>
              <Image width={200} height={200} src={el.file} alt={el.name} />
              <button
                onClick={() => {
                  setIsEditId(el._id);
                  setValue("name", el.name);
                  setValue("surname", el.surname);
                  setValue("age", el.age);
                  setEditImageUrl(el.file);
                }}
              >
                edit
              </button>
              <button onClick={() => deleteMutation(el._id)}>delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddTodo;
