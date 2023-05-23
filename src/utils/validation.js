import * as yup from "yup";



var date1 = new Date();
var year = date1.getFullYear();
var month = date1.getMonth();



export const transactionFormSchema = yup.object().shape({
    transactionDate: yup
      .date()
      .typeError("Transaction Date is requirerd")
      .max(date1, "Transaction date must be before current date")
      .required(),
    monthYear: yup
      .number()
      .typeError("Month Year is required")
      .required()
      .max(Number(month), "Month Year must be before current month"),
    transactionType: yup.string().required(),
    from: yup.string().required().notOneOf([yup.ref("to")], "From and to must not be same"),
    to: yup
      .string()
      .required()
      .notOneOf([yup.ref("from")], "From and to must not be same"),
    amount: yup
      .number()
      .typeError("Invalid Amount")
      .required()
      .min(1000)
      .max(1000000),
    receipt: yup
      .mixed()
      .required("Required")
      .test(
        "type",
        "Only the following formats are accepted: .jpeg, .jpg,.png,.bmp",
        (value) => {
          if (!value.length) return true;
          return (
            value &&
            (value[0].type === "image/jpeg" ||
              value[0].type === "image/bmp" ||
              value[0].type === "image/png" ||
              value[0].type === "image/jpg")
          );
        }
      )
      .test("fileSize", "The file is too large", (value) => {
        if (!value.length) return true;
        return value && value[0].size <= 2000000000;
      }),
    notes: yup.string().required().max(200, "Only 200 Chracters are allowed"),
  });

export const registerSchema=yup.object().shape({
  name: yup
    .string()
    .required()
    .min(3)
    .max(20)
    .matches(/[A-Za-z]$/, "Enter Valid name"),
  email: yup.string().email().required(),
  password: yup.string().required().min(8).max(20),
  respassword: yup
    .string()
    .required()
    .min(8)
    .max(20)
    .oneOf([yup.ref("password")], "Password doesnot Match"),
});


