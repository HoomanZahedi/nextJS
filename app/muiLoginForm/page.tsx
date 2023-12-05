"use client";
import { Button, FormControl } from "@mui/base";
import {
  Autocomplete,
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Film = {
  title: string;
  year: number;
};

const schema = z.object({
  userName: z.string().nonempty("userName is required"),
  password: z.string().nonempty("password is required"),
  gender: z.enum(["male", "female"]),
  film: z.object({
    title: z.string(),
    year: z.number(),
  }),
  filmArray: z
    .object({
      title: z.string(),
      year: z.number(),
    })
    .array(),
});
type FormData = z.infer<typeof schema>;
function MuiLoginForm() {
  const form = useForm<FormData>({
    defaultValues: {
      userName: "Hooman",
      password: "123456",
      gender: "male",
      film: top100Films[0],
      filmArray: [top100Films[0]],
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });
  const {
    register,
    control,
    handleSubmit,
    formState,
    setValue,
    watch,
    getValues,
  } = form;

  // Function to add a new movie to the Autocomplete values

  const onSubmit = async (data: FormData) => {
    console.log(data);
  };
  const { errors, touchedFields, dirtyFields } = formState;
  console.log(errors);
  useEffect(() => {
    const subscription = watch((value) => {});
    return () => subscription.unsubscribe();
  }, [watch]);
  const filteredOptions = top100Films.filter(
    (film) =>
      !watch("filmArray").some(
        (selectedFilm) => selectedFilm.title === film.title
      )
  );
  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          label="User Name"
          id="outlined-start-adornment"
          error={!!errors.userName}
          helperText={errors.userName ? errors.userName.message : null}
          {...register("userName", {
            required: {
              value: true,
              message: "User Name is Required",
            },
          })}
        />

        <FormControl>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type="password"
            label="Password"
            {...register("password", {
              required: {
                value: true,
                message: "password is Required",
              },
            })}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
            error={!!errors.password}
            value={watch("gender")}
            {...register("gender", {
              required: {
                value: true,
                message: "gender is Required",
              },
            })}
          >
            <MenuItem value="male">male</MenuItem>
            <MenuItem value="female">female</MenuItem>
          </Select>
        </FormControl>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          value={watch("film")}
          onChange={(event, newValue) => setValue("film", newValue!)}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              error={!!errors.film}
              helperText={errors.film ? "film is required" : null}
              {...params}
              label="Movie"
              {...register("film", {
                required: {
                  value: true,
                  message: "film is Required",
                },
              })}
            />
          )}
        />
        <Autocomplete
          multiple
          id="tags-standard"
          options={filteredOptions}
          value={watch("filmArray")}
          onChange={(event, newValue) => setValue("filmArray", newValue!)}
          getOptionLabel={(option) => option.title}
          defaultValue={[top100Films[3]]}
          renderInput={(params) => (
            <TextField
              {...params}
              error={!watch("filmArray").length}
              helperText={
                !watch("filmArray").length ? "filmArray is required" : null
              }
              variant="standard"
              label="Multiple values"
              placeholder="movies"
            />
          )}
        />
        <Button
          type="submit"
          color="primary"
          disabled={!watch("filmArray").length}
        >
          submit
        </Button>
      </form>
    </div>
  );
}

export default MuiLoginForm;
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
